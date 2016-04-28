var express = require('express');
var request = require('request');
var HttpsProxyAgent = require('https-proxy-agent');

var proxyurl = 'http://127.0.0.1:3128'
var agent = new HttpsProxyAgent(proxyurl);



var params = {
	uri: "https://cr.apps.bosch-iot-cloud.com/cr/1/search/things?filter=and(exists(attributes/item),eq(attributes/type,\"purchase\"))", 
	auth: { user: "markandrew",
		password: "markandrewPw1!" },
	method: "GET",
	headers: {
	    "Accept": "application/json",
	    "Content-Type": "application/json",
	    "x-cr-api-token": "6af616e401e24aa98425b825da995a7a"
	},
	timeout: 1000,
	followRedirect: true,
	maxRedirects: 10};

if (process.env.VCAP_SERVICES) {
   console.log("No agent needed");
} else {
   console.log("Set agent");
   params.agent = agent;
}; 


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var router = express.Router();

router.get('/', function(req, res, next) {

    request(params, 
	    function(error, response, body) {
		var bodydata = JSON.parse(body);
		var items = bodydata.items;
		res.render('listitems', {title: 'Here are your items', mydata: items})
	    }
	   )
});


module.exports = router;
