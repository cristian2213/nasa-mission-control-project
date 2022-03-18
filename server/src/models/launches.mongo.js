const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },

  launchDate: {
    type: Date,
  },

  mission: {
    type: String,
    required: true,
  },

  rocket: {
    type: String,
    required: true,
  },

  target: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Planet',
    required: true,
  },

  customers: [String],

  upcoming: {
    type: Boolean,
    required: true,
  },

  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model('Launch', launchesSchema);