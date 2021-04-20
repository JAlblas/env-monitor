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