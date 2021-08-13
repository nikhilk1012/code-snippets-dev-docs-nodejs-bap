const express = require("express");
const router = express.Router();
const { mobility } = require('../controllers/index');

router.post('/search_by_pickup_and_drop_location', mobility.searchByPickupAndDropLoc);
router.post('/select_agency', mobility.selectAgency);
router.post('/init_order', mobility.initializeOrder);
router.post('/confirm_order', mobility.confirmOrder);
router.post('/get_order_status', mobility.getOrderStatus);
router.post('/cancel_order', mobility.cancelOrder);
router.post('/update_order', mobility.updateOrder);
router.post('/rate_order',mobility.rateOrder);
router.post('/track_order',mobility.trackOrder);
router.post('/get_support',mobility.getSupport);
router.post('/on_search', mobility.onSearch);
router.post('/on_select', mobility.onSelect);
router.post('/on_init', mobility.onInit);
router.post('/on_confirm',mobility.onConfirm);
router.post('/on_status',mobility.onStatus);
router.post('/on_cancel',mobility.onCancel);
router.post('/on_update',mobility.onUpdate);
router.post('/on_rating',mobility.onRating);
router.post('/on_support',mobility.onSupport);
router.post('/on_track',mobility.onTrack);
router.post('/poll_request',mobility.pollRequest);

module.exports = router;