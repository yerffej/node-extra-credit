// sample API call
// https://api.darksky.net/forecast/563d4b2d2df603948e6084cead1815da/37.8267,-122.4233

const request = require('request');

var getWeather = (lat, lng, callback) => {
  const weatherApiUrl = `https://api.darksky.net/forecast/563d4b2d2df603948e6084cead1815da/${lat},${lng}`;
  request({url:weatherApiUrl, json:true}, (error, response, body) => {
    if (error) {
      callback('ERROR: Unable to connect to the darksky API');
    } else if (response && response.statusCode === 200) {
      callback(undefined, `The temperature is ${body.currently.temperature}. It feels like ${body.currently.apparentTemperature}`);
    } else {
      callback('Unknown error: ', error);
    }
  });
}

module.exports = {
  getWeather
}
