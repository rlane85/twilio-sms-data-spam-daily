// Grab the two libraries we use for getting data and sending messages
const request = require('request');
const config = require('./config');
var dateFormat = require('dateformat');

var numbers = new Array();
numbers = ['+13214033188', '+13213683060', '+13219600909', '+13212056878'];


const bindings = numbers.map(number => {
  return JSON.stringify({ binding_type: 'sms', address: number });
});
function dsForecast(body) {
request(config.DS_OPTIONS, (err, response, dsData) => {
  if (err) { return console.log(err); }
      body = `
Forecast for ${dateFormat(dsData.daily.data[1].time * 1000, "ddd m/d")}:
${dsData.daily.data[1].summary}
Sunrise: ${dateFormat(dsData.daily.data[1].sunriseTime * 1000, "h:MM")}
Sunset: ${dateFormat(dsData.daily.data[1].sunsetTime * 1000, "h:MM")}
Moonphase: ${dsData.daily.data[1].moonPhase * 100}%
Feels Like: ${dsData.daily.data[1].apparentTemperatureLow}° - ${dsData.daily.data[0].apparentTemperatureHigh}° (at ${dateFormat(dsData.daily.data[1].apparentTemperatureHighTime * 1000, "h:MM")})
Rain Chance: ${dsData.daily.data[1].precipProbability * 100}%
Powered by darksky.net`
});
return body};
function launch(body) {
request(config.LAUNCH_OPTIONS, (err, response, data) => {
  if (err) { return console.log(err); }
  if (data.results[0].status.id == '3') {
    var success = 1
  }
  else {
    var success = 0
  }
    body = body + `
Next launch at Cape Canaveral, FL: ${dateFormat(data.results[success].net, "ddd m/d 'at' h:MM t")}
Rocket: ${data.results[success].rocket.configuration.name}
Launch Agency: ${data.results[success].rocket.configuration.launch_service_provider}
Mission: ${data.results[success].mission.name}
Status: ${data.results[success].status.name}
`
});
return body};
console.log(body);