var express = require('express');
var model = require('../model/model.js');
var router = express.Router();

router.get('/', function(req, resp, next) {

    var id = req.query.id;
    var name = req.query.name;

    console.log("about to choose location for " + name );
    resp.render('chooseloc', 
		{
		    layout: false,
		    title: 'choose location for store: ' + name, 
		    id: id,
		    name: name
		}
	       )
    
});

module.exports = router;
