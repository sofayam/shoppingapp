var express = require('express');
var model = require('../model/model.js');


var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.query.item) {
	model.delItem(req.query.item)
    }
});

module.exports = router;
