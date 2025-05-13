// Create File
var fs = require('fs');
var data ='created file';

// writeFile function with filename, content and callback function
fs.writeFile('file.txt', data, function (err) {
  if (err) throw err;
  console.log('File is created successfully.');
});

// do something nsh can do
console.log(ls());

