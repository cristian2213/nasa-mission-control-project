const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 8000;
// REVIEW THIS APPROACH LETS ME STRUCTURE THE BETTER PROJECT AND LETS ME USE OTHER TYPES OF CONNECTIONS, FOR INSTANCE WEBSOCKETS FOR REAL TIME COMMUNICATION.
const { loadPlanetsData } = require('./models/planets.model');

const server = http.createServer(app);

async function startServer() {
  await loadPlanetsData();
  server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}

startServer();
