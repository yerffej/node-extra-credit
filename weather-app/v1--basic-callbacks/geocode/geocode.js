const request = require('request');

// mapquest GEOCODING api
// SAMPLE url get request:
// http://www.mapquestapi.com/geocoding/v1/address?key=KEY&location=1600+Pennsylvania+Ave+NW,Washington,DC,20500

var geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURI(address);
  const MapQuestAPIKey = 'IDLgsFqj7BWEMGRwBWkvpGEJHL6PUjib';
  const MapQuestAPIurlGet = `http://www.mapquestapi.com/geocoding/v1/address?key=${MapQuestAPIKey}&location=${encodedAddress}`;

  request({url:MapQuestAPIurlGet, json:true}, (error, response, body) => {
    if(error) {
      callback(`ERROR: Unable to connect with MapQuest Client at ${error.hostname}`);
    } else if( response && response.statusCode === 403) {
      callback("ERROR: Unable to connect with MapQuest Client -- MapQuest API Key Invalid");
    } else if (response && response.statusCode === 200){
      if (body && body.info.statuscode === 400) {
        callback('ERROR: Insufficient info for location. Please provide a more detailed address.');
      } else {
        var street = body.results[0].locations[0].street,
            city = body.results[0].locations[0].adminArea5,
            state = body.results[0].locations[0].adminArea3,
            country = body.results[0].locations[0].adminArea1,
            lat = body.results[0].locations[0].latLng.lat,
            lng = body.results[0].locations[0].latLng.lng;
        var location = {street, city, state, country, lat, lng};
        callback(undefined, location); // undefined means there is no error
      }
    } else {
      callback('ERROR: Unknown error with Mapquest API. Logging response.', response);
    }
  });
}

module.exports = {
  geocodeAddress
};
