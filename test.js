const request = require('request-promise');
const config = require('./config');
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT, process.env.TWILIO_TOKEN
);
function moonEmoji(phase) {
  switch(phase) {
    case 'New moon':
      emoji = '🌑';
      break;
    case 'Waxing crescent':
      emoji = '🌒';
      break;
    case 'First Quarter':
      emoji = '🌓';
      break;
    case 'Waxing gibbous':
      emoji = '🌔';
      break;
    case 'Full moon':
      emoji = '🌕';
      break;
    case 'Waning gibbous':
      emoji = '🌖';
      break;
    case 'Last Quarter':
      emoji = '🌗';
      break;
    case 'Waning crescent':
      emoji = '🌘';
      break;
  }
  return emoji;
}
var numbers = new Array();
numbers = ['+13214033188'];

const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);

const bindings = numbers.map(number => {
  return JSON.stringify({ binding_type: 'sms', address: number });
});

request(config.HERE_OPTIONS, (err, response, data) => {})
.then(function(data) {
  emoji = moonEmoji('Waxing crescent');//data.astronomy.astronomy[0].moonPhase);
msg = `
Current moon phase: ${data.astronomy.astronomy[0].moonPhase*100}%
${emoji}${data.astronomy.astronomy[0].moonPhaseDesc}
Moon Rise: ${data.astronomy.astronomy[0].moonrise}
Moon Set: ${data.astronomy.astronomy[0].moonset}
`})    
.then(function() {
          console.log(msg);
          /*notification = service.notifications
            .create({
              toBinding: bindings,
              body: msg
            });*/
        });
      