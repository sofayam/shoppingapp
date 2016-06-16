var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var model = require('./model/model');
var tagformatter = require('./util/tagformatter');

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
var plantrip = require('./routes/plantrip');
var setconfig = require('./routes/setconfig');
var config = require('./routes/config');
var notify = require('./routes/notify');
var resetplans = require('./routes/resetplans');

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
app.use('/plantrip', plantrip);
app.use('/config', config);
app.use('/setconfig', setconfig);
app.use('/notify', notify);
app.use('/resetplans', resetplans);

app.use('/test', function(req, res) {
    
    console.log("here are the params: " + req.query.id)
    res.redirect('/');
});


app.use('/setstoreforitem', function (req, res) {

    var storeId = tagformatter.decode(req.query.storeId);
    var itemId = tagformatter.decode(req.query.itemId);
    model.setStoreForItem(storeId, itemId);
    res.redirect('/');
});

app.use('/clearstoreforitem', function(req, res) {
    var itemId = tagformatter.decode(req.query.itemId);
    model.clearStoreForItem(itemId);
    res.redirect('/');
});

app.use('/settripdate', function(req, res) {
    var storeId = req.query.storeId;
    var tripDate = req.query.tripDate;
    model.setTripDate(storeId, tripDate);
    res.redirect('/');
});

app.use('/cancelremovetrip', function(req, res) {
    var storeId = req.query.storeId;
    model.cancelRemoveTrip(storeId);
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
