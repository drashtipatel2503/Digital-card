const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  contact: {
    type: String,
  },
  time: {
    type: String,
  },
  location: {
    type: String,
  },
  service: {
    type: String,
  },
});

module.exports = mongoose.model('service', serviceSchema);