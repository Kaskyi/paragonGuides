
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');

var sqliteModels = require('./models');

var routerGuide = require('./routes/guide.js');
var routerUser = require('./routes/user.js');
var routerWiKi = require('./routes/wiki.js');
var routerIndex = require('./routes');
var routerSession = require('./routes/session.js');

var app = express();


//Init database
app.use(sqliteModels({
    file : path.join(__dirname, 'test.db')
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}
app.use(routerSession);
app.use('/', routerIndex);
app.use('/user', routerUser);
app.use('/guide', routerGuide);
app.use('/wiki', routerWiKi);
app.use('/session', routerSession);

app.use(sqliteModels.reloadDB);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
