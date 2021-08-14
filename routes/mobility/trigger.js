const express = require("express");
const router = express.Router();
const { mobilityTrigger } = require("../../controllers/index");

router.post("/search_by_pickup_and_drop_location", mobilityTrigger.searchByLoc);
router.post("/select_agency", mobilityTrigger.selectAgency);
router.post("/init_order", mobilityTrigger.initializeOrder);
router.post("/confirm_order", mobilityTrigger.confirmOrder);
router.post("/get_order_status", mobilityTrigger.getOrderStatus);
router.post("/cancel_order", mobilityTrigger.cancelOrder);
router.post("/update_order", mobilityTrigger.updateOrder);
router.post("/rate_order", mobilityTrigger.rateOrder);
router.post("/track_order", mobilityTrigger.trackOrder);
router.post("/get_support", mobilityTrigger.getSupport);
router.post("/poll_request", mobilityTrigger.pollRequest);

module.exports = router;
