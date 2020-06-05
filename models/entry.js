var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: {type: String, required: true, min: 2},
    message: {type: String, required: true},
    timestamp: {type: Date, required: true, default: Date.now }
  }
);

//Export model
module.exports = mongoose.model('Entry', EntrySchema);
