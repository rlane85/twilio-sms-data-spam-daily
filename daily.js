// Grab the two libraries we use for getting data and sending messages
const request = require('request');
const config = require('./config');
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT, process.env.TWILIO_TOKEN
);
var dateFormat = require('dateformat');

var numbers = new Array();
var numbers = config.NUMBERS;

const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);

const bindings = numbers.map(number => {
  return JSON.stringify({ binding_type: 'sms', address: number });
});
  console.log(numbers)
  request(config.DS_OPTIONS, (err, response, dsData) => {
    if (err) { return console.log(err); }
    notification = service.notifications
      .create({
        toBinding: bindings,
        body: (`
Forecast for ${dateFormat(dsData.daily.data[1].time * 1000, "ddd m/d")}:
${dsData.daily.data[1].summary}
Sunrise: ${dateFormat(dsData.daily.data[1].sunriseTime * 1000, "h:MM")}
Sunset: ${dateFormat(dsData.daily.data[1].sunsetTime * 1000, "h:MM")}
Moonphase: ${dsData.daily.data[1].moonPhase * 100}%
Feels Like: ${dsData.daily.data[1].apparentTemperatureLow}° - ${dsData.daily.data[0].apparentTemperatureHigh}° (at ${dateFormat(dsData.daily.data[1].apparentTemperatureHighTime * 1000, "h:MM")})
Rain Chance: ${dsData.daily.data[1].precipProbability * 100}%
Powered by darksky.net`)
      })
  });

  request(config.WU_OPTIONS, (err, response, data) => {
    if (err) { return console.log(err); }
    notification = service.notifications
      .create({
        toBinding: bindings,
        body: (`
Currently:
Temp: ${data.observations[0].imperial.temp}°
Wind Speed: ${data.observations[0].imperial.windSpeed} mph
Wind Direction: ${data.observations[0].winddir}
Rain Today: ${data.observations[0].imperial.precipTotal} inches`)
      })
  });
  request(config.WUSUMMARY_OPTIONS, (err, response, data) => {
    if (err) { return console.log(err); }
    notification = service.notifications
      .create({
        toBinding: bindings,
        body: (`
Today's summary from WU Station ${data.summaries[6].stationID}
Heat index high: ${data.summaries[6].imperial.heatindexHigh}
Wind gust high: ${data.summaries[6].imperial.windgustHigh} mph 
`)
      })
  })
