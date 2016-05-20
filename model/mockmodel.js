var uuid = require('uuid4');

function createItem(itemName) {
    return {thingId: uuid(), attributes: {item: itemName}};
}

function createStore(storeName) {
    return {thingId: uuid(), attributes: {name: storeName}};
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


var items = setupItems(4);

var stores = setupStores(4);

exports.getItems = function(callback) {
    console.log("getting items");
    callback && callback(items);
}

exports.getStores = function(callback) {
    console.log("getting stores");
    callback && callback(stores);
}

exports.addItem = function(itemName) {
    items.push(createItem(itemName));
}
exports.addStore = function(itemName) {
    stores.push(createStore(itemName));
}

exports.getItem = function(id) {
    console.log("get item");
    // lazy and inefficient
    for (var i = 0; i < items.length; i++) {
	if (items[i].thingId == id) {
	  console.log("got item");
	  return items[i];  
	}
    }
}



exports.setStoreForItem = function(storeId, itemId) {
    console.log("setting store");
    item = exports.getItem(itemId);
    console.log(item);
    item.attributes.store = storeId;
    console.log(item);
}
