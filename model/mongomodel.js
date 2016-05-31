"use strict";

var  uuid = require('uuid4');

var mc = require('mongodb').MongoClient;
var assert = require('assert');

var collName = "shopping";

function getURI() {
// TBD check for Heroku here too
    if(process.env.VCAP_SERVICES){   
	var env = JSON.parse(process.env.VCAP_SERVICES);
	var fullurl = (env['MongoDB-Service'][0]['credentials']['uri']);
	var front = fullurl.split('?')[0];
	return front
    } else {
	return "mongodb://localhost:27017/db"
    }
}

function createItem(itemName) {
    return {thingId: "markandrew:" + uuid(), 
	    attributes: {name: itemName, type: "purchase"}};
}

function createStore(storeName) {
    return {thingId: "markandrew:" + uuid(), 
	    attributes: {name: storeName, type: "store"}};
}


function getType(type,callback) {
    var url = getURI();
    mc.connect(url, function(err,db) {
	assert.equal(null,err);
	var cursor;
	if (type) {
	    cursor = db.collection(collName).find({"attributes.type": type});
	} else {
	    cursor = db.collection(collName).find();
	}
	var res = []
	cursor.each(function(err,doc) {
	    assert.equal(null,err);
	    if (doc != null) {
		res.push(doc)
	    } else {
		db.close();
		callback(res)
	    }   	
	});
    });
}

exports.getThing = function(id, callback) {
    var url = getURI();
    mc.connect(url, function(err,db) {
	assert.equal(null,err);
	var res;
	console.log("found a mongo thing", res)
	db.collection(collName).findOne({"thingId": id}, function(err,thing){
	    assert.equal(err, null);
	    console.log("found a mongo thing", thing)
	    callback(thing);
	    
	});
    })
}



function addThing(thing) {
    var url = getURI();
    console.log("adding a mongo thing");
    mc.connect(url, function(err,db) {
	assert.equal(null,err);
	db.collection(collName).insertOne(thing, function (err, result) {
	    assert.equal(err, null);
	    db.close();
	});
    });
}

exports.getItems = function(callback) {
    // console.log("getting items");
    var items = getType("purchase",callback);
}

exports.getItemsForStore = function(storeId, callback) {
    var url = getURI();
    mc.connect(url, function(err,db) {
	assert.equal(null,err);
	var cursor;
	cursor = db.collection(collName).find({"attributes.store": storeId});
	var res = []
	cursor.each(function(err,doc) {
	    assert.equal(null,err);
	    if (doc != null) {
		res.push(doc)
	    } else {
		db.close();
		callback(res)
	    }   	
	});
    });
}


exports.getStores = function(callback) {
    // console.log("getting stores");
    var stores = getType("store",callback);
}

exports.getThings = function(callback) {
    // console.log("getting things");
    var stores = getType("", callback);
}

exports.addItem = function(itemName) {
    addThing(createItem(itemName));
}

exports.addStore = function(storeName) {
    addThing(createStore(storeName));
}

function setCRAttribute(id,key,val) {
    var url = getURI();
    mc.connect(url, function(err,db) {
	assert.equal(null,err);
	var res;
	console.log("found a mongo thing", res)
	var strkey = "attributes." + key
	var setting = {}
	setting[strkey] = val
	db.collection(collName).update({"thingId": id}, {$set: setting})
    })
}

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

exports.setStoreForItem = function(storeId, itemId) {
    setCRAttribute(itemId, "store", storeId);    
}

exports.delThing = function(id) {
    var url = getURI();
    mc.connect(url, function(err,db) {
	assert.equal(null,err);
	db.collection(collName).remove({"thingId": id})
    })
};
