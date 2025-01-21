const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const planetsRouter = require("./routes/planets.router");
const launchesRoutes = require("./routes/launches.router");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
); // Enable All CORS Requests

app.use(morgan("combined")); // Log all HTTP requests.

app.use(express.json()); // Parse any JSON from the body of incoming Requests.

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/planets", planetsRouter);
app.use("/launches", launchesRoutes);

// React application router.
app.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
