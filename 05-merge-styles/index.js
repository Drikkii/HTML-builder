const fs = require('fs');
const path = require('path');
const folderPath = '05-merge-styles/styles';
const finalPath = '05-merge-styles/project-dist';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    const bundleFilePath = path.join(finalPath, 'bundle.css');
    const writeStream = fs.createWriteStream(bundleFilePath, {
      encoding: 'utf-8',
    });
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.stat(filePath, (err, files) => {
        if (err) {
          console.error(err);
        } else {
          if (files.isFile()) {
            const extension = path.extname(file);

            if (extension == '.css') {
              const pathText = path.join(folderPath, file);
              const stream = fs.createReadStream(pathText, 'utf-8');
              stream.on('data', (chunk) => {
                writeStream.write(chunk);
              });
              stream.on('end', () => {
                writeStream.end();
              });
            }
          }
        }
      });
    });
    console.log(
      'File along the path: ' + finalPath + ' with title' + ' bundle.css',
    );
  }
});
