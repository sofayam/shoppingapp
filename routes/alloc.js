var express = require('express');
var request = require('request');
var model = require('../model/model.js');

var router = express.Router();

// TBD horrible hack to see how easily we can make CR ids html tag-fähig

function nocol (withcol) {
    return withcol.replace(':','Z');
}

router.get('/', function(req, res, next) {

    // build a structure with a key for each store and a list of items allocated

    function getStoreIds(stores) {
	var res = {};
	for (var i=0; i < stores.length; i++) {
	    res[nocol(stores[i].thingId)] = 1;
	}
	return res
    }
	
    var storesWithItems = {}
    var remainingItems = []
  
    model.getStores(function(stores) {
	var storeIds = getStoreIds(stores);
	model.getItems(function(items) {

	    //console.log("Stores " + JSON.stringify(stores));

	    for (var i=0; i < stores.length; i++) {
		storeId = nocol(stores[i].thingId);
		storesWithItems[storeId] = {id: storeId, name: stores[i].attributes.name, items: []};
	    }
	    //console.log("Stores with items: " + JSON.stringify(storesWithItems));

	    for (var i=0; i < items.length; i++) {

		// TBD horrible hack to patch up colons
		var item = JSON.parse(JSON.stringify(items[i]));
		item.thingId = nocol(item.thingId); 
		if (item.attributes.store) {item.attributes.store = nocol(item.attributes.store)}

		//	if ("store" in item.attributes) {
		if (item.attributes.store in storeIds) { 
		    // TBD what about orphan items?
		    storesWithItems[item.attributes.store].items.push(item);
		} else {
		    remainingItems.push(item);
		}
		//	}
	    }
	    
	    //console.log("Stores with items: " + JSON.stringify(storesWithItems));
	    
	    res.render('alloc', 
		       {title: "Allocate your shopping", 
			mydata: remainingItems,
			stores: storesWithItems
		       })
	})
    })
})
module.exports = router
