const fs = require('fs').promises;
const readline = require('readline');
const Path = '02-write-file.txt';
const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt(
  `Enter the text you want to save (Ctrl+C to exit or exit to input field): `,
);

rl.prompt();

rl.prompt();

rl.on('line', async (inputText) => {
  if (inputText.trim().toLowerCase() === 'exit') {
    console.log('\n' + 'Thank you - all entered text was saved at ' + Path);
    process.exit();
  }

  await fs.appendFile('02-write-file/02-write-file.txt', inputText + ' ');
  rl.prompt();
});

rl.on('SIGINT', () => {
  console.log('\n' + 'Thank you - all entered text was saved at ' + Path),
    rl.pause();
});
