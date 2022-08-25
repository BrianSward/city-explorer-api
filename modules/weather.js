'use strict';
const axios = require('axios');

async function getWeather(request, response) {
  const lat = request.query.lat;
  const lon = request.query.lon;

  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=3`;

  try {
    const weatherResponse = await axios.get(url);

    const weatherArray = weatherResponse.data.data.map(weather => new Weather(weather));
    response.status(200).send(weatherArray);
  } catch (err) {
    console.log('Error! Message is: ', err);
    response.status(500).send(`Server Error`);
  }
}

// example of refactor with chaining for lab

// function getWeatherWithChaining (req, resp, next){
//   let searchQueryFromFrontEnd = req.query.searchQuery;
//   let baseUrl = '';
//   let params = {
//     key: '',
//     lat: '',
//     lon: '',
//     days: '',
//     query: searchQueryFromFrontEnd,
//   };
  
//   axios.get(baseUrl, {params})
//     .then(weatherResponse => weatherResponse.data.data.map(weather => new Weather(weather)))
//     .then(weatherArray => resp.status(200).send(weatherArray))
//     .catch(error => console.log(error));
// }

class Weather {
  constructor(weather) {
    this.description = weather.weather.description;
    this.date = weather.valid_date;
  }
}

// module.exports = getWeatherWithChaining;
module.exports = getWeather;
