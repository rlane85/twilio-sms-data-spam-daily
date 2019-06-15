const request = require('request-promise');
const config = require('./config');
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT, process.env.TWILIO_TOKEN
);
function moonEmoji(phase) {
  emoji = ['🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔','🌙'];
  index = Math.round(phase / 12.5);
  return emoji[index];
}
var numbers = new Array();
numbers = ['+13214033188'];

const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);

const bindings = numbers.map(number => {
  return JSON.stringify({ binding_type: 'sms', address: number });
});

request(config.HERE_OPTIONS, (err, response, data) => {})
.then(function(data) {
  emoji = moonEmoji(88);//data.astronomy.astronomy[0].moonPhase);
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
      