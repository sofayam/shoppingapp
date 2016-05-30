var request = require('request');
var restparams = require('./restparams');
var uuid = require('uuid4');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 
// Rest calls will fail if this is not directly assigned in 
// this file (will not work if just in restparams.js)

var unpack = true; var singlevalue = false;

function CRRequest(params, callback, unpackflag) {

    request(params, 
	    function(error, response, body) {
		var bodydata = body;
		try { 
		    // TBD complete mystery, sometimes the body arrives preparsed, 
		    // sometimes as a string

		    if (typeof body == "string") {
			bodydata = JSON.parse(body);
		    } 
		} catch(e) {
		    return console.error(e);
		};
		//console.log("bodydata : ", bodydata);
		if (unpackflag) {
		    if (bodydata) {
			items = bodydata.items		
		    } else {
			items = []
		    }
		    callback(items)
		} else {
		    callback(bodydata)
		}
	    })
}


exports.getItems = function(callback) {

    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/search/things?filter=and(exists(attributes/name),eq(attributes/type,\"purchase\"))";
    params.method = "GET";
    CRRequest(params,callback,unpack);
};



exports.getThings = function(callback) {
    
    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/search/things";
    params.method = "GET";
    CRRequest(params,callback,unpack); 
};


exports.getStores = function(callback) {
    
    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/search/things?filter=and(exists(attributes/name),eq(attributes/type,\"store\"))";
    params.method = "GET";
    CRRequest(params,callback,unpack); 
};

exports.getItemsForStore = function(storeId, callback) {
    
    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/search/things?filter=and(exists(attributes/name),eq(attributes/store,\"" + storeId + "\"))";
    params.method = "GET";
    CRRequest(params,callback,unpack); 
};



exports.getThing = function(id, callback) {
    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/things/" + id ;
    //console.log("URI: ", params.uri);
    params.method = "GET";
    CRRequest(params,callback,singlevalue);
}

addThing = function(attributes) {

    var params = restparams.getParams();

    var thisUuid = uuid();
    //console.log("uuid", thisUuid);
 
    params.uri =  "https://cr.apps.bosch-iot-cloud.com/cr/1/things/markandrew:" + thisUuid;
    params.method = "PUT";
    params.json = attributes;

    request(
	params,
	function(error, response, body) {
	    console.log(body);
	}
    )

}


exports.addItem = function(itemName) {
    addThing({attributes: {type: "purchase", name: itemName}});
}

exports.addStore = function(storeName) {
    addThing({attributes: {type: "store", name: storeName}});
}

function setCRAttribute(id,key,val) {
    console.log("setting attribute",id,key,val);

    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/things/" + id +
	"/attributes/" + key;
    //console.log("URI: ", params.uri);
    params.method = "PUT";
    params.json = val;
    request(params, 
	    function(error, response, body) {
	    }
	   )   
}


exports.setStoreForItem = function(storeId, itemId) {
    setCRAttribute(itemId, "store", storeId);    
}

exports.delThing = function(id) {
    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/things/" + id ;
    //console.log("URI: ", params.uri);
    params.method = "DELETE";

    request(params, 
	    function(error, response, body) {
	    }
	   )
};


exports.setLoc = function(id, lat, lng, address) {
    var val = {lng: lng, lat: lat, address: address};
    setCRAttribute(id, "position", val);
}

exports.clearStoreForItem = function(id) {
    console.log("clear store", id);
    setCRAttribute(id, "store", "null");
}

exports.setTripDate = function(storeId, tripDate) {
    console.log("trip date", storeId, tripDate);
    setCRAttribute(storeId, "tripDate", tripDate);
}

// For shared functions look in model.js
