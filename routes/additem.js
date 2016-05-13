var express = require('express');
var model = require('../model/model.js');

var router = express.Router();

router.get('/', function(req, res, next) {

    res.render('additem', {title: 'Lets Go Shopping', item: req.query.item})
    if (req.query.item) {
 
	model.addItem(req.query.item);

    }
});


module.exports = router;
