const express = require("express");
const router = express.Router();
const { localRetailAction } = require("../../controllers/index");
const auth = (req, res, next) => {
    next()
}
router.post("/on_search", auth, localRetailAction.onSearch);
router.post("/on_select", auth, localRetailAction.onSelect);
router.post("/on_init", auth, localRetailAction.onInit);
router.post("/on_confirm", auth, localRetailAction.onConfirm);
router.post("/on_status", auth, localRetailAction.onStatus);
router.post("/on_cancel", auth, localRetailAction.onCancel);
router.post("/on_update", auth, localRetailAction.onUpdate);
router.post("/on_rating", auth, localRetailAction.onRating);
router.post("/on_support", auth, localRetailAction.onSupport);
router.post("/on_track", auth, localRetailAction.onTrack);

module.exports = router;