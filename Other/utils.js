const Telegraf = require('telegraf');
const bot = new Telegraf('882595709:AAGW8hXpOn95FYYI07fB56MSnp61XP_Ijhk');
const session = require('telegraf/session');
const Mongo = require('./mongo');

var utente, psw;

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
     }
   break;

    case 1.1:
      if(utente.password == ctx.message.text.toLowerCase()){
        ctx.reply("Password coretta!!");
        ctx.reply("Accesso effetuato");
        pos = 3;
      }else{
        ctx.reply("Password errata!!");
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
      pos = 3;
      
    break;

    case 3:
      ctx.reply("Accesso Effetuato");
      break;
    default:
        ctx.reply("Opzione non valida");
      break;
  }

    return pos;
}