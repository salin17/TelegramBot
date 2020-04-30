const Telegraf = require('telegraf');
const bot = new Telegraf('882595709:AAGW8hXpOn95FYYI07fB56MSnp61XP_Ijhk');
const session = require('telegraf/session');
var unirest = require("unirest");


bot.use(session());

module.exports.Cerca = function (ctx) {
    unirest
        .get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/IT/EUR/it-IT/")
        .headers({"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com", "x-rapidapi-key": "a32373c704mshbe769e83869fa5ep1e5c46jsn4857f4c37cea"})
        .query({ "query": "milan"})
        .then((response) => {
            bot.telegram.sendMessage(ctx.chat.id, response.body.Places[0].PlaceId + "\r\n" + 
                                      response.body.Places[0].PlaceName + "\r\n" + 
                                      response.body.Places[0].CountryId + "\r\n" +  
                                      response.body.Places[0].CityId + "\r\n" +  
                                      response.body.Places[0].CountryName + "\r\n"   
                                    );    
        
        //console.log(response.body);                             
        })
        
}