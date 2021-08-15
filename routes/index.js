const express = require("express");
const router = express.Router();
const mobiltyTrigger = require("./bap/trigger");
const bapAction = require("./bap/action");

// Middleware to add Auth
router.use("/", mobiltyTrigger); // Beckn Application Platform
router.use("/", bapAction); // Beckn Application Platform

module.exports = router;
