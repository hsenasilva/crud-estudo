var mongoose        = require('mongoose')
  , Schema          = mongoose.Schema
  , ObjectId        = Schema.ObjectId
  , db              = mongoose.connection
	,	connection      = require('../app.js');


db.on('error', console.error);

db.once('open', function() {
  console.log('Conectado.');
});

var userSchema = mongoose.Schema({
  user_id:        ObjectId,
  firstName:  String,
  lastName:   String
});

//exportando a model, veja no arquivo user.js como a importo usando o require
module.exports = mongoose.model('user', userSchema);