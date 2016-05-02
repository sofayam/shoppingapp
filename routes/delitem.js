var express = require('express');
var request = require('request');

var params = require('./restparams');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 
// following rest call will fail if this is not directly assigned in 
// this file (will not work if just in restparams.js)

var router = express.Router();

router.get('/', function(req, res, next) {

    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/things/" + req.query.id ;
    console.log("URI: ", params.uri);
    params.method = "DELETE";

    request(params, 
	    function(error, response, body) {
		console.log("response: ", response);
		console.log("error: ", error);
		console.log("type of body: ", typeof body); 

		//res.render('delitem', 
		//	   {title: 'item deleted ' + req.query.id})
		res.redirect('/listitems');

	    }
	   )
});


module.exports = router;
