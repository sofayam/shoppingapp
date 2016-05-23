var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var model = require('./model/model');

var routes = require('./routes/index');
var listitems = require('./routes/listitems');
var liststores = require('./routes/liststores');
var listthings = require('./routes/listthings');
var additem = require('./routes/additem');
var addstore = require('./routes/addstore');
var showthing = require('./routes/showthing');
var delthing = require('./routes/delthing');
var alloc = require('./routes/alloc');
var chooseloc = require('./routes/chooseloc');
var setloc = require('./routes/setloc');

var app = express();

hbs.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// TBD how to avoid this repetitious crap ???
app.use('/listitems', listitems);
app.use('/liststores', liststores);
app.use('/listthings', listthings);
app.use('/additem', additem);
app.use('/addstore', addstore);
app.use('/showthing', showthing);
app.use('/delthing', delthing);
app.use('/alloc', alloc);
app.use('/chooseloc', chooseloc);
app.use('/setloc', setloc);

app.use('/test', function(req, res) {
    
    console.log("here are the params: " + req.query.id)
    res.redirect('/');
});

app.use('/setstoreforitem', function (req, res) {
//    console.log("here are the params " + req.query.storeId);
    // TBD horrible hack to see how easily we can make CR ids html tag-fähig
    function tocol (nocol) {
	var col = nocol.replace('Z', ':');
	console.log("col: " + col)
	return col
    };
    var storeId = tocol(req.query.storeId);
    var itemId = tocol(req.query.itemId);
    model.setStoreForItem(storeId, itemId);
    res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
