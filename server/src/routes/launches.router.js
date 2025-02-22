const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require("./../controllers/launches.controller");

const router = express.Router();

router.get("/", httpGetAllLaunches);

router.post("/", httpAddNewLaunch);

router.delete("/:id", httpAbortLaunch);

module.exports = router;
