var express = require('express');
var router = express.Router();

var eventController = require('../controllers/eventController');


// PROJECT ROUTES
router.get('/', eventController.event_ist);

router.get('/:id', eventController.event_details);

module.exports = router;
