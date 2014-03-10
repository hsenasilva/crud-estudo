var mongoose        = require('mongoose')
  , Schema          = mongoose.Schema
  , ObjectId        = Schema.ObjectId
  , db              = mongoose.connection
  , connection      = require('../app.js');


var LocalUserSchema = new mongoose.Schema({
  username: String,
  salt: String,
  hash: String
});

var FacebookUserSchema = new mongoose.Schema({
  fbId: String,
  email: { type : String , lowercase : true},
  name : String
});

exports.localUserSchema     = mongoose.model('userauths', LocalUserSchema);
exports.facebookUserSchema  = mongoose.model('fbs', FacebookUserSchema);