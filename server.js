'use strict';
console.log('first server');

//bring in express and other requires
const express = require('express');
require('dotenv').config();
// let data = require('./data/weather.json');
const cors = require('cors');


//use express this app will be server 
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

//routes
//routes proof of life

// app.get('/',(request, response => {
//   response.status(200).send('welcome to our server');
// }));

// app.get('/weather', (request, response)=>{
//   let city_name = request.query.city;
//   let dataToGroom = data.find(city => city.city_name === city_name);
//   let dataToSend = new City (dataToGroom);
//   response.status(200).send(dataToSend);
// });

// class City {
//   constructor(cityObj){
//     this.city_name = cityObj.city_name;
//     // this.weather to go here
//   }
// }

// catch all at bottom
app.get('*', (request, response)=>{
  response.status(404).send('this route does not exist');
});

app.listen(PORT, ()=> console.log(`we are up on port: ${PORT}`));

