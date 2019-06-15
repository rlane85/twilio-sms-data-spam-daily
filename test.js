const request = require('request-promise');
const config = require('./config');
const chrono = require('chrono-node');
var dateFormat = require('dateformat');
function julianDate(dateWords) {
  newDate = dateFormat(chrono.parseDate(dateWords), "yyyymmdd");
  return newDate;
}
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
//var newDate = dateFormat(chrono.parseDate('today'), "yyyymmdd");
console.log(julianDate('today'));
//console.log(newDate);
/*request({uri: config.MSF_OPTIONS.dailyGames+newDate+'/games.json',
 headers: {'User-Agent': 'Request' },
 json: true}, (err, response, data) => {})
.then(function(data) {
  console.log(data.games[0].schedule.id);
          /*notification = service.notifications
            .create({
              toBinding: bindings,
              body: msg
            });
        });*/
      