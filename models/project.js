const { DateTime } = require("luxon");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    description: {type: String, required: true},
    city: {type: String, required: true},
    created: {type: Date, default: Date.now}
  }
);
/*
// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  let deathDate = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';;
  let birthDate = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';;
  return (birthDate + " - " + deathDate);
});
*/
// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/projects/' + this._id;
});

//Export model
module.exports = mongoose.model('Project', ProjectSchema);

