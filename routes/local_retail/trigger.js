const express = require("express");
const router = express.Router();
const { localRetailTrigger } = require("../../controllers/index");

router.post("/search_by_drop_location", localRetailTrigger.searchByEndLoc);
router.post("/add_items", localRetailTrigger.addItems);
router.post("/init_order", localRetailTrigger.initializeOrder);
router.post("/confirm_order", localRetailTrigger.confirmOrder);
router.post("/get_order_status", localRetailTrigger.getOrderStatus);
router.post("/cancel_order", localRetailTrigger.cancelOrder);
router.post("/update_order", localRetailTrigger.updateOrder);
router.post("/rate_order", localRetailTrigger.rateOrder);
router.post("/track_order", localRetailTrigger.trackOrder);
router.post("/get_support", localRetailTrigger.getSupport);
router.post("/get_message", localRetailTrigger.getMessageById);

module.exports = router;
