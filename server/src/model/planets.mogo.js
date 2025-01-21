const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  kepler_name: {
    type: String,
    required: true,
  },
});

const planetModel = mongoose.model("Planet", planetSchema);

module.exports = planetModel;
