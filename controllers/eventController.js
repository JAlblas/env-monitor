var Event = require('../models/event');

exports.event_ist = function(req, res, next) {

    Event.find()
      .sort([['name', 'ascending']])
      .populate('project')
      .exec(function (err, list_events) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('event_list', { title: 'Event List', event_list: list_events });
      });
  
};

exports.event_details = function(req, res, next) {

    Event.findById(req.params.id)
    .exec(function (err, event) {
      if (err) { return next(err); }
      if (event==null) { // No results.
          var err = new Error('Event not found');
          err.status = 404;
          return next(err);
        }
      // Successful, so render.
      res.render('event_detail', { title: 'Event: ' +event.name, event: event});
    })
  
};