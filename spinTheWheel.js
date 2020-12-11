const { alpha } = require('./constants.json');

module.exports = () => {
  const num = Math.floor(Math.random() * 100);

  const sendInsult = num < alpha;

  return sendInsult;
};
