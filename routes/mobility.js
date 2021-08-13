const express = require("express");
const router = express.Router();
const { mobility } = require('../controllers/index');

router.post('/search_by_pickup_and_drop_location', mobility.searchByPickupAndDropLoc);
router.post('/select_agency', mobility.selectAgency);
router.post('/init_order', mobility.initializeOrder);
router.post('/on_search', mobility.onSearch);
router.post('/on_select', mobility.onSelect);
router.post('/on_init', mobility.onInit);
module.exports = router;