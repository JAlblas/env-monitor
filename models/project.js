const { DateTime } = require("luxon");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    description: {type: String, required: true},
    city: {type: String, required: true},
    createdDate: {type: Date, default: Date.now},
    volunteers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Volunteer"
      }
    ]
  }
);

// Virtual for author's URL
ProjectSchema
.virtual('url')
.get(function () {
  return '/projects/' + this._id;
});

//Export model
module.exports = mongoose.model('Project', ProjectSchema);

