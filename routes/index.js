
/*
 * GET home page.
 */

var express = require('express');
var mongo = require('mongodb');
var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;
var server = new Server('localhost', 27017, { auto_reconnect: true });
var db = new Db('test', server);



exports.index = function(request, response){
	response.render('index.html');
};


