const request = require('request-promise');
const config = require('./config');
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT, process.env.TWILIO_TOKEN
);
var dateFormat = require('dateformat');

var numbers = new Array();
numbers = ['+13214033188'];

const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);

const bindings = numbers.map(number => {
  return JSON.stringify({ binding_type: 'sms', address: number });
});

request(config.DS_OPTIONS, (err, response, dsData) => {})
  .then(function(dsData) {
    dsMsg = `
Forecast for ${dateFormat(dsData.daily.data[1].time * 1000, "ddd m/d")}:
${dsData.daily.data[1].summary}
Sunrise: ${dateFormat(dsData.daily.data[1].sunriseTime * 1000, "h:MM")}
Sunset: ${dateFormat(dsData.daily.data[1].sunsetTime * 1000, "h:MM")}
Moonphase: ${dsData.daily.data[1].moonPhase * 100}%
Feels Like: Low ${dsData.daily.data[1].apparentTemperatureLow}° - High ${dsData.daily.data[0].apparentTemperatureHigh}° (at ${dateFormat(dsData.daily.data[1].apparentTemperatureHighTime * 1000, "h:MM")})
Rain Chance: ${dsData.daily.data[1].precipProbability * 100}%
Powered by darksky.net
`});
request(config.LAUNCH_OPTIONS, (err, response, data) => {})
.then(function(data) {
    launchMsg = `
    Next launch at Cape Canaveral, FL: ${dateFormat(data.results[0].net, "ddd m/d 'at' h:MM t")}
    Rocket: ${data.results[0].rocket.configuration.name}
    Launch Agency: ${data.results[0].rocket.configuration.launch_service_provider}
    Mission: ${data.results[0].mission.name}
    Status: ${data.results[0].status.name}
    `})
.then(function() {
    epiMsg = `
    For more info please reply to this number with a keyword: current, summary, launch, or forecast (defaults to tomorrow; add keyword "today" to see the today's forecast - eg "forecast today").
    Link to known issues and list of things I would like to add: https://ahomeconnected.com/index.php/workin-on-it/`})
        .then(function() {
          console.log(launchMsg+epiMsg+dsMsg);
          notification = service.notifications
            .create({
              toBinding: bindings,
              body: launchMsg+epiMsg+dsMsg
            });
        });
      