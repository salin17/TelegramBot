const Telegraf = require('telegraf');
const bot = new Telegraf('882595709:AAGW8hXpOn95FYYI07fB56MSnp61XP_Ijhk');
const session = require('telegraf/session');

const Mongo = require('./mongo');
const Keyboard = require('./keyboard');
const Api = require('./api');

let nome, psw;
const log_keyboard = Keyboard.log_keyboard;
const menu_keyboard = Keyboard.menu_keyboard;
bot.use(session());

async function Navigazione(ctx, info) {
  await Mongo.Setup();
  switch (info[0]) {

    case 1.0:
      nome = await Mongo.Nome(ctx.message.text.toLowerCase());
      info[1] = nome.username;
      info[2] = nome.password;
      if (nome != null) {
        ctx.reply("Inserire password:");
        user = "ciao";
        info[0] = 1.1;
      } else {
        ctx.reply("Nome utente non trovato");
        bot.telegram.sendMessage(ctx.chat.id, "Riprovare", log_keyboard);
      }
      break;

    case 1.1:
      if (nome.password == ctx.message.text.toLowerCase()) {
        //console.log(nome.password);
        ctx.reply("Password coretta!!");
        bot.telegram.sendMessage(ctx.chat.id, "Accesso effetuato con successo", menu_keyboard);
        info[0] = 3;
      } else {
        ctx.reply("Password errata!!");
        bot.telegram.sendMessage(ctx.chat.id, "Riprovare", log_keyboard);
      }
      break;

    case 2.0:
      nome = ctx.message.text.toLowerCase();
      ctx.reply("Inserire password:");
      info[0] = 2.1;
      break;

    case 2.1:
      psw = ctx.message.text.toLowerCase();
      await Mongo.AddUser(nome, psw);
      bot.telegram.sendMessage(ctx.chat.id, "Registrazione effetuata con successo", menu_keyboard);
      info[0] = 3;
      info[1] = nome;
      info[2] = psw;
      break; 

    case 3:
      bot.telegram.sendMessage(ctx.chat.id, "BLABLABLA", log_keyboard);
      break;
    default:
      ctx.reply("Opzione non valida");
      bot.telegram.sendMessage(ctx.chat.id, "Riprovare", log_keyboard);
      break;
  }

  return info;
}

module.exports = { nome, Navigazione: Navigazione }