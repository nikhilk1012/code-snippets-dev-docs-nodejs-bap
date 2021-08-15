const express = require("express");
const router = express.Router();
const { mobilityAction } = require("../../controllers/index");

router.post("/on_search", mobilityAction.onSearch);
router.post("/on_select", mobilityAction.onSelect);
router.post("/on_init", mobilityAction.onInit);
router.post("/on_confirm", mobilityAction.onConfirm);
router.post("/on_status", mobilityAction.onStatus);
router.post("/on_cancel", mobilityAction.onCancel);
router.post("/on_update", mobilityAction.onUpdate);
router.post("/on_rating", mobilityAction.onRating);
router.post("/on_support", mobilityAction.onSupport);
router.post("/on_track", mobilityAction.onTrack);

module.exports = router;