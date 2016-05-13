var express = require('express');
var model = require('../model/model.js');

var router = express.Router();

router.get('/', function(req, res, next) {

    res.render('addstore', {title: 'Add a store', item: req.query.item})
    if (req.query.item) {
 
	model.addStore(req.query.item);

    }
});


module.exports = router;
