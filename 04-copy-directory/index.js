const fs = require('fs/promises');
const path = require('path');
const folderPath = '04-copy-directory';
const mainFolder = path.join(folderPath, 'files');
const copyFolder = path.join(folderPath, 'files-copy');

async function newDirectory() {
  await fs.mkdir(copyFolder, { recursive: true });
  const initialFiles = await fs.readdir(mainFolder);
  for (const file of initialFiles) {
    const mainFilePath = path.join(mainFolder, file);
    const copyFilePath = path.join(copyFolder, file);
    await fs.copyFile(mainFilePath, copyFilePath);
  }
  const currentFiles = await fs.readdir(copyFolder);
  const missingFilesInCopy = currentFiles.filter(
    (file) => !initialFiles.includes(file),
  );
  if (missingFilesInCopy.length > 0) {
    missingFilesInCopy.forEach(async (file) => {
      console.log(file);
      const filePathToDelete = path.join(copyFolder, file);
      await fs.unlink(filePathToDelete);
    });
  }
  const extraFilesInCopy = initialFiles.filter(
    (file) => !currentFiles.includes(file),
  );
  if (extraFilesInCopy.length > 0) {
    extraFilesInCopy.forEach(async (file) => {
      console.log(file);
      const filePathToDelete = path.join(copyFolder, file);
      await fs.unlink(filePathToDelete);
    });
  }
}

newDirectory();
