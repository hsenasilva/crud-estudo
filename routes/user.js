
/*
 * GET users listing.
 */


var user      = require('../models/user_model.js')
  , mongoose  = require('mongoose')
  , Schema    = mongoose.Schema
  , ObjectId  = Schema.ObjectId
  , db        = mongoose.connection;

exports.list = function(request, response){
  user.find(function  (err, users) {
    response.send(users);
    if (err) {
      throw err;
      console.log(err);
    }
    else {
      console.log("busca efetuada");
    }
  });
// [{firstName: "Henrique", lastName : "Sena"},{firstName: "Henrique", lastName : "Sena"}]
};


exports.post = function(req, res) {
	console.log("bateu post " + " " + req.body.firstName + " " + req.body.lastName);

  new user({firstName : req.body.firstName, lastName: req.body.lastName}).save(function (err, user) {

    if (err) {
      throw err;
      console.log(err);
    }
    else {
      console.log("criado com sucesso!");
    }
  });
}


exports.get = function (req, res) {
  return user.findById(req.body._id, function (err, user) {
    if (err) {
      throw err;
      console.log(err);
    }
    return res.send(user);
  });
}


exports.delete = function (req, res) {
  console.log("idParams: " + req.params.id);

  return user.findById(req.params.id, function (err, user) {
    return user.remove(function (err) {
      if (err) {
        throw err;
        console.log(err);
      }
      else {
        console.log("removido");
        return res.send('');
      }
    });
  });
}


exports.put = function (req, res) {

  return user.findById(req.params.id, function (err, user) {
    return user.update({firstName: req.body.firstName, lastName: req.body.lastName}, function (err) {
    console.log("objeto: " + user);
      if (err) {
        throw err;
        console.log(err);
      }
      else {
        console.log("Alterado com sucesso");
        return res.send('');
      }
    });
  });
}




