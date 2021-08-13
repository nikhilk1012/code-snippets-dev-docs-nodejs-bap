const express = require("express");
const router = express.Router();
const mobilty = require("./mobility");

// Middleware to add Auth
router.use("/mobility", auth, mobilty); // Beckn Application Platform

module.exports = router;
