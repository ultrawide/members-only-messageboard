var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    message: {type: String, required: true, min: 1},
    timestamp: {type: Date, required: true, default: Date.now }
  }
);

//Export model
module.exports = mongoose.model('Message', MessageSchema);
