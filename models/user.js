var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    first_name: {type: String, required: true, min: 2, max: 30},
    last_name: {type: String, required: true, min: 2, max: 30},
    username: { type: String, required: true, min: 2, max: 30},
    password: { type: String, required: true, min: 2, max: 30},
    member_status: {type: String, required: true, enum: ['Member', 'Non-Member'], default: 'Non-Member'},
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}]
  }
);

// Export model
module.exports = mongoose.model('User', UserSchema);
