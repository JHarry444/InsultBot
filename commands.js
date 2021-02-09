const axios = require('axios');

const tea = (msg) => {
  msg.reply('https://www.youtube.com/watch?v=czuicfphvZ4');
};

const define = (msg, words) => {
  const cleanWord = (word) => {
    const start = word.charAt(0).toUpperCase();
    const rest = word.substring(1, word.length).toLowerCase();
    return start + rest;
  };
  const searchTerm = words.length > 1 ? words.map((word) => cleanWord(word)).join('_') : words[0];
  const URL = `https://en.wikipedia.org/wiki/${searchTerm}`;
  axios.get(URL).then(({ data }) => {
    if (data.includes('Wikipedia does not have an article with this exact name.')) {
      msg.reply('Sorry, I cannot find that');
    } else {
      msg.reply(URL);
    }
  }).catch(() => msg.reply('Sorry, I cannot find that'));
};

const insult = (msg) => {
  const { users } = msg.mentions;
  if (!users) {
    return axios.get('https://insult.mattbas.org/api/insult')
      .then(({ data }) => msg.reply(data))
      .catch((err) => console.log(err));
  }
  users.forEach((user) => {
    axios.get('https://insult.mattbas.org/api/insult')
      .then(({ data }) => msg.channel.send(`${user} ${data}`))
      .catch((err) => console.log(err));
  });
};

const error = (msg, reason) => msg.reply(reason ? `ERROR: ${reason}` : 'ERROR');

module.exports = {
  tea,
  define,
  insult,
  error,
};
