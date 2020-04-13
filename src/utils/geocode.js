const request = require('postman-request');

const geocode = (address, callback) => {
    const mapboxAPIToken = 'pk.eyJ1IjoiemFjaGFyeXNuZXdtYW4iLCJhIjoiY2s4a2loaDZhMDI4cjNlcXN3ZjgzNDMxbiJ9.qXm4hmUoXGeoU9ih6hW4RQ';
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapboxAPIToken + '&limit=1';

    request({ url, json: true }, (error, response) => {
        const { features } = response.body;

        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            });
        }
    });
};

module.exports = geocode;