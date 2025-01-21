const { getAllPlanets } = require("./../model/planets.model");

const httpGetAllPlanets = async (req, res) => {
  const planets = await getAllPlanets();
  return res.status(200).send(planets);
};

module.exports = {
  httpGetAllPlanets,
};
