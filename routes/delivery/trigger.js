const express = require("express");
const router = express.Router();
const { deliveryTrigger } = require("../../controllers/index");

router.post("/search_by_pickup_and_drop_location", deliveryTrigger.searchByLoc);
router.post("/add_items", deliveryTrigger.addItems);
router.post("/init_order", deliveryTrigger.initializeOrder);
router.post("/confirm_order", deliveryTrigger.confirmOrder);
router.post("/get_order_status", deliveryTrigger.getOrderStatus);
router.post("/cancel_order", deliveryTrigger.cancelOrder);
router.post("/update_order", deliveryTrigger.updateOrder);
router.post("/rate_order", deliveryTrigger.rateOrder);
router.post("/track_order", deliveryTrigger.trackOrder);
router.post("/get_support", deliveryTrigger.getSupport);
router.post("/get_message", deliveryTrigger.getMessageById);

module.exports = router;
