const express = require("express");
const router = express.Router();
const { bapTrigger } = require("../../controllers/index");

router.post("/search_by_pickup_and_drop_location", bapTrigger.searchByLoc);
router.post("/select_agency", bapTrigger.selectAgency);
router.post("/init_order", bapTrigger.initializeOrder);
router.post("/confirm_order", bapTrigger.confirmOrder);
router.post("/get_order_status", bapTrigger.getOrderStatus);
router.post("/cancel_order", bapTrigger.cancelOrder);
router.post("/update_order", bapTrigger.updateOrder);
router.post("/rate_order", bapTrigger.rateOrder);
router.post("/track_order", bapTrigger.trackOrder);
router.post("/get_support", bapTrigger.getSupport);
router.post("/get_message", bapTrigger.getMessageById);

module.exports = router;
