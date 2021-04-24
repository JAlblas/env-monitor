var express = require('express');
var router = express.Router();

var volunteerController = require('../controllers/volunteerController');
//var author_controller = require('../controllers/authorController');
//var genre_controller = require('../controllers/genreController');
//var book_instance_controller = require('../controllers/bookinstanceController');


// PROJECT ROUTES
router.get('/', volunteerController.volunteer_list);

router.get('/:id', volunteerController.volunteer_detail);

module.exports = router;
