const fs = require('fs/promises');
const path = require('path');
const folderPath = '04-copy-directory';
const mainFolder = path.join(folderPath, 'files');
const copyFolder = path.join(folderPath, 'files-copy');

async function newDirectory() {
  await fs.mkdir(copyFolder, { recursive: true });

  const files = await fs.readdir(mainFolder);

  for (const file of files) {
    const mainFolderPath = path.join(mainFolder, file);
    const copyFolderPath = path.join(copyFolder, file);
    await fs.copyFile(mainFolderPath, copyFolderPath);
  }

  console.log('folder copied');
}

newDirectory();
