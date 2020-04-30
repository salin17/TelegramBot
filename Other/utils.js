const Telegraf = require('telegraf');
const bot = new Telegraf('882595709:AAGW8hXpOn95FYYI07fB56MSnp61XP_Ijhk');
const session = require('telegraf/session');
const Mongo = require('./mongo');
const Keyboard = require('./keyboard');
var utente, psw;
const log_keyboard = Keyboard.log_keyboard;
const menu_keyboard = Keyboard.menu_keyboard;
bot.use(session());

module.exports.Navigazione = async function (ctx,pos) {
  await Mongo.Setup();
  switch (pos) {

    case 1.0:  
      utente = await Mongo.Nome(ctx.message.text.toLowerCase());
      if(utente != null){
          ctx.reply("Inserire password:");
         pos = 1.1;
      }else
      {
       ctx.reply("Nome utente non trovato");
       bot.telegram.sendMessage(ctx.chat.id,"Riprovare", log_keyboard);
     }
   break;

    case 1.1:
      if(utente.password == ctx.message.text.toLowerCase()){
        ctx.reply("Password coretta!!");
        bot.telegram.sendMessage(ctx.chat.id,"Accesso effetuato con successo", menu_keyboard);
        pos = 3;
      }else{
        ctx.reply("Password errata!!");
        bot.telegram.sendMessage(ctx.chat.id,"Riprovare", log_keyboard);
      }
    break;

    case 2.0:
      utente = ctx.message.text.toLowerCase();
      ctx.reply("Inserire password:");
      pos = 2.1;
    break;

    case 2.1:
      psw = ctx.message.text.toLowerCase();
      await Mongo.AddUser(utente,psw);
      bot.telegram.sendMessage(ctx.chat.id,"Registrazione effetuata con successo", menu_keyboard);
      pos = 3;
      
    break;S

    case 3:
      bot.telegram.sendMessage(ctx.chat.id,"BLABLABLA", log_keyboard);
      break;
    default:
        ctx.reply("Opzione non valida");
        bot.telegram.sendMessage(ctx.chat.id,"Riprovare", log_keyboard);
      break;
  }

 return pos;
}