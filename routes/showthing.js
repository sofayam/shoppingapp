var express = require('express');
var model = require('../model/model.js');
var router = express.Router();

router.get('/', function(req, resp, next) {

    var id = req.query.id;

    console.log("value of req:" + id);
    //console.log("value of resp:" + JSON.stringify(resp.keys()));

    model.getThing(id, function(thing) {
	console.log("you gave me the thing " + thing);
	resp.render('showthing', 
		   {title: 'contents of ' + req.query.id, 
		    item: JSON.stringify(thing,undefined," ")}
		  )
    })
});

module.exports = router;
