var express = require('express');
var router = express.Router();

var volunteerController = require('../controllers/volunteerController');

// PROJECT ROUTES
router.get('/', volunteerController.volunteer_list);

router.get('/:id', volunteerController.volunteer_details);

module.exports = router;
