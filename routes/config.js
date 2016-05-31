var express = require('express');
var configfile = require('./configfile');

var router = express.Router();

router.get('/', function(req, res, next) {
    var config = configfile.getConfig();
    console.log("config ", config);
    res.render('config', {title: 'Configure the server (experts only please!)',
			 config: config})
})

module.exports = router;
