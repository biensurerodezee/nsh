// Request and publish on surge.sh

// Require defaults
var http = require('http');
var fs = require('fs');
var data ='created file';

// WriteFile function with filename, content and callback function
fs.writeFile('request.txt', data, function (err) {
  if (err) throw err;
  console.log('File is created successfully.');
});


// do something nsh can do
console.log(ls());


