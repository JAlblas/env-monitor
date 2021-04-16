const { DateTime } = require("luxon");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema(
  {
    //book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    //status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    date: {type: Date, default: Date.now},
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
  }
);

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/observations/' + this._id;
});

BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

//Export model
module.exports = mongoose.model('Location', LocationSchema);