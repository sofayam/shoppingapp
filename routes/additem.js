var express = require('express');
var request = require('request');
var HttpsProxyAgent = require('https-proxy-agent');
var uuid = require('uuid4');
var agent = new HttpsProxyAgent('http://127.0.0.1:3128');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var router = express.Router();

router.get('/', function(req, res, next) {
    var thisUuid = uuid();
    console.log("request", req.query);
    console.log("uuid", thisUuid);
    res.render('additem', {title: 'Lets Go Shopping', item: req.query.item})

    request({

	uri: "https://cr.apps.bosch-iot-cloud.com/cr/1/things/markandrew:" + thisUuid, 
	auth: { user: "markandrew",
		password: "markandrewPw1!" },
	method: "PUT",
	json: {attributes: {type: "purchase", item: req.query.item}},
	headers: {
	    "Accept": "application/json",
	    "Content-Type": "application/json",
	    "x-cr-api-token": "6af616e401e24aa98425b825da995a7a"
	},
	agent: agent,
	timeout: 1000,
	followRedirect: true,
	maxRedirects: 10}, 
	    function(error, response, body) {
		console.log(body);
	    }
	   )

});


module.exports = router;
