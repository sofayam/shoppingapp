var express = require('express');
var model = require('../model/model.js');
var router = express.Router();

router.get('/', function(req, resp, next) {
    
    var storeId = req.query.storeId.replace('Z', ':');
    // gather info about the trip to the store
    model.getThing(storeId, function(store) {
	console.log("got store :", store.attributes.name)
	model.getItemsForStore(storeId, function(items) {
	    console.log("got so many items: " + items.length);
	    //resp.render('plantrip', store, items);
	    resp.render('plantrip', {store: store, items: items});
	});
    })
});

module.exports = router;
