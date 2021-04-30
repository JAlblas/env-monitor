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
    },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true }
  }
);

// Virtual for bookinstance's URL
LocationSchema
.virtual('url')
.get(function () {
  return '/locations/' + this._id;
});

//Export model
module.exports = mongoose.model('Location', LocationSchema);