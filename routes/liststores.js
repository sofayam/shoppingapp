var express = require('express');
var request = require('request');
var model = require('../model/model.js');

var router = express.Router();

router.get('/', function(req, res, next) {
    var items = model.getStores(function (items) {
	res.render('liststores', {title: 'Here are your stores', mydata: items})
    })
});


module.exports = router;
