var express = require('express');
var request = require('request');
var HttpsProxyAgent = require('https-proxy-agent');
var agent = new HttpsProxyAgent('http://127.0.0.1:3128');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var router = express.Router();

router.get('/', function(req, res, next) {

    request({
	uri: "https://cr.apps.bosch-iot-cloud.com/cr/1/search/things", 
	auth: { user: "markandrew",
		password: "markandrewPw1!" },
	method: "GET",
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
		res.render('restbics', {title: 'Results of get from BICS', mydata: body})
	    }
	   )
});


module.exports = router;
