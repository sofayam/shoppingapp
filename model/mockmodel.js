var uuid = require('uuid4');

function createItem(itemName) {
    return {thingId: uuid(), attributes: {item: itemName}};
}

function setupItems(count) {
    var items = [] 
    while(count > 0) {
	items.push(createItem("item" + count));
	count = count - 1
    }
    return items
}


exports.items = setupItems(10);

exports.getItems = function() {
    console.log("getting items");
    return exports.items;
}

exports.addItem = function(itemName) {
    exports.items.push(createItem(itemName));
}

exports.getItem = function(id) {
    // lazy and inefficient
    for (var i = 0; i < exports.items.length; i++) {
	if (exports.items[i].thingId == id) {
	  return exports.items[i];  
	}
    }
}

exports.foo = function() {
    console.log("requiring cr");
}
