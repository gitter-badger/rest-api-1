/**
 * User: semihonay
 * Date: 8.06.2017
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  surName: String,
  mail: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);