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
function builder(msg){    
request(config.DS_OPTIONS, (err, response, dsData) => {
  dsMsg = 
`Forecast for ${dateFormat(dsData.daily.data[1].time * 1000, "ddd m/d")}: ${dsData.daily.data[1].summary}
Rain Chance: ${dsData.daily.data[1].precipProbability * 100}%
`});
request(config.LAUNCH_OPTIONS, (err, response, data) => {
  launchMsg =
`Next launch at Cape Canaveral, FL: ${dateFormat(data.results[0].net, "ddd m/d 'at' h:MM t")}
`});
request(config.WU_OPTIONS, (err, response, data) => {
   currentMsg=
`Current from WU Station ${data.observations[0].stationID}
Temp: ${data.observations[0].imperial.temp}
`});
request(config.WUSUMMARY_OPTIONS, (err, response, data) => {
    summaryMsg=
`Today's summary from WU Station ${data.summaries[6].stationID}
Wind gust high: ${data.summaries[6].imperial.windgustHigh} mph
`});
request(config.HERE_OPTIONS, (err, response, data) => {
    moonMsg =
`Current moon phase: ${data.astronomy.astronomy[0].moonPhase*100}% ${config.moonEmoji(data.astronomy.astronomy[0].moonPhaseDesc)}${data.astronomy.astronomy[0].moonPhaseDesc}`});
msg=launchMsg+dsMsg+currentMsg+summaryMsg+moonMsg;
return msg;
}
builder()
.then(function() {
  console.log(msg);
  notification = service.notifications
  .create({
    toBinding: bindings,
    body: msg
  });
});
          