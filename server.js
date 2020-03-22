'use strict';
//in the geo.json we have an array of obj
// Express
const express = require('express');

// initialize a server
const server = express();


// Cross Origin Resource Sharing
const cors = require('cors');

//to make anyone use my app
server.use(cors()); // give access

// get all environment variable you need
//ability to use whats in the enviroment
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Make the app listening
server.listen(PORT, () => console.log('Listening at port 3000'));


//to test my app
//status 200 ma3naha suuccessful
//search on status code of http
server.get('/', (request, response) => {
    response.status(200).send('App is working CLAAAAASS');
});

//this is the response i should recieve
/* {
    "search_query": "lynwood",
    "formatted_query": "lynood,... ,WA, USA",
    "latitude": "47.606210",
    "longitude": "-122.332071"
  }
*/

function Location(city, locationData){
    this.formatted_query = locationData[0].display_name;
    this.latitude = locationData[0].lat;
    this.longitude = locationData[0].lon;
    this.search_query = city;
}



//i need the data in the geo.json and i want to get it
server.get('/location', (request, response) => {
    // Read the city from the user (request)
    // find the city in geo.json
    
    
    //that'show i get the file that contains the data
    const locationData = require('./data/geo.json');
    let location = new Location("lynwood", locationData);
    response.status(200).send(location);
});

//error handling
//anything we get not defined it will go here 
//status 404 ma3naha not found
server.use('*', (request, response) => {
    response.status(404).send('Sorry, not found');
});

//if my server has an error what should i do
//if i have an error im going to show it to the user

server.use((error, request, response) => {
    response.status(500).send(error);
});

//network tab in your console to see the errors



//momken a3mel fime . env bekoon 3ashan a5azen local variables ta3oni
//lazem a7ot be dit ignore .env