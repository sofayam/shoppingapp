var express = require('express');
var model = require('../model/model.js');


var router = express.Router();

router.get('/', function(req, res, next) {
    var id = req.query.id;
    console.log("deleting thing with id: " + id) 
    if (id) {
	model.delThing(id)
    }
    res.redirect(req.get('referer'));
});

module.exports = router;
