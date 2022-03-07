const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const api = require('./routes/api');

const corsOptions = {
  origin: function (origin, callback) {
    const whitelist = [
      'http://localhost:3000', // # REACT APP SERVER
      'http://localhost:8000',
      undefined, // # API SERVER
    ];
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const app = express();

app.use(cors(corsOptions));
app.use(morgan('combined')); // # MIDDLEWARE - To add route logs

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); // # REACT APP - Now Express is serving the app

app.use('/v1', api);

// # THIS WORKS WITH FRAMEWORKS WHICH USE THE HISTORY API AS SUPPORT TO ROUTING
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); // # SERVING THE HTML FILE FROM REACT APP
});

module.exports = app;
