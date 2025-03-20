const { spawn } = require('child_process');

console.log('Starting local development environment...');

const commands = {
  backEnd: 'cd back-end && npm run start',
  frontEnd: 'cd front-end && npm run dev',
};

Object.entries(commands).forEach((commandData) => {
  const [commandName, command] = commandData;
  const process = spawn(command, { shell: true });

  process.stdout.on('data', (data) => {
    console.log(`${commandName}: ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.log(`${commandName}: ${data}`);
  });

  process.on('close', () => {
    console.log(`${commandName}: ${data}`);
  });
});
