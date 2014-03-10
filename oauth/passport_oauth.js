var TwitterStrategy 	= require('passport-twitter').Strategy;
var passport	  	  	= require('passport');
var ensureLoggedIn 		= require('connect-ensure-login').ensureLoggedIn;
var LocalStrategy		 	= require('passport-local').Strategy;
var FacebookStrategy 	= require('passport-facebook').Strategy;
var User 							= require('../models/oauth_model');


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
	  });
	);

	passport.use(new LocalStrategy(function(username, password, done){
    User.localUserSchema.findOne({ username : username}, function(err,user){
        if(err) { return done(err); }
        if(!user){
            return done(null, false, { message: 'Username Incorreto.' });
        }

        hash( password, user.salt, function (err, hash) {
            if (err) { return done(err); }
            if (hash == user.hash) return done(null, user);
            done(null, false, { message: 'Password Incorreto.' });
        });
    });
	}));

	passport.use(new FacebookStrategy({
    clientID: "577893435640029",
    clientSecret: "06c24f0c3bce428ba7da22725677fc1b",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.facebookUserSchema.findOne({fbId : profile.id}, function(err, oldUser){
      if(oldUser){
        done(null,oldUser);
      }else{
          var newUser = new User.facebookUserSchema({
            fbId : profile.id ,
            email : profile.emails[0].value,
            name : profile.displayName
        	}).save(function(err,newUser){
          if(err) throw err;
          done(null, newUser);
        });
      }
    });
  }
	));

	passport.serializeUser(function(user, done) {
    done(null, user.id);
	});


	passport.deserializeUser(function(id, done) {
    User.facebookUserSchema.findById(id,function(err,user){
      if(err) done(err);
      if(user){
        done(null,user);
      }else{
        Users.findById(id, function(err,user){
          if(err) done(err);
          done(null,user);
        });
      }
    });
	});

	// function userExist(req, res, next) {
 //    User.localUserSchema.count({
 //        username: req.body.username
 //    }, function (err, count) {
 //        if (count === 0) {
 //            next();
 //        } else {
 //            // req.session.error = "User Exist"
 //            res.redirect("/singup");
 //        }
 //    });
	// }

}
