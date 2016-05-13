var express = require('express');
var model = require('../model/model.js');
var router = express.Router();

router.get('/', function(req, res, next) {

    item = model.getItem(req.query.id);

    res.render('showitem', 
	       {title: 'contents of ' + req.query.id, 
		item: JSON.stringify(item,undefined," ")})
});


module.exports = router;
