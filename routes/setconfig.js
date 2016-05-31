var express = require('express');
var configfile = require('./configfile');

var router = express.Router();

router.get('/', function(req, res, next) {
    var config = configfile.setConfig(req.query);
    res.redirect('/');
})

module.exports = router;
