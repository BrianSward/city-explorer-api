'use strict';
console.log('first server');

//bring in express and other requires

const express = require('express');
require('dotenv').config();
// let data = require('./data/weather.json');
const cors = require('cors');
// bring in axios to have this act like a client doing its own API calls
const axios = require('axios');

//use express this app will become our server by using the fuction express(), this allows us to GET, LISTEN, and so forth

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

//routes
//routes proof of life

app.get('/', (request, response) => {
  response.status(200).send('Welcome to our server');
});

app.get('/weather', getWeather);

async function getWeather(request, response) {
  const lat = request.query.lat;
  const lon = request.query.lon;

  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

  try {
    const weatherResponse = await axios.get(url);
    // console.log(weatherResponse.data.data[0]);
    const weatherArray = weatherResponse.data.data.map(weather => new Weather(weather));
    response.status(200).send(weatherArray);
  } catch (err) {
    console.log('Error! Message is: ', err);
    response.status(500).send(`Server Error`);
  }
}

class Weather {
  constructor(weather) {
    this.description = weather.weather.description;
    this.date = weather.valid_date;
  }
}

app.get('/movies', getMovies);

async function getMovies(request, response) {
  const region = request.query.city;
  console.log(region);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${region}`;

  try {
    const movieResponse = await axios.get(url);
    // console.log(movieResponse.data.results);
    const movieArray = movieResponse.data.results.map(movie => new Movie(movie));
    response.status(200).send(movieArray);
  } catch (err) {
    console.log('Error! Message is: ', err);
    response.status(500).send(err);
  }
}

class Movie {
  constructor(movie) {
    this.name = movie.title;
    this.overview = movie.overview;
  }
}

// catch all at bottom
app.get('*', (request, response) => {
  response.status(404).send('this route does not exist');
});

app.listen(PORT, () => console.log(`we are up on port: ${PORT}`));

