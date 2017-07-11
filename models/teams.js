var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Team = new Schema({
  accessToken: String,
  scope: String,
  userId: String,
  teamName: String,
  teamId: String,
  installedOn: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Team', Team);
