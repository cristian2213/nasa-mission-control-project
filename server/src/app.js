const express = require('express');
const cors = require('cors');
const path = require('path');

const planetsRouter = require('./routes/planets/planets.router');
const corsOptions = {
  origin: function (origin, callback) {
    const whitelist = [
      'http://localhost:3000', // # REACT APP SERVER
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
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); // # REACT APP - Now Express is serving the app
app.use(planetsRouter);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); // # SERVING THE HTML FILE FROM REACT APP
});
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); // # SERVING AGAIN THE HTML FILE FROM REACT APP
});
module.exports = app;
