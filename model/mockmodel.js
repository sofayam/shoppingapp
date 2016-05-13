var uuid = require('uuid4');

function createItem(itemName) {
    return {thingId: uuid(), attributes: {item: itemName}};
}

function createStore(storeName) {
    return {storeId: uuid(), attributes: {name: storeName}};
}

function setupItems(count) {
    var items = [] 
    while(count > 0) {
	items.push(createItem("item" + count));
	count = count - 1
    }
    return items
}
function setupStores(count) {
    var stores = [] 
    while(count > 0) {
	stores.push(createStore("store" + count));
	count = count - 1
    }
    return stores
}


var items = setupItems(10);

var stores = setupStores(5);

exports.getItems = function() {
    console.log("getting items");
    return items;
}

exports.getStores = function() {
    console.log("getting stores");
    return stores;
}

exports.addItem = function(itemName) {
    items.push(createItem(itemName));
}

exports.getItem = function(id) {
    // lazy and inefficient
    for (var i = 0; i < items.length; i++) {
	if (items[i].thingId == id) {
	  return items[i];  
	}
    }
}

exports.foo = function() {
    console.log("requiring cr");
}
