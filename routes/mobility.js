const express = require("express");
const router = express.Router();
const { mobility } = require('../controllers/index');

router.post('/search_by_pickup_and_drop_location', mobility.searchByPickupAndDropLoc);
router.post('/on_search', mobility.onSearch);
module.exports = router;