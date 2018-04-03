const https = require('https');
 
https.get('https://api.nasa.gov/planetary/apod?api_key=x4TOhaSM9FbTiIZLgf4SoRNvU5fKUBpBjULni6f1&date=2017-09-24', (arg) => {
  var payload = '';
 
  // Recieved Data
  arg.on('data', (blob) => {
    payload += blob;
  });
 
  // Got all data. Print URL
  arg.on('end', () => {	
    console.log(JSON.parse(payload).url);
  });
 
});