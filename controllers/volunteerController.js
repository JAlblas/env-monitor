var Volunteer = require('../models/volunteer');

exports.volunteer_list = function(req, res, next) {

    Volunteer.find()
      .sort([['name', 'ascending']])
      .exec(function (err, list_volunteers) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('volunteer_list', { title: 'Volunteer List', volunteer_list: list_volunteers });
      });
  
};

exports.volunteer_details = function(req, res, next) {

    Volunteer.findById(req.params.id)
    .exec(function (err, volunteer) {
      if (err) { return next(err); }
      if (volunteer==null) { // No results.
          var err = new Error('Volunteer not found');
          err.status = 404;
          return next(err);
        }
      // Successful, so render.
      res.render('volunteer_detail', { title: 'Volunteer: ' +volunteer.name, volunteer:  volunteer});
    })
  
};

