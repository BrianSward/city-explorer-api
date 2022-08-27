'use strict';
console.log('first server');

//bring in express and other requires

const express = require('express');
require('dotenv').config();
// let data = require('./data/weather.json');
const cors = require('cors');
// bring in axios to have this act like a client doing its own API calls


const getWeather = require('./modules/myweather.js');
const getMovies = require('./modules/movies.js');
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

app.get('/movies', getMovies);

// catch all at bottom
app.get('*', (request, response) => {
  response.status(404).send('this route does not exist');
});

app.listen(PORT, () => console.log(`we are up on port: ${PORT}`));

