var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    firstname: {type: String, required: true, min: 2, max: 30},
    lastname: {type: String, required: true, min: 2, max: 30},
    username: { type: String, required: true, min: 2, max: 30},
    password: { type: String, required: true, min: 2, max: 30},
    memberstatus: {type: String, required: true, enum: ['Member', 'Non-Member'], default: 'Non-Member'},
    admin: {type: Boolean, required: true, default: false}
  }
);

// Export model
module.exports = mongoose.model('User', UserSchema);
