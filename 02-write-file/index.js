const fs = require('fs');
const readline = require('readline');
const stream = fs.createWriteStream('02-write-file/02-write-file.txt');
const Path = '02-write-file.txt';
const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt(
  `Enter the text you want to save (Ctrl+C to exit or exit to input field): `,
);

rl.prompt();
rl.on('line', (inputText) => {
  if (inputText.toLowerCase() === 'exit') {
    console.log('\n' + 'Thank you - all entered text was saved at ' + Path);
    process.exit();
  }
  fs.appendFileSync('02-write-file/02-write-file.txt', inputText + ' ');
  rl.prompt();
});

rl.on('SIGINT', () => {
  console.log('\n' + 'Thank you - all entered text was saved at ' + Path),
    rl.pause();
});
