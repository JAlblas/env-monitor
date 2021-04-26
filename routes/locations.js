var express = require('express');
var router = express.Router();

var locationController = require('../controllers/locationController');


// PROJECT ROUTES
router.get('/', locationController.location_list);

router.get('/:id', locationController.location_details);

module.exports = router;
