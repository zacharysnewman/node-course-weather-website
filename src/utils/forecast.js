const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const weatherstackAPIToken = 'b45398377adec7df45760a022272c00c';
    const url = 'http://api.weatherstack.com/current?access_key=' + weatherstackAPIToken + '&query=' + latitude + ',' + longitude + '&units=f';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { weather_descriptions, temperature, precip, feelslike, humidity } = body.current;
            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + '° and it feels like ' + feelslike + '°. There is a ' + precip + '% chance of rain and ' + humidity + '% humidity.');
        }
    });
}

module.exports = forecast;