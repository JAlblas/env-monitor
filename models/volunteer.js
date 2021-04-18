var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VolunteerSchema = new Schema(
  {
    name: {type: String, required: true},
    avatar: {type: String, required: true},
    description: {type: String, required: true},
    age: {type: Number, required: true}
  }
);

// Virtual for book's URL
VolunteerSchema
.virtual('url')
.get(function () {
  return '/volunteers/' + this._id;
});

//Export model
module.exports = mongoose.model('Volunteer', VolunteerSchema);