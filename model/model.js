config = require ('./config.js');

if (config.model == "mongo") {
    res = require('./mongomodel.js')
} else if (config.model == "cr") {
    res = require('./crmodel.js')
} else if (config.model == "mock") {
    res = require('./mockmodel.js')
} else {
   throw "bad config value: " + config.model 
}

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

