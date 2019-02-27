// steps
// create shell of app with yargs

// create location api call
// add error handling

// create weather api call
// add error-handling

// sew it all up

const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
  .options({
    'address': {
      alias: "a",
      demandOption: true,
      describe: "the address for determining the weather",
      type: 'string'
    }
  })
  .help()
  .argv;

geocode.geocodeAddress(argv.address, (error, response) => {
  if (error) {
    console.log(error);
    if(response) {
      console.log(response);
    }
  } else {
    // console.log('Success!', response.lat, response.lng);
    var streetAside = response.street ? ` (right around ${response.street})` : '';
    var locationPretty = `${response.city}, ${response.state} ${response.country} ${streetAside}`;
    weather.getWeather(response.lat, response.lng, (error, weatherResult) => {
      if (error) {
        console.log(error);
        if (weatherResult) {
          console.log(weatherResult);
        }
      } else {
        console.log(`The weather in ${locationPretty}`);
        console.log(weatherResult);
      }
    });
  }
});
