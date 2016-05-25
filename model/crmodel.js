var request = require('request');
var restparams = require('./restparams');
var uuid = require('uuid4');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 
// Rest calls will fail if this is not directly assigned in 
// this file (will not work if just in restparams.js)


exports.getItems = function(callback) {

    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/search/things?filter=and(exists(attributes/name),eq(attributes/type,\"purchase\"))";
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
		if (bodydata) {
		    items = bodydata.items		
		} else {
		    items = []
		}
		callback(items)
	    }
	   )
};



exports.getThings = function(callback) {

    
    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/search/things";
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
		if (bodydata) {
		    items = bodydata.items		
		} else {
		    items = []
		}
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
		var items;
		if (bodydata) {
		    items = bodydata.items		
		} else {
		    items = []
		}
		callback(items)
	    }
	   )
};

exports.getItemsForStore = function(storeId, callback) {

    
    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/search/things?filter=and(exists(attributes/name),eq(attributes/store,\"" + storeId + "\"))";
    params.method = "GET";

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
		var items = bodydata.items;
		callback(items)
	    }
	   )
};



exports.getThing = function(id, callback) {
    var params = restparams.getParams();
    params.uri = "https://cr.apps.bosch-iot-cloud.com/cr/1/things/" + id ;
    //console.log("URI: ", params.uri);
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
    //console.log("uuid", thisUuid);
 
    params.uri =  "https://cr.apps.bosch-iot-cloud.com/cr/1/things/markandrew:" + thisUuid;
    params.method = "PUT";
    params.json = {attributes: {type: "purchase", name: itemName}};

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
    //console.log("uuid", thisUuid);
 
    params.uri =  "https://cr.apps.bosch-iot-cloud.com/cr/1/things/markandrew:" + thisUuid;
    params.method = "PUT";
    params.json = {attributes: {type: "store", name: storeName}};

    request(
	params,
	function(error, response, body) {
	    //console.log(body);
	}
    )
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
		//console.log("thing set returned");
		//console.log("response: ", response);
		//console.log("error: ", error);
		//console.log("type of body: ", typeof body); 
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
		console.log("thing deleted");
		//console.log("response: ", response);
		//console.log("error: ", error);
		//console.log("type of body: ", typeof body); 
	    }
	   )
};


exports.setLoc = function(id, lat, lng, address) {
    //console.log("********++++++++++ setting location");
    var val = {lng: lng, lat: lat, address: address};
    setCRAttribute(id, "position", val);
    //console.log("****** finished set location");
}

exports.clearStoreForItem = function(id) {
    console.log("clear store", id);
    setCRAttribute(id, "store", "null");
}

exports.setTripDate = function(storeId, tripDate) {
    console.log("trip date", storeId, tripDate);
    setCRAttribute(storeId, "tripDate", tripDate);
}

// TBD this is copied from mockmodel - share this properly
exports.cancelRemoveTrip = function(storeId) {
    console.log("cancel and remove storeid from all things", storeId);
    exports.setTripDate(storeId, "unset");
    exports.getItemsForStore(storeId, function(items) {
	for(var i = 0; i < items.length; i++) {
	    var itemId = items[i].thingId;
	    console.log("clearing item " , i, itemId)
	    exports.clearStoreForItem(itemId);
	}
    })
}
