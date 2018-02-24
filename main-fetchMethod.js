// Refactored code from main.js that includes the fetch() method in the main functions (expandUrl and shortenUrl)

// Include data for accessing Google APIs
const apiKey = 'AIzaSyBKsPi8dOhaG0vphDtCsk6j-46iDN85cCU';
const url = 'https://www.googleapis.com/urlshortener/v1/url';

// Some page elements

const $inputField = $('#input');
const $expandButton = $('#expand');
const $shortenButton = $('#shorten');
const $responseField = $('#responseField');

// AJAX functions

function expandUrl() {
  const urlToExpand = url + '?shortUrl=' + $inputField.val() + '&key=' + apiKey;
  fetch(urlToExpand).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => console.log(networkError.message)).then(jsonResponse => {
    $responseField.append('<p> Your expanded URL is </p><p> ' + jsonResponse.longUrl + '</p>');
    return jsonResponse;
  })
};


function shortenUrl() {
	const urlWithKey = url + '?key=' + apiKey;
	const urlToShorten = $inputField.val();
  fetch(urlWithKey, {
    method: 'POST',
    headers: {
 			"Content-type": "application/json"
		},
    body: JSON.stringify({longUrl: urlToShorten})
  }).then(response =>{
    if(response.ok){
      return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => console.log(networkError.message)).then(jsonResponse => { 
    $responseField.append('<p> Your shortened URL is </p><p>' + jsonResponse.id + '</p>');
		return jsonResponse;
  })
};

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