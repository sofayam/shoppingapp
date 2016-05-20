var express = require('express');
var model = require('../model/model.js');
var router = express.Router();

router.get('/', function(req, resp, next) {

    console.log("value of req:" + JSON.stringify(req.keys()));
    console.log("value of resp:" + JSON.stringify(resp.keys()));

    item = model.getItem(req, function(item) {
	console.log("you gave me the item " + item);
	resp.render('showitem', 
		   {title: 'contents of ' + req.query.id, 
		    item: JSON.stringify(item,undefined," ")}
		  )
    })
});

module.exports = router;
