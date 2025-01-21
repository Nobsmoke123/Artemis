require("dotenv").config();
const http = require("http");

const app = require("./app");
const { loadPlanetsData } = require("./model/planets.model");
const { connectDatabase } = require("./database/database");

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

async function startServer() {
  await connectDatabase();

  await loadPlanetsData(); // Block on this function until data is loaded.

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
