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

