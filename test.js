const request = require('request-promise');
const config = require('./config');
/*const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT, process.env.TWILIO_TOKEN
);
var numbers = new Array();
numbers = ['+13214033188'];

const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);
*/
/*const bindings = numbers.map(number => {
  return JSON.stringify({ binding_type: 'sms', address: number });
});
*/
request(config.MSF_options, (err, response, data) => {})
.then(function(data) {
  console.log(data.games[0].schedule.id);
          /*notification = service.notifications
            .create({
              toBinding: bindings,
              body: msg
            });*/
        });
      