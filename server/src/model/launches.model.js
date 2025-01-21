const launchModel = require("./launches.mongo");
const planets = require("./planets.mogo");

const DEFAUKT_FLIGHT_NUMBER = 100;

async function checkIfLaunchTargetPlanetExists(launch) {
  try {
    const planet = await planets.findOne({
      kepler_name: launch.target,
    });

    return planet;
  } catch (error) {
    console.log(error);
  }
}

async function saveLaunch(launch) {
  const checkPlanet = await checkIfLaunchTargetPlanetExists(launch);

  if (!checkPlanet) {
    throw new Error("No matching planet found");
  }

  try {
    await launchModel.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
  } catch (error) {
    throw new Error("Could not save launch");
  }
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchModel.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAUKT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchModel.find({}, { _id: 0, __v: 0 });
}

async function scheduleNewLaunch(launch) {
  const flightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ZTM", "NASA"],
    flightNumber,
  });
  return await saveLaunch(newLaunch);
}

async function existsLaunchWithId(launchId) {
  return await launchModel.findOne({
    flightNumber: launchId,
  });
}

async function abortLaunchById(id) {
  const aborted = await launchModel.updateOne(
    { flightNumber: id },
    { upcoming: false, success: false }
  );

  return aborted.ok === 1 && aborted.nModified === 1;
}

module.exports = {
  getAllLaunches,
  saveLaunch,
  abortLaunchById,
  existsLaunchWithId,
  scheduleNewLaunch,
};
