var express = require('express');
var request = require('request');
var querystring = require('querystring');

var params = require('./restparams');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 
// following rest call will fail if this is not directly assigned in 
// this file (will not work if just in restparams.js)

var router = express.Router();

router.get('/', function(req, res, next) {

    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/things/" + req.query.id ;
    console.log("URI: ", params.uri);
    params.method = "GET";

    request(params, 
	    function(error, response, body) {
		console.log("response: ", response);
		console.log("error: ", error);
		console.log("type of body: ", typeof body); 

		console.log("Body : ", body);
		try {
		    // TBD complete mystery, sometimes the body arrives preparsed, 
		    // sometimes as a string
		    var bodydata = body;
		    if (typeof body == "string") {
			bodydata = JSON.parse(body);
		    } 
		} catch(e) {
		    return console.error(e);
		}
		console.log("bodydata : ", bodydata);
		console.log("bodydata type: ", typeof bodydata);
		res.render('showitem', 
			   {title: 'contents of ' + req.query.id, 
			    item: JSON.stringify(bodydata,undefined," ")})
	    }
	   )
});


module.exports = router;
