var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventCategorySchema = new Schema(
  {
    name: {type: String, required: true, minLength: 3, maxlength: 100}
  }
);

// Virtual for author's URL
GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/category/' + this._id;
});

//Export model
module.exports = mongoose.model('eventCategory', EventCategorySchema);

