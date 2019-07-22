const request = require('request-promise');
const config = require('./config');
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT, process.env.TWILIO_TOKEN
);
var dateFormat = require('dateformat');

var numbers = new Array();
numbers = ['+13214033188', '+13213683060', '+13219600909', '+13212056878'];

const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);

const bindings = numbers.map(number => {
  return JSON.stringify({ binding_type: 'sms', address: number });
});

request(config.DS_OPTIONS, (err, response, dsData) => {})
.then(function(dsData) {
  dsMsg = 
`"Forecast:" for ${dateFormat(dsData.daily.data[1].time * 1000, "ddd m/d")}: ${dsData.daily.data[1].summary}
Rain Chance: ${Math.round(dsData.daily.data[1].precipProbability * 100)}%

`});

request(config.LAUNCH_OPTIONS, (err, response, data) => {})
.then(function(data) {
  if (data.results[0].status.id==6 || data.results[0].status.id==3){success = 1}
  else {success=0}
  launchMsg = 
`"Launch:" ${dateFormat(data.results[success].net, "ddd m/d 'at' h:MM t")}

`})

.then(function() {return request(config.WU_OPTIONS, (err, response, data) => {});})
    .then(function(data) {
    currentMsg = 
`"Current:" Temp: ${data.observations[0].imperial.temp}

`})

.then(function() {return request(config.WUSUMMARY_OPTIONS, (err, response, data) => {});})
    .then(function(data) {//index 6 is today
    summaryMsg =
`"Summary:" Heat index high: ${data.summaries[6].imperial.heatindexHigh}

`})
.then(function() {return request(config.HERE_OPTIONS, (err, response, data) => {});})
    .then(function(data) {
    moonMsg =
`"Moon:" ${Math.round(data.astronomy.astronomy[0].moonPhase*100)}% ${config.moonEmoji(data.astronomy.astronomy[0].moonPhaseDesc)}${data.astronomy.astronomy[0].moonPhaseDesc}

`})   

.then(function() {
  msg =launchMsg+dsMsg+currentMsg+summaryMsg+moonMsg;
  console.log(msg);
  notification = service.notifications
  .create({
    toBinding: bindings,
    body: msg
  });
});