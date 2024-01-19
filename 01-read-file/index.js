const fs = require('fs');
const path = require('path');
const pathText = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathText, 'utf-8');
stream.on('data', function (chunk) {
  console.log(chunk.toString());
});
