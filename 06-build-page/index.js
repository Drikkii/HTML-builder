const fs = require('fs/promises');
const fsPromises = require('fs/promises');
const path = require('path');
const templateHtml = path.join(__dirname, 'template.html');
const copyTemplateHtml = path.join('06-build-page/project-dist', 'index.html');
const components = path.join(__dirname, 'components');
const mainAssets = path.join(__dirname, 'assets');
const copyAssetss = path.join('06-build-page/project-dist', 'assets');
const parentFolder = '06-build-page';
const firstFolderName = 'project-dist';
const secondFolderName = 'assets';
const firstFolderPath = path.join(parentFolder, firstFolderName);
const secondFolderPath = path.join(firstFolderPath, secondFolderName);

fs.mkdir(firstFolderPath, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  } else {
    fs.mkdir(secondFolderPath, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
});
// _______
async function tegChacks() {
  const templateContent = await fs.readFile(templateHtml, 'utf-8');
  const Data = {};
  const componentFiles = await fs.readdir(components);
  for (const componentFile of componentFiles) {
    const componentName = path.parse(componentFile).name;
    const componentFilePath = path.join(components, componentFile);
    const componentContent = await fs.readFile(componentFilePath, 'utf-8');
    Data[`{{${componentName}}}`] = componentContent;
  }
  let finalHtml = templateContent;
  for (const [allTag, content] of Object.entries(Data)) {
    finalHtml = finalHtml.replace(new RegExp(allTag, 'g'), content);
  }
  const finishPath = path.join(__dirname, 'project-dist/index.html');
  await fs.writeFile(finishPath, finalHtml, 'utf-8');
  async function removeAllLines() {
    const readFile = path.join(__dirname, 'project-dist/index.html');
    let lines = await fs.readFile(readFile, 'utf-8');
    lines = lines.replace(/^\s*[\r\n]/gm, '');
    await fs.writeFile(readFile, lines, 'utf-8');
  }
  removeAllLines();
}
// __________

async function copyAssets(sourcePath, distPath) {
  await fsPromises.mkdir(distPath, {
    recursive: true,
  });
  const files = await fsPromises.readdir(sourcePath);
  files.forEach(async (fileName) => {
    const mainAssPath = path.join(sourcePath, fileName);
    const fileStats = await fsPromises.stat(mainAssPath);
    const copyAssPath = path.join(distPath, fileName);
    if (fileStats.isDirectory()) {
      await copyAssets(mainAssPath, copyAssPath);
    } else {
      await fsPromises.copyFile(mainAssPath, copyAssPath);
    }
  });
}
// _______

async function copyTemplate(sourcePath, destinationPath) {
  const data = await fs.readFile(sourcePath, 'utf-8');
  const destinationFolder = path.dirname(destinationPath);
  await fs.mkdir(destinationFolder, { recursive: true });
  await fs.writeFile(destinationPath, data, 'utf-8');
}
// ______

// ______
async function styleCss() {
  const folderPath = '06-build-page/styles';
  const finalPath = '06-build-page/project-dist';
  const finishCss = path.join(finalPath, 'style.css');

  const files = await fs.readdir(folderPath);
  const fileContents = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const fileStat = await fs.stat(filePath);

    if (fileStat.isFile()) {
      const extension = path.extname(file);

      if (extension === '.css') {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        fileContents.push(fileContent);
      }
    }
  }

  await fs.writeFile(finishCss, fileContents.join(''), 'utf-8');
}
// ________

copyAssets(mainAssets, copyAssetss);
styleCss();
copyTemplate(templateHtml, copyTemplateHtml);
tegChacks();
console.log('Html-build - complited!');
