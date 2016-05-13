var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('alloc', 
	       {title: "Allocate your shopping", 
		mydata: [{id: "fruit"}, {id: "milk"}, {id: "bread"}],
		stores: ["store1", "store2", "store3"]
	       })
})

module.exports = router