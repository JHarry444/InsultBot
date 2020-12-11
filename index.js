const Discord = require('discord.js');
const Axios = require('axios');
const sendInsult = require('./spinTheWheel');
const { token, cads } = require('./constants.json');

const bot = new Discord.Client();

bot.login(token);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', (msg) => {
  let reply = '';

  const author = msg.author.username.toLowerCase();
  if (author === 'computer') return;

  if (cads.includes(author) && sendInsult()) {
    Axios.get('https://insult.mattbas.org/api/insult').then(({ data }) => msg.reply(data));
  } else if (author === 'tomfowler' || author === 'tom fowler') {
    reply = 'Get a haircut.';
  }

  const content = msg.cleanContent.toLowerCase();

  if (content.includes('earl') && content.includes('earl') && content.includes('hot')
  ) {
    reply = 'https://www.youtube.com/watch?v=R2IJdfxWtPM';
  }

  if (reply) msg.reply(reply);
});
