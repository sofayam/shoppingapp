configfile = require ('../routes/configfile.js');

var model = configfile.getSelected("model");

var requirePath = "./" + model;

var res = require(requirePath);
console.log("requiring ", requirePath);
module.exports = exports = res

// TBD this is the first one which is identical for both models, 
// maybe do something with prototypes to share this code properly
module.exports.cancelRemoveTrip = function(storeId) {
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

