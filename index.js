const TelegramBot = require('node-telegram-bot-api');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

const bot = new TelegramBot(auth.token, {polling: true});

// Matches "/flip"
bot.onText(/\/flip/, (msg, match) => {
  const flip = Math.round(Math.random());
  const result = (flip == 0 ? "heads" : "tails")

  logger.info(msg.from.first_name + " " + msg.from.last_name + " Requested a flip that resulted in: " + result)
  bot.sendMessage(msg.chat.id, result);
});

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });