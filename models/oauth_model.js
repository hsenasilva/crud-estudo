var mongoose        = require('mongoose')
  , Schema          = mongoose.Schema
  , ObjectId        = Schema.ObjectId
  , db              = mongoose.connection
  , connection      = require('../app.js');

//TODO criar model twitter

var FacebookUserSchema = new mongoose.Schema({
  fbId: String,
  email: { type : String , lowercase : true},
  name : String
});

exports.facebookUserSchema  = mongoose.model('fbs', FacebookUserSchema);