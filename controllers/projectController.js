const { body,validationResult } = require('express-validator');
var async = require('async');

var Project = require('../models/project');
var Volunteer = require('../models/volunteer');

exports.project_list = function(req, res, next) {

    Project.find()
      .sort([['name', 'ascending']])
      .exec(function (err, list_projects) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('project_list', { title: 'Project List', project_list: list_projects });
      });
  
};

exports.project_details = function(req, res, next) {

    Project.findById(req.params.id)
    .exec(function (err, project) {
      if (err) { return next(err); }
      if (project==null) { // No results.
          var err = new Error('Project not found');
          err.status = 404;
          return next(err);
        }
      // Successful, so render.
      res.render('project_detail', { title: 'Project: ' +project.name, project:  project});
    })
  
};


// Display book create form on GET.
exports.project_create_get = function(req, res, next) {

  // Get all authors and genres, which we can use for adding to our book.
  async.parallel({
      volunteers: function(callback) {
          Volunteer.find(callback);
      },
  }, function(err, results) {
      if (err) { return next(err); }
      res.render('project_form', { title: 'Create Project', volunteers: results.volunteers });
  });

};

// Handle book create on POST.
exports.project_create_post = [
  // Convert the genre to an array.
  (req, res, next) => {
      if(!(req.body.volunteers instanceof Array)){
          if(typeof req.body.volunteers ==='undefined')
          req.body.volunteers = [];
          else
          req.body.volunteers = new Array(req.body.volunteers);
      }
      next();
  },

  // Validate and sanitise fields.
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('city', 'City must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('createdDate', 'Date must not be empty').trim().isLength({ min: 1 }).escape(),
  body('volunteer.*').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a Book object with escaped and trimmed data.
      var project = new Project(
        { name: req.body.name,
          description: req.body.description,
          city: req.body.city,
          createDate: req.body.createDate,
          volunteers: req.body.volunteers
         });

      if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/error messages.

          // Get all authors and genres for form.
          async.parallel({
              volunteers: function(callback) {
                  Volunteer.find(callback);
              },
          }, function(err, results) {
              if (err) { return next(err); }

              // Mark our selected genres as checked.
              for (let i = 0; i < results.volunteers.length; i++) {
                  if (project.volunteers.indexOf(results.volunteers[i]._id) > -1) {
                      results.volunteers[i].checked='true';
                  }
              }
              res.render('project_form', { title: 'Create project', volunteers:results.volunteers, project: project, errors: errors.array() });
          });
          return;
      }
      else {
          // Data from form is valid. Save book.
          project.save(function (err) {
              if (err) { return next(err); }
                 //successful - redirect to new book record.
                 res.redirect(project.url);
              });
      }
  }
];