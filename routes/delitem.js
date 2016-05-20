var express = require('express');
var model = require('../model/model.js');


var router = express.Router();

router.get('/', function(req, res, next) {
    var id = req.query.id;
    console.log("deleting item with id: " + id) 
    if (id) {
	model.delItem(id)
    }
    res.redirect('/listitems');
});

module.exports = router;
