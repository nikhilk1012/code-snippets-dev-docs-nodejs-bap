// Mobility
const mobilityTrigger = require("./mobility/trigger");
const mobilityAction = require("./mobility/action");
// Local Retail
const localRetailTrigger = require("./local_retail/trigger");
const localRetailAction = require("./local_retail/action");
// Delivery
const deliveryTrigger = require("./delivery/trigger");
const deliveryAction = require("./delivery/action");

module.exports = {
  mobilityTrigger,
  mobilityAction,
  localRetailTrigger,
  localRetailAction,
  deliveryTrigger,
  deliveryAction
};
