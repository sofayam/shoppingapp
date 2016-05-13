
exports.foo = function() {
    console.log("requiring cr");
}

// get items raw materials

var express = require('express');
var request = require('request');

var params = require('./restparams');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 
// following rest call will fail if this is not directly assigned in 
// this file (will not work if just in restparams.js)

var router = express.Router();

router.get('/', function(req, res, next) {

    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/search/things?filter=and(exists(attributes/item),eq(attributes/type,\"purchase\"))";
    params.method = "GET";

    request(params, 
	    function(error, response, body) {
		//console.log("response: ", response);
		//console.log("error: ", error);
		//console.log("type of body: ", typeof body); 

		//console.log("Body : ", body);
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
		//console.log("bodydata : ", bodydata);
		var items = bodydata.items;
		res.render('listitems', {title: 'Here are your items', mydata: items})
	    }
	   )
});


module.exports = router;

// add item raw materials

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

// raw material for showitem

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
