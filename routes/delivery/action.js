const express = require("express");
const router = express.Router();
const { deliveryAction } = require("../../controllers/index");
const auth = (req, res, next) => {
    next()
}

router.post("/on_search", auth, deliveryAction.onSearch);
router.post("/on_select", auth, deliveryAction.onSelect);
router.post("/on_init", auth, deliveryAction.onInit);
router.post("/on_confirm", auth, deliveryAction.onConfirm);
router.post("/on_status", auth, deliveryAction.onStatus);
router.post("/on_cancel", auth, deliveryAction.onCancel);
router.post("/on_update", auth, deliveryAction.onUpdate);
router.post("/on_rating", auth, deliveryAction.onRating);
router.post("/on_support", auth, deliveryAction.onSupport);
router.post("/on_track", auth, deliveryAction.onTrack);

module.exports = router;