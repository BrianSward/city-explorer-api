'use strict';
const axios = require('axios');

async function getMovies(request, response) {
  const region = request.query.city;
  console.log(region);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${region}`;

  try {
    const movieResponse = await axios.get(url);
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

module.exports = getMovies;
