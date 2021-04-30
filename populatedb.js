#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')

var Event = require('./models/event')
var Location = require('./models/location')
var Project = require('./models/project')
var Volunteer = require('./models/volunteer')

var mongoose = require('mongoose');
const project = require('./models/project');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var events = []
var locations = []
var projects = []
var volunteers = []

function eventCreate(name, description, eventDate, status, cb) {
  eventDetail = {name: name , description: description, eventDate: eventDate, status: status, project: project };
  
  var event = new Event(eventDetail);
       
  event.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New event: ' + event);
    events.push(event)
    cb(null, event)
  }  );
}

function locationCreate(date, location, image, event, cb) {
  var location = new Location({ date: date, location: location, image: image, event: event });
       
  location.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New location: ' + location);
    locations.push(location)
    cb(null, location);
  }   );
}

function projectCreate(name, description, city, createdDate, volunteers, cb) {
  projectDetail = { 
    name: name,
    description: description,
    city: city,
    createdDate: createdDate,
    volunteers: volunteers
  }

  var project = new Project(projectDetail);    
  project.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New project: ' + project);
    projects.push(project)
    cb(null, project)
  }  );
}


function volunteerCreate(name, avatar, description, age, cb) {
  volunteerDetail = { 
    name: name,
    avatar: avatar,
    description: description,
    age: age
  }    
    
  var volunteer = new Volunteer(volunteerDetail);    
  volunteer.save(function (err) {
    if (err) {
      console.log('ERROR CREATING volunteer: ' + volunteer);
      cb(err, null)
      return
    }
    console.log('New volunteer: ' + volunteer);
    volunteers.push(volunteer)
    cb(null, volunteer)
  }  );
}


function createEvents(cb) {
  // eventCreate(title, description, projectDate, status
    async.series([
        function(callback) {
          eventCreate("title", "description", Date(), "Done", callback);
        },
        function(callback) {
          eventCreate("title", "description", Date(), "Done", callback);
        },
        function(callback) {
          eventCreate("title", "description",  Date(), "Done", callback);
        },
        function(callback) {
          eventCreate("title", "description",  Date(), "Done", callback);
        },
        function(callback) {
          eventCreate("title", "description",  Date(), "Done", callback);
        },
        function(callback) {
          eventCreate("title", "description",  Date(), "Done", callback);
        },
        function(callback) {
          eventCreate("title", "description",  Date(), "Done", callback);
        },
        function(callback) {
          eventCreate("title", "description",  Date(), "Done", callback);
        },
        function(callback) {
          eventCreate("title", "description",  Date(), "Done", callback);
        },
        function(callback) {
          eventCreate("title", "description",  Date(), "Done", callback);
        }
        ],
        // optional callback
        cb);
}


function createLocations(cb) {
    async.parallel([
        function(callback) {
          locationCreate(Date(), {
            type: "Point",
            coordinates: 
              [50, 40]}, null, callback);
        },
        function(callback) {
          locationCreate(Date(), {
            type: "Point",
            coordinates: 
              [50, 40]}, null, callback);
        },
        function(callback) {
          locationCreate(Date(), {
            type: "Point",
            coordinates: 
              [50, 40]}, null, callback);
        },
        function(callback) {
          locationCreate(Date(), {
            type: "Point",
            coordinates: 
              [50, 40]}, null, callback);
        },
        function(callback) {
          locationCreate(Date(), {
            type: "Point",
            coordinates: 
              [50, 40]}, null, callback);
        },
        function(callback) {
          locationCreate(Date(), {
            type: "Point",
            coordinates: 
              [50, 40]}, null, callback);
        },
        function(callback) {
          locationCreate(Date(), {
            type: "Point",
            coordinates: 
              [50, 40]}, null, callback);
        },
        function(callback) {
          locationCreate(Date(), {
            type: "Point",
            coordinates: 
              [50, 40]}, null, callback);
        },
        function(callback) {
          locationCreate(Date(), {
            type: "Point",
            coordinates: 
              [50, 40]}, null, callback);
        },
        function(callback) {
          locationCreate(Date(), {
            type: "Point",
            coordinates: 
              [50, 40]}, null, callback);
        },
        ],
        // optional callback
        cb);
}


function createProjects(cb) {
    async.parallel([
        function(callback) {
          projectCreate("name", "description", "city", Date(), callback)
        },
        function(callback) {
          projectCreate("name", "description", "city", Date(), callback)
        },
        function(callback) {
          projectCreate("name", "description", "city", Date(), callback)
        },
        function(callback) {
          projectCreate("name", "description", "city", Date(), callback)
        },
        function(callback) {
          projectCreate("name", "description", "city", Date(), callback)
        },
        function(callback) {
          projectCreate("name", "description", "city", Date(), callback)
        },
        function(callback) {
          projectCreate("name", "description", "city", Date(), callback)
        },
        function(callback) {
          projectCreate("name", "description", "city", Date(), callback)
        },
        function(callback) {
          projectCreate("name", "description", "city", Date(), callback)
        },
        function(callback) {
          projectCreate("name", "description", "city", Date(), callback)
        }
        ],
        // Optional callback
        cb);
}


function createVolunteers(cb) {
  async.parallel([
      function(callback) {
        volunteerCreate("name", "avatar", "description", 21, callback)
      },
      function(callback) {
        volunteerCreate("name", "avatar", "description", 21, callback)
      },
      function(callback) {
        volunteerCreate("name", "avatar", "description", 21, callback)
      },
      function(callback) {
        volunteerCreate("name", "avatar", "description", 21, callback)
      },
      function(callback) {
        volunteerCreate("name", "avatar", "description", 21, callback)
      },
      function(callback) {
        volunteerCreate("name", "avatar", "description", 21, callback)
      },
      function(callback) {
        volunteerCreate("name", "avatar", "description", 21, callback)
      },
      function(callback) {
        volunteerCreate("name", "avatar", "description", 21, callback)
      },
      function(callback) {
        volunteerCreate("name", "avatar", "description", 21, callback)
      },
      function(callback) {
        volunteerCreate("name", "avatar", "description", 21, callback)
      }
      ],
      // Optional callback
      cb);
}

async.series([
    createVolunteers,
    createProjects,
    createEvents,
    createLocations,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Events: '+ events);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




