const Telegraf = require('telegraf');
const bot = new Telegraf('882595709:AAGW8hXpOn95FYYI07fB56MSnp61XP_Ijhk');
const session = require('telegraf/session');
const emoji = require('node-emoji');

const Api = require('./Other/api');
const Utils = require('./Other/utils');
const Mongo = require('./Other/mongo');
const Keyboard = require('./Other/keyboard');


var pos = 0.0;
/*
const log_keyboard = {
    reply_markup: {
        keyboard: [
            [emoji.get('airplane_departure') + "Accedi" + emoji.get('airplane_departure'), emoji.get('small_airplane') + "Registrati" + emoji.get('small_airplane')],
            [emoji.get('satellite') + "Accedi" + emoji.get('satellite')]
        ],
        one_time_keyboard: true,
        resize_keyboard: true,
    }
};*/

const log_keyboard = Keyboard.log_keyboard;

bot.use(session());

bot.command(["Start","start"],(ctx) => {
    bot.telegram.sendMessage(ctx.chat.id,"Benvenuto nel bot!!! @" + ctx.from.username, log_keyboard);
})

bot.hears(["Api","api"],(ctx) => {
    Api.Cerca(ctx);
})
/*
bot.hears("Mongo",async(ctx) => {
    await Mongo.Setup();
    //await Mongo.SetUser("nome","pass");
    var boh = await Mongo.Nome("prova");
    //console.log(await Mongo.Nome("prova").username); NOPE
    console.log(boh.username);
})*/

bot.hears(emoji.get('airplane_departure') + "Accedi" + emoji.get('airplane_departure'),(ctx) => {
    ctx.reply("Inserire nome utente:");
    pos = 1.0;
})

bot.hears(emoji.get('small_airplane') + "Registrati" + emoji.get('small_airplane'),(ctx) => {
    ctx.reply("Inserire nome utente:");
    pos = 2.0;
})


bot.on("text", async (ctx) => {
   pos = await Utils.Navigazione(ctx,pos)
})



bot.launch();