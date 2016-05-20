var express = require('express');
var model = require('../model/model.js');
var router = express.Router();

router.get('/', function(req, resp, next) {

    var id = req.query.id;

    console.log("value of req:" + id);
    //console.log("value of resp:" + JSON.stringify(resp.keys()));

    model.getItem(id, function(item) {
	console.log("you gave me the item " + item);
	resp.render('showitem', 
		   {title: 'contents of ' + req.query.id, 
		    item: JSON.stringify(item,undefined," ")}
		  )
    })
});

module.exports = router;
