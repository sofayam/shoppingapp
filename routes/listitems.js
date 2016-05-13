var express = require('express');
var request = require('request');
var model = require('../model/model.js');

var router = express.Router();

router.get('/', function(req, res, next) {
    var items = model.getItems()
    res.render('listitems', {title: 'Here are your items', mydata: items})
});


module.exports = router;
