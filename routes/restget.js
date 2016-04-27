var express = require('express');
var Client = require('node-rest-client').Client;

var router = express.Router();

var options_proxy = {
	proxy: {
		host: "localhost",
		port: 3128,
	}
};
var client = new Client(options_proxy);           // Change this stuff on BICS


/* GET home page. */
router.get('/', function(req, res, next) {

//    client.get("http://localhost:3001",function (data, response) {   
    client.get("http://www.bosch.com",function (data, response) {   
	console.log("response", response)
	textdata = data.toString('utf-8')
	console.log("data", textdata)
	res.render('restget', { title: 'Results of get', mydata: textdata });
    })
});

module.exports = router;
