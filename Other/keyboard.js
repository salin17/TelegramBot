const emoji = require('node-emoji');

const log_keyboard = {
  reply_markup: {
      keyboard: [
          [emoji.get('airplane_departure') + "Accedi" + emoji.get('airplane_departure'), emoji.get('small_airplane') + "Registrati" + emoji.get('small_airplane')],
          [emoji.get('satellite') + "Accedi" + emoji.get('satellite')]
      ],
      one_time_keyboard: true,
      resize_keyboard: true,
  }
};

module.exports= {log_keyboard}