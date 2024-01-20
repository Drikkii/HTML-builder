const fs = require('fs');
const path = require('path');
const folderPath = '03-files-in-folder/secret-folder';
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      const filePath = `${folderPath}/${file}`;
      fs.stat(filePath, (err, files) => {
        if (err) {
          console.error(err);
        } else {
          if (files.isFile()) {
            const fileSizeInBytes = files.size / 1024;
            const extension = path.extname(file);
            console.log(
              path.basename(file, extension) +
                ' - ' +
                extension.slice(1) +
                ' - ' +
                fileSizeInBytes +
                ' Kb',
            );
          }
        }
      });
    });
  }
});
