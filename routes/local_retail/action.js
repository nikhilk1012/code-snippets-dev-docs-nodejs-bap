const express = require("express");
const router = express.Router();
const { localRetailAction } = require("../../controllers/index");

router.post("/on_search", localRetailAction.onSearch);
router.post("/on_select", localRetailAction.onSelect);
router.post("/on_init", localRetailAction.onInit);
router.post("/on_confirm", localRetailAction.onConfirm);
router.post("/on_status", localRetailAction.onStatus);
router.post("/on_cancel", localRetailAction.onCancel);
router.post("/on_update", localRetailAction.onUpdate);
router.post("/on_rating", localRetailAction.onRating);
router.post("/on_support", localRetailAction.onSupport);
router.post("/on_track", localRetailAction.onTrack);

module.exports = router;