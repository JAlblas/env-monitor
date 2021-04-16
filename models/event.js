const { DateTime } = require("luxon");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    prjectDate: {type: Date},
    status: {type: String, required: true, enum: ['Planning', 'Underway', 'Done'], default: 'Planning'},
  }
);

// Virtual for author's full name
EventSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
EventSchema
.virtual('lifespan')
.get(function () {
  let deathDate = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';;
  let birthDate = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';;
  return (birthDate + " - " + deathDate);
});

// Virtual for author's URL
EventSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Event', EventSchema);

