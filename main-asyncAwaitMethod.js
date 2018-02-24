// Refactored code from main.js that includes the async await method (ES7) in the main functions (expandUrl and shortenUrl)


// Include data for accessing Google APIs
const apiKey = 'AIzaSyBKsPi8dOhaG0vphDtCsk6j-46iDN85cCU';
const url = 'https://www.googleapis.com/urlshortener/v1/url';

// Some page elements
const $inputField = $('#input');
const $expandButton = $('#expand');
const $shortenButton = $('#shorten');
const $responseField = $('#responseField');

// AJAX functions

async function expandUrl(){
  const urlToExpand = url + '?shortUrl=' + $inputField.val() + '&key=' + apiKey;
  try{
    let response = await fetch(urlToExpand);
    if(response.ok){
      let jsonResponse = await response.json();
      $responseField.append('<p> Your expanded URL is </p><p>' + jsonResponse.longUrl+ '</p>');
			return jsonResponse;
    }
  }
  catch(error){
    console.log(error);
  }
}

async function shortenUrl(){
  const urlToShorten = $inputField.val();
	const urlWithKey = url + '?key=' + apiKey;
  try{
    let response = await fetch(urlWithKey, {
      method: 'POST',
      body: JSON.stringify({longUrl: urlToShorten}),
      headers: {
 				"Content-type": "application/json"
			}
    })
    if(response.ok){
      let jsonResponse = await response.json();
      $responseField.append('<p> Your shortened URL is </p><p>' + jsonResponse.id + '</p>');
			return jsonResponse;
    }
  }catch(error){
    console.log(error);
  }
}



// Clear page and call AJAX functions
function expand() {
  $responseField.empty();
  expandUrl();
  return false;
};

function shorten() {
  $responseField.empty();
  shortenUrl();
  return false;
};

$expandButton.click(expand);
$shortenButton.click(shorten);
