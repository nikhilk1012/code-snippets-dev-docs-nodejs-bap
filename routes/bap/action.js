const express = require("express");
const router = express.Router();
const { bapAction } = require("../../controllers/index");

router.post("/on_search", bapAction.onSearch);
router.post("/on_select", bapAction.onSelect);
router.post("/on_init", bapAction.onInit);
router.post("/on_confirm", bapAction.onConfirm);
router.post("/on_status", bapAction.onStatus);
router.post("/on_cancel", bapAction.onCancel);
router.post("/on_update", bapAction.onUpdate);
router.post("/on_rating", bapAction.onRating);
router.post("/on_support", bapAction.onSupport);
router.post("/on_track", bapAction.onTrack);

module.exports = router;