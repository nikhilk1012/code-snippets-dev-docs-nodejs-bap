const express = require("express");
const router = express.Router();
// Mobility
const mobiltyTrigger = require("./mobility/trigger");
const mobilityAction = require("./mobility/action");

// LocalRetail
const localRetailTrigger = require("./local_retail/trigger");
const localRetailAction = require("./local_retail/action");

// Delivery
const deliveryTrigger = require("./delivery/trigger");
const deliveryAction = require("./delivery/action");

const auth = (req, res, next) => {
    // Verify the Digital Signature
    next();
}
// Middleware to add Auth
router.use("/mobility", mobiltyTrigger);
router.use("/mobility", mobilityAction);

router.use("/localRetail", localRetailTrigger);
router.use("/localRetail", localRetailAction);

router.use("/delivery", deliveryTrigger);
router.use("/delivery", deliveryAction);

module.exports = router;
