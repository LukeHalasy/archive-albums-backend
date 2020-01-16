const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type = application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/index.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}).then(() => {
  console.log("Succesfully connected to the database");
}).catch(err => {
  console.log("Could not connect to the database. Exiting now...", err);
  process.exit();
})

// define a simple route
app.get('/', (req, res) => {
  res.json({"message": "Welcome to music to listen to. I use this to keep track of albums I want to listen to"});
});

require('./app/routes/album.routes.js')(app);

// listen for requests
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
})

