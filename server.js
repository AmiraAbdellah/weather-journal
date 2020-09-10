// Setup empty JS object to act as endpoint for all routes
//change projectdata to array
const projectData = [];
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
// Callback to debug
const port = 8080;
const server = app.listen(port,(req,res)=>{
    console.log('server running');
    console.log(`running on localhost: ${port}`);
});
// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', (req, res)=>{
    res.send(projectData);
  })
// Post Route
app.post('/add', (req, res)=>{
  let newData = {
      temp: req.body.temp,
      date: req.body.date,
      feelings:req.body.feelings
     }  
    projectData.push(newData); 
  }); 