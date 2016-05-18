var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var model = require('./model/model');

var routes = require('./routes/index');
var users = require('./routes/users');
var drag = require('./routes/drag');
var restbics = require('./routes/listitems');
var additem = require('./routes/additem');
var addstore = require('./routes/addstore');
var showitem = require('./routes/showitem');
var delitem = require('./routes/delitem');
var alloc = require('./routes/alloc');

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
app.use('/users', users);
app.use('/drag', drag);
app.use('/listitems', restbics);
app.use('/additem', additem);
app.use('/addstore', addstore);
app.use('/showitem', showitem);
app.use('/delitem', delitem);
app.use('/alloc', alloc);


app.use('/setstoreforitem', function (req, res) {
//    console.log("here are the params " + req.query.storeId);
    model.setStoreForItem(req.query.storeId, req.query.itemId);
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
