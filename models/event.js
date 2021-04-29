const { DateTime } = require("luxon");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    description: {type: String},
    eventDate: {type: Date},
    status: {type: String, required: true, enum: ['Planning', 'Underway', 'Done'], default: 'Planning'},
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
  }
);

// Virtual for author's URL
EventSchema
.virtual('url')
.get(function () {
  return '/events/' + this._id;
});

//Export model
module.exports = mongoose.model('Event', EventSchema);

