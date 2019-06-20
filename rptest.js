const request = require('request-promise');
<<<<<<< HEAD:rptest.js
const config = require('./config');
const chrono = require('chrono-node');
dateFormat = require('dateformat');
/*const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT, process.env.TWILIO_TOKEN
);
var numbers = new Array();
numbers = ['+13214033188'];
=======
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

request(config.DS_OPTIONS, (err, response, dsData) => {}).then(function(dsData){
  dsMsg = 
`Forecast for ${dateFormat(dsData.daily.data[1].time * 1000, "ddd m/d")}: ${dsData.daily.data[1].summary}
Rain Chance: ${dsData.daily.data[1].precipProbability * 100}%
`}).then(function(){
>>>>>>> 05f84e62d488674579dce82e49b70f6c0e63c58e:test.js

request(config.LAUNCH_OPTIONS, (err, response, data) => {}).then(function(data){
  launchMsg =
`Next launch at Cape Canaveral, FL: ${dateFormat(data.results[0].net, "ddd m/d 'at' h:MM t")}
`});
}).then(function(){
request(config.WU_OPTIONS, (err, response, data) => {}).then(function(data){
   currentMsg=
`Current from WU Station ${data.observations[0].stationID}
Temp: ${data.observations[0].imperial.temp}
`})
}).then(function(){

request(config.WUSUMMARY_OPTIONS, (err, response, data) => {}).then(function(data){
    summaryMsg=
`Today's summary from WU Station ${data.summaries[6].stationID}
Wind gust high: ${data.summaries[6].imperial.windgustHigh} mph
`});
}).then(function(){
request(config.HERE_OPTIONS, (err, response, data) => {}).then(function (data){
    moonMsg =
`Current moon phase: ${data.astronomy.astronomy[0].moonPhase*100}% ${config.moonEmoji(data.astronomy.astronomy[0].moonPhaseDesc)}${data.astronomy.astronomy[0].moonPhaseDesc}`
});
}).then(function() {
  epiMsg='Epilogue here';
})
.then(function() {
msg=/*launchMsg+dsMsg+currentMsg+*/summaryMsg+moonMsg;
  console.log(msg);
notification = service.notifications
  .create({
    toBinding: bindings,
    body: msg
  });
});
<<<<<<< HEAD:rptest.js
*/
//var newDate = dateFormat(chrono.parseDate('today'), "yyyymmdd");
//console.log(config.julianDate('today'));
//console.log(newDate);
//console.log(config.DS_TIMEOPTIONS.uri);
request(config.dsTimeMachine('tomorrow'), (err, response, dsData) => {})
.then(function(dsData) {
  console.log(dateFormat(dsData.daily.data[0].time*1000),"mm/dd/yyyy");
          /*notification = service.notifications
            .create({
              toBinding: bindings,
              body: msg
            });*/
        });
      
=======
          
>>>>>>> 05f84e62d488674579dce82e49b70f6c0e63c58e:test.js
