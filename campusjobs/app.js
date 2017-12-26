var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/database');
var mysql = require('mysql');

// required app variable 
const app = express();

// for user routes
const users = require('./routes/users');
const campusjobs = require('./routes/campusjobs');
const feed = require('./routes/feed');
// port number
const port = 4000;
app.use(cors());
// set static folder
app.use(express.static(path.join(__dirname, 'public')));
// Body parser middleware
app.use(bodyParser.json());

app.use('/users',users);
app.use('/campusjobs',campusjobs);
app.use('/feed',feed);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// index route
app.get('/', function(req,res) {
	res.send('Invalid end point');
});

app.get('*', function(req,res){
res.sendfile(path.join(__dirname,'public/index.html'));
});
// start server
app.listen(port,function() {
	console.log('Server running on port'+port);
});
module.exports = app;
