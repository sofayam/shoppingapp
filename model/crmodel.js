var request = require('request');
var restparams = require('./restparams');
var uuid = require('uuid4');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 
// Rest calls will fail if this is not directly assigned in 
// this file (will not work if just in restparams.js)

function createItem(itemName) {
    // returns an item but does not store it yet
}
function createStore(storeName) {
    // returns a store but does not store it yet
}

function setupItems(count) {}

function setupStores(count) {}

exports.getItems = function(callback) {

    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/search/things?filter=and(exists(attributes/item),eq(attributes/type,\"purchase\"))";
    params.method = "GET";

    request(params, 
	    function(error, response, body) {
		try {
		    // TBD complete mystery, sometimes the body arrives preparsed, 
		    // sometimes as a string
		    var bodydata = body;
		    if (typeof body == "string") {
			bodydata = JSON.parse(body);
		    } 
		} catch(e) {
		    return console.error(e);
		};
		//console.log("bodydata : ", bodydata);
		var items = bodydata.items;
		callback(items)
	    }
	   )
};

exports.getStores = function(callback) {

    
    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/search/things?filter=and(exists(attributes/name),eq(attributes/type,\"store\"))";
    params.method = "GET";

    request(params, 
	    function(error, response, body) {
		try {
		    // TBD complete mystery, sometimes the body arrives preparsed, 
		    // sometimes as a string
		    var bodydata = body;
		    if (typeof body == "string") {
			bodydata = JSON.parse(body);
		    } 
		} catch(e) {
		    return console.error(e);
		};
		//console.log("bodydata : ", bodydata);
		var items = bodydata.items;
		callback(items)
	    }
	   )
};



exports.getItem = function(id, callback) {
    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/things/" + id ;
    console.log("URI: ", params.uri);
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
		//console.log("bodydata type: ", typeof bodydata);
		callback && callback(bodydata);
	    }
	   )



}

// add item raw materials
exports.addItem = function(itemName) { // JUST puts the name
    var params = restparams.getParams();

    var thisUuid = uuid();
    console.log("uuid", thisUuid);
 
    params.uri =  "https://cr.apps.bosch-iot-cloud.com/cr/1/things/markandrew:" + thisUuid;
    params.method = "PUT";
    params.json = {attributes: {type: "purchase", item: itemName}};

    request(
	params,
	function(error, response, body) {
	    console.log(body);
	}
    )
}

exports.addStore = function(storeName) {
    var params = restparams.getParams();

    var thisUuid = uuid();
    console.log("uuid", thisUuid);
 
    params.uri =  "https://cr.apps.bosch-iot-cloud.com/cr/1/things/markandrew:" + thisUuid;
    params.method = "PUT";
    params.json = {attributes: {type: "store", name: storeName}};

    request(
	params,
	function(error, response, body) {
	    console.log(body);
	}
    )
}



exports.delItem = function(id) {
    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/things/" + id ;
    console.log("URI: ", params.uri);
    params.method = "DELETE";

    request(params, 
	    function(error, response, body) {
		console.log("item deleted");
		//console.log("response: ", response);
		//console.log("error: ", error);
		//console.log("type of body: ", typeof body); 
	    }
	   )
};
