var Project = require('../models/project');

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