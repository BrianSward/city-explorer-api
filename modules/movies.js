'use strict';
const axios = require('axios');
let cache = {};

async function getMovies(request, response) {
  const region = request.query.city;
  console.log(region);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${region}`;

  try {

    let key = region+'movies';

    if (cache[key] &&(Date.now() - cache[key].timeStamp < 50000)){
      
      console.log('Cache hit, movies present');
      response.status(200).send(cache[key].data);

    } else{
      console.log('Cache missed - no movies present');
      const movieResponse = await axios.get(url);

      const movieArray = movieResponse.data.results.map(movie => new Movie(movie));

      cache[key] = {
        timeStamp: Date.now(),
        data: movieArray
      };

      response.status(200).send(movieArray);
    }
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
