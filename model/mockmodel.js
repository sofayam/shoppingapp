var uuid = require('uuid4');


function createItem(itemName) {
    return {thingId: "markandrew:" + uuid(), 
	    attributes: {name: itemName, type: "purchase"}};
}

function createStore(storeName) {
    return {thingId: "markandrew:" + uuid(), 
	    attributes: {name: storeName, type: "store"}};
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

setupItems(things,2);
//console.log("All your things " + JSON.stringify(things));
setupStores(things,4);
//console.log("All your things " + JSON.stringify(things));

//var items = setupItems(10);

//var stores = setupStores(4);

function getType(type) {
    var found = []
    console.log("Looking at things for type" + JSON.stringify(type));
    for (id in things) {
	console.log("Looking at thing" + JSON.stringify(things[id]));
	if ((things[id].attributes.type == type) || (type == null)){
	    console.log("pushing thing" + JSON.stringify(id));
	    found.push(things[id])
	}
    }
    return found
}


exports.getItems = function(callback) {
    console.log("getting items");
    var items = getType("purchase");
    callback && callback(items);
}

exports.getStores = function(callback) {
    console.log("getting stores");
    var stores = getType("store");
    callback && callback(stores);
}

exports.getThings = function(callback) {
    console.log("getting things");
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
    console.log("get thing");
    var thing = things[id];
    callback && callback(thing);
}


exports.setStoreForItem = function(storeId, itemId) {
    console.log("setting store id: " + storeId + " on item id: " + itemId);
    item = exports.getItem(itemId, function(item) {
	item.attributes.store = storeId
	console.log("after: " + JSON.stringify(item));
    });
}

exports.delThing = function(id) {
    console.log("deleting a thing");
    delete things[id];
}

exports.setLoc = function(id, lat, lng, title) {
    console.log("setting loc for store id: " + id + " at: " + lng + " x " + lat);
    things[id].attributes.position = {lng: lng, lat: lat, title: title}
}
    
