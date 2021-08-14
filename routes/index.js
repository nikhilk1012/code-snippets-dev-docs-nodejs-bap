const express = require("express");
const router = express.Router();
const mobiltyTrigger = require("./mobility/trigger");
const mobilityAction = require("./mobility/action");

// Middleware to add Auth
router.use("/", mobiltyTrigger); // Beckn Application Platform
router.use("/", mobilityAction); // Beckn Application Platform

module.exports = router;
