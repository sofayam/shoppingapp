var express = require('express');
var request = require('request');
var model = require('../model/model.js');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('alloc', 
	       {title: "Allocate your shopping", 
		mydata: model.getItems(),
		stores: model.getStores()
	       })
})

module.exports = router
