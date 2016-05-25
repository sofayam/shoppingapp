var express = require('express');
var model = require('../model/model.js');
var router = express.Router();

router.get('/', function(req, resp, next) {

    var id = req.query.id;
    var lat = req.query.lat;
    var lng = req.query.lng;
    var address = req.query.address;

    console.log(" setting the location ");
    model.setLoc(id,lat,lng,address);
    resp.redirect('/');
});

module.exports = router;
