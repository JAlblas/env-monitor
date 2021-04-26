var Location = require('../models/location');

exports.location_list = function(req, res, next) {

    Location.find()
      .sort([['name', 'ascending']])
      .exec(function (err, list_locations) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('location_list', { title: 'Location List', location_list: list_locations });
      });
  
};

exports.location_details = function(req, res, next) {

    Location.findById(req.params.id)
    .exec(function (err, location) {
      if (err) { return next(err); }
      if (location==null) { // No results.
          var err = new Error('Location not found');
          err.status = 404;
          return next(err);
        }
      // Successful, so render.
      res.render('location_detail', { title: 'Location: ' +location.name, location:  location});
    })
  
};