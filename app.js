/**
 * Module dependencies.
 */

var express             = require('express');
var routes              = require('./routes');
var user                = require('./routes/user');
var http                = require('http');
var path                = require('path');
var mongoose            = require('mongoose');
var names               = require('./routes/index');
var passport            = require('passport');
var TwitterStrategy     = require('passport-twitter').Strategy;
var ensureLoggedIn      = require('connect-ensure-login').ensureLoggedIn;
var LocalStrategy       = require('passport-local').Strategy;
var FacebookStrategy    = require('passport-facebook').Strategy;
var oauth               = require('./oauth/passport_oauth');
var app                 = express();

// all environments
app.set('port', process.env.PORT || 3000);
//engine que renderiza as views, no caso ejs para html, poderia ser jade por exemplo
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.set('views', path.join(__dirname));
app.use(express.favicon());
app.use(express.logger('dev'));
//Request Body parser, suportando JSON, urlencoded
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.json());
app.use(express.urlencoded());
//Caso precise de upload de arquivos
// app.use(express.multipart());
app.use(express.cookieParser());
// app.use(express.session( { secret: 'aaaaa'}));
app.use(express.cookieSession({ secret: 'aaaa', maxAge: 360*5 }));
app.use(passport.initialize());
app.use(passport.session());

oauth(passport);

app.use(app.router);
//app.use(express.static()) middleware para servir os arquivos estáticos como js, css, imgs, etc... Trata as chamadas GET dos arquivos.
app.use(express.static(path.join(__dirname , 'public')));
app.use(express.static(path.join(__dirname , 'public/models')));
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public/javascripts')));

mongoose.connect('mongodb://localhost/test');

// somente em desenvolvimento, 
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//urls que carrego
app.get('/', ensureAuthenticated, routes.index);
app.get('/login', function(req, res){
  res.render('login', res.render('./public/javascripts/views/login/login.html'));
});

app.get('/api/user', user.list);
app.get('/api/user/:id', user.get);
app.delete('/api/user/:id', user.delete);
app.post('/api/user', user.post);
app.put('/api/user/:id', user.put);

//login oauth twitter
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successReturnToOrRedirect: '/#/list-user', failureRedirect: '/login' }));

//login oauth facebook
app.get("/auth/facebook", passport.authenticate("facebook",{ scope : "email"}));
app.get("/auth/facebook/callback", passport.authenticate('facebook', {successReturnToOrRedirect: '/#/list-user', failureRedirect: '/login' }));

// app.get("/auth/facebook/callback",
//   passport.authenticate("facebook",{ failureRedirect: '/login'}),
//   function(req,res){
//     res.render("loggedin", {user : req.user});
//   }
// );


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// Middleware que verifica autenticação.
function ensureAuthenticated(req, res, next) {
  // console.log(req.isAuthenticated());
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
