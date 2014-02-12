
/**
 * Module dependencies.
 */

var express       = require('express');
var routes        = require('./routes');
var user          = require('./routes/user');
var http          = require('http');
var path          = require('path');
var mongoose      = require('mongoose');
var names         = require('./routes/index');
var app           = express();

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
app.use(express.json());
app.use(express.urlencoded());

//Caso precise de upload de arquivos
// app.use(express.multipart());

app.use(express.methodOverride());
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
app.get('/', routes.index);
app.get('/api/user', user.list);

app.get('/api/user/:id', user.get);
app.delete('/api/user/:id', user.delete);
app.post('/api/user', user.post);
app.put('/api/user/:id', user.put);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

