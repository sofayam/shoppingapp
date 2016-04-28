var express = require('express');
var request = require('request');

var uuid = require('uuid4');

var params = require('./restparams');

var router = express.Router();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

router.get('/', function(req, res, next) {
    var thisUuid = uuid();
    console.log("request", req.query);
    console.log("uuid", thisUuid);
    res.render('additem', {title: 'Lets Go Shopping', item: req.query.item})
    if (req.query.item) {
 
	params.uri =  "https://cr.apps.bosch-iot-cloud.com/cr/1/things/markandrew:" + thisUuid;
	params.method = "PUT";
	params.json = {attributes: {type: "purchase", item: req.query.item}};

	request(
	    params,
	    function(error, response, body) {
		console.log(body);
	    }
	)
    }
});


module.exports = router;
