var express = require('express');
var request = require('request');
var model = require('../model/model.js');

var router = express.Router();

router.get('/', function(req, res, next) {
    var items = model.getThings(function (items) {
	res.render('listthings', {title: 'Here are your items', mydata: items})
    })
});


module.exports = router;
