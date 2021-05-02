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
      if(!(req.body.genre instanceof Array)){
          if(typeof req.body.genre ==='undefined')
          req.body.genre = [];
          else
          req.body.genre = new Array(req.body.genre);
      }
      next();
  },

  // Validate and sanitise fields.
  body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a Book object with escaped and trimmed data.
      var project = new Project(
        { title: req.body.title,
          author: req.body.author,
          summary: req.body.summary,
          isbn: req.body.isbn,
          genre: req.body.genre
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
              for (let i = 0; i < results.genres.length; i++) {
                  if (book.genre.indexOf(results.genres[i]._id) > -1) {
                      results.genres[i].checked='true';
                  }
              }
              res.render('project_form', { title: 'Create project', volunteers:results.volunteers, book: book, errors: errors.array() });
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