var express = require('express');
var model = require('../model/model.js');
var router = express.Router();

router.get('/', function(req, resp, next) {

    var id = req.query.id;
    var lat = req.query.lat;
    var lng = req.query.lng;
    var title = req.query.title;

    console.log(" setting the location ");
    model.setLoc(id,lat,lng, title);
    
});

module.exports = router;
