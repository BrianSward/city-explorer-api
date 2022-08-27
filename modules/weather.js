'use strict';

let cache = require('./cache.js');

const axios = require('axios');

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.map(day => {
      console.log('hello there ya!');
      return new Weather(day);
    });
    return (weatherSummaries);
  } catch (e) {
    return (e);
  }
}
async function weather(request, response) {
  try {
    const lat = request.query.lat;
    const lon = request.query.lon;
    console.log(lat, lon);
    const key = 'weather-' + lat + lon;

    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
      console.log('Cache hit - weather present');
      response.status(200).send(cache[key].data);
    } else {
      console.log('Cache miss - no weather present');

      const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5`;
      let weatherResponse = await axios.get(url);

      let weatherArray = parseWeather(weatherResponse.data.data);

      cache[key] = {
        timestamp: Date.now(),
        data: weatherArray,
      };
      response.status(200).send(cache[key].data);
    }

  } catch (err) {
    console.log('Error! Message is: ', err);
    response.status(500).send(`Server Error`);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}
module.exports = {weather};
