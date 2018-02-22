// Refactoring the code to use $.get and $.post Ajax methods
// Include data for accessing Google APIs

const apiKey = 'AIzaSyBKsPi8dOhaG0vphDtCsk6j-46iDN85cCU';
const projection = 'FULL';
const url = 'https://www.googleapis.com/urlshortener/v1/url';

// Some page elements

const $inputField = $('#input');
const $expandButton = $('#expand');
const $shortenButton = $('#shorten');
const $responseField = $('#responseField');

// AJAX functions

function expandUrl() {
 const  urlToExpand = url + '?key=' + apiKey +
'&shortUrl=' + $inputField.val();
 $.get(urlToExpand, response => {
  $responseField.append('<p>Your expanded url is: </p><p>' +
  response.longUrl + '</p>');
} , 'json');
}

//We can also use the $.getJSON method instead of $.get() when we want to use the data type json.
/* $.getJSON(urlToExpand, response => {
  $responseField.append('<p>Your expanded url is: </p><p>' +
  response.longUrl + '</p>');
});
} */



function shortenUrl() {
 const urlWithKey = url + '?key=' + apiKey;
 const urlToShorten = $inputField.val();
 $.post({
   url: urlWithKey,
   data: JSON.stringify({longUrl: urlToShorten}),
   dataType: 'json',
   contentType: 'application/json',
   success(response){
     $responseField.append('<p>Your shortened url is: </p><p>' + response.id + '</p>');
   },
   error(jqXHR, status, errorThrown){
     console.log(jqXHR);
   }
   
 });
}

function expand() {
  $responseField.empty();
  if (!$inputField.val()) { 
    $responseField.append('<p>Enter a valid URL</p>');
    return false; 
  }  
  expandUrl();
  return false;
}

function shorten() {
  $responseField.empty();
  if (!$inputField.val()) { 
    $responseField.append('<p>Enter a valid URL</p>');
    return false; 
  }  
  shortenUrl();
  return false;
}

// Call functions on submit

$expandButton.click(expand);
$shortenButton.click(shorten);