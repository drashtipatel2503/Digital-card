const express = require('express'); 
const mongoose = require('mongoose');
// const cors = require('cors');
const userrouter = require('./routes/user');

const servicerouter = require('./routes/service');
const app = express(); 
const PORT = 8080; 
const MONGODB_URI = "mongodb://localhost/card_db"; 

// app.use(cors())
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/user', userrouter); 
app.use('/service', servicerouter); 

mongoose.connect(MONGODB_URI); 
mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
});

app.listen(PORT, function() { 
  console.log(`Server listening on port ${PORT}.`);
});