var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var locationCategorySchema = new Schema(
  {
    name: {type: String, required: true, minLength: 3, maxlength: 100}
  }
);

// Virtual for author's URL
GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/locations/categories' + this._id;
});

//Export model
module.exports = mongoose.model('locationCategory', locationCategorySchema);

