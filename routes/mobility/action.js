const express = require("express");
const router = express.Router();
const { mobilityAction } = require("../../controllers/index");
const auth = (req, res, next) => {
    next()
}

router.post("/on_search", auth, mobilityAction.onSearch);
router.post("/on_select", auth, mobilityAction.onSelect);
router.post("/on_init", auth, mobilityAction.onInit);
router.post("/on_confirm", auth, mobilityAction.onConfirm);
router.post("/on_status", auth, mobilityAction.onStatus);
router.post("/on_cancel", auth, mobilityAction.onCancel);
router.post("/on_update", auth, mobilityAction.onUpdate);
router.post("/on_rating", auth, mobilityAction.onRating);
router.post("/on_support", auth, mobilityAction.onSupport);
router.post("/on_track", auth, mobilityAction.onTrack);

module.exports = router;