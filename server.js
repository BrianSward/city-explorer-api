'use strict';
console.log('first server');

//bring in express and other requires
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');


//use express this app will be server 
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

//routes
//routes proof of life

app.get('/', (request, response) => {
  response.status(200).send('Welcome to our server');
});

app.get('/weather', (request, response)=>{
  // let city_name = request.query.city;
  let dataToGroom = data.find(city => city.city_name.toLowerCase() === request.query.city_name.toLowerCase());
  let dataToSend = new City (dataToGroom);
  response.status(200).send(dataToSend);
});

class City {
  constructor(cityObj){
    this.city_name = cityObj.city_name;
    this.lon = cityObj.lon;
    this.lat = cityObj.lat;
    this.weather1 = cityObj.data[0].weather.description;
    this.weather2 = cityObj.data[1].weather.description;
    this.weather3 = cityObj.data[2].weather.description;
  }
}

// catch all at bottom
app.get('*', (request, response)=>{
  response.status(404).send('this route does not exist');
});

app.listen(PORT, ()=> console.log(`we are up on port: ${PORT}`));

