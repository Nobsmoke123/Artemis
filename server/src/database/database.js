const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("connected", () => {
  console.log("Mongoose connected!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function connectDatabase() {
  await mongoose.connect(MONGO_URL);
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
};
