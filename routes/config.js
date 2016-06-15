var express = require('express');
var configfile = require('./configfile');
var model = require('../model/model.js');

var router = express.Router();

router.get('/', function (req, res, next) {
    var config = configfile.getConfig();
    console.log("config ", config);
    var title = 'Configure the server (experts only please!)';
    model.getThings(function (things) {
        if (things.length == 0) {
            title = "Warning: no things detected, do you have your cntlm proxy started?"
        }
        res.render('config', {
            title: title,
            color: configfile.getSelected("colour"),
            config: config
        })
    })
})

module.exports = router;
