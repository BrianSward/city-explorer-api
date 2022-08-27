'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getMovies = require('./modules/movies.js');
const {weather} = require('./modules/weather.js');
const app = express();
app.use(cors());

app.get('/weather', weather);
app.get('/movies', getMovies);

// catch all at bottom
app.get('*', (request, response) => {
  response.status(404).send('this route does not exist');
});
app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
