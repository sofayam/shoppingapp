var uuid = require('uuid4');


function createItem(itemName) {
    return {thingId: "markandrew:" + uuid(), 
	    attributes: {name: itemName, type: "purchase"}};
}

function createStore(storeName) {
    return {thingId: "markandrew:" + uuid(), 
	    attributes: {name: storeName, type: "store"}};
}
function setupItemsNamed(things) {
    var names = ["eggs", "bread", "milk"]
    for (i = 0; i < names.length; i++) {
        var item = createItem(names[i]);
        things[item.thingId] = item;
    }
}
function setupStoresNamed(things) {
    var names = ["aldi", "penny", "rewe"]
    for (i = 0; i < names.length; i++) {
        var item = createStore(names[i]);
        things[item.thingId] = item;
    }
}


function setupItems(things, count) {
    while(count > 0) {
	var item = createItem("item" + count);
	things[item.thingId] = item;
	count = count - 1
    }
}

function setupStores(things, count) {
    while(count > 0) {
	var store = createStore("store" + count);
	things[store.thingId] = store
	count = count - 1
    }
}


var things = {};

setupItemsNamed(things);
//console.log("All your things " + JSON.stringify(things));
setupStoresNamed(things);
//console.log("All your things " + JSON.stringify(things));

//var items = setupItems(10);

//var stores = setupStores(4);

function getType(type) {
    var found = []
    // console.log("Looking at things for type" + JSON.stringify(type));
    for (id in things) {
	// console.log("Looking at thing" + JSON.stringify(things[id]));
	if ((things[id].attributes.type == type) || (type == null)){
	    // console.log("pushing thing" + JSON.stringify(id));
	    found.push(things[id])
	}
    }
    return found
}


exports.getItems = function(callback) {
    // console.log("getting items");
    var items = getType("purchase");
    callback && callback(items);
}

exports.getStores = function(callback) {
    // console.log("getting stores");
    var stores = getType("store");
    callback && callback(stores);
}

exports.getThings = function(callback) {
    // console.log("getting things");
    var stores = getType();
    callback && callback(stores);
}

exports.addItem = function(itemName) {
    var item = createItem(itemName);
    things[item.thingId] = item;
}
exports.addStore = function(storeName) {
    var store = createStore(storeName);
    things[store.thingId] = store;
}

exports.getThing = function(id, callback) {
    // console.log("get thing");
    var thing = things[id];
    callback && callback(thing);
}


exports.setStoreForItem = function(storeId, itemId) {
    // console.log("setting store id: " + storeId + " on item id: " + itemId);
    things[itemId].attributes.store = storeId
}

exports.delThing = function(id) {
    console.log("deleting a thing");
    delete things[id];
}

exports.setLoc = function(id, lat, lng, address) {
    // console.log("setting loc for store id: " + id + " at: " + lng + " x " + lat);
    things[id].attributes.position = {lng: lng, lat: lat, address: address}
}
    
exports.clearStoreForItem = function(id) {
    things[id].attributes.store = "null"
}

exports.setTripDate = function(storeId, tripDate) {
    things[storeId].attributes.tripDate = tripDate
}

exports.getItemsForStore = function(storeId, callback) {
    exports.getItems(function(items) {
	var filtered = []
	for (var i=0; i<items.length; i++) {
	    var item = items[i];
	    if (item.attributes.store == storeId) {
		filtered.push(item);
	    }
	}
	callback(filtered);
    });
};

// For shared functions look in model.js



