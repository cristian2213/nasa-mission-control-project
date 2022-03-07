require('dotenv').config();
const http = require('http');
const app = require('./app');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadLaunchData();
  server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}

startServer();
