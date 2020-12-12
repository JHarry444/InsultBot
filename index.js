const Discord = require('discord.js');
const { token } = require('./constants.json');
const commands = require('./commands');

const bot = new Discord.Client();

bot.login(token);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', (msg) => {
  if (msg.author.username.toLowerCase() === 'computer') return;

  const content = msg.cleanContent.toLowerCase().trim();
  if (content.startsWith('!computer')) {
    const [command, ...args] = content.replace('!computer ', '').split(' ').filter((arg) => arg);
    if (commands[command]) commands[command](msg, args); else commands.error(msg, 'Invalid command');
  }
});
