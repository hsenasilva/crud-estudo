var TwitterStrategy = require('passport-twitter').Strategy;
var passport	  	  = require('passport');
var ensureLoggedIn 	= require('connect-ensure-login').ensureLoggedIn;


module.exports = function (passport) {

	passport.serializeUser(function(user, done) {
	  // console.log(user);
	  // done(null, user._id);
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  done(null, 'teste');
	});

// passport.deserializeUser(function(id, done) {
//     db.users.findById(id, function(err, user){
//         console.log(user)
//         if(!err) done(null, user);
//         else done(err, null)  
//     })
// });

	//OAuth keys twitter
	var TWITTER_CONSUMER_KEY = "MbgDzAyLirO7cOgi2hzDnQ";
	var TWITTER_CONSUMER_SECRET = "uGsEUcGNMpREcXooRyGTZhXrwafoCNPAxTzRRSOX8Y0";
 
	passport.use(new TwitterStrategy({
	  consumerKey: TWITTER_CONSUMER_KEY,
	  consumerSecret: TWITTER_CONSUMER_SECRET,
	  callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
	}, 
  function(token, tokenSecret, profile, done) {
    // NOTA: Voce tera, provavelmente, que associar o usuario do Twitter
    //       com um registro do usuario no banco de dados da aplicacao.
    var user = profile;
    return done(null, user);
  })
	);

}
