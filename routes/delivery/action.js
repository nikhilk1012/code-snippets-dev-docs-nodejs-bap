const express = require("express");
const router = express.Router();
const { deliveryAction } = require("../../controllers/index");

router.post("/on_search", deliveryAction.onSearch);
router.post("/on_select", deliveryAction.onSelect);
router.post("/on_init", deliveryAction.onInit);
router.post("/on_confirm", deliveryAction.onConfirm);
router.post("/on_status", deliveryAction.onStatus);
router.post("/on_cancel", deliveryAction.onCancel);
router.post("/on_update", deliveryAction.onUpdate);
router.post("/on_rating", deliveryAction.onRating);
router.post("/on_support", deliveryAction.onSupport);
router.post("/on_track", deliveryAction.onTrack);

module.exports = router;