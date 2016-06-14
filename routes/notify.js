var express = require('express');
var request = require('request');
var model = require('../model/model.js');

var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.query.id) {
        var id = model.getThing(req.query.id, function (store) {

            var activity = {
                "ID": 0,  // Create new activity
                "userID": 123, // TBD ???
                "goalDescription": "Shopping trip to " + store.attributes.name,
                "type": "VISIT",
                "objectDescription": "Shopping",
                "possibleLocations": [{
                    "lon": parseFloat(store.attributes.position.lng),
                    "lat": parseFloat(store.attributes.position.lat),
                    "country": store.attributes.position.address,
                    "zip": null,
                    "place": null,
                    "street": null,
                    "number": null
                }],
                "userDecision": "ACCEPTED",
                "location": null,
                "earliest_start": store.attributes.tripDate + " 08:00:00", // TBD currently no time 
                "latest_start": store.attributes.tripDate + " 18:00:00",
                "duration": 6000, // TBD currently no duration
                "startTime": null,
                "partners": [],
                "notifiedOnDelay": [],
                "originDefault": null,
                "priority": 0,
                "tripchainID": 0
            }

            // request on assistance app writeNewCalendarEntry with content = activity

            console.log("making http request to MobiAssi")
            
            params = {
                uri: "http://localhost:9090/writeNewCalendarEntry",
                method: "POST",
                json: { content: activity },

                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            }
            request(
                params,
                function(err,resp,body) {
                    console.log("returned from writeNewCalendarEntry: " + err)        
                }
            )

            res.render('notify',
                {
                    title: 'Notified following activity to Mobility Assistance',
                    item: JSON.stringify(activity, undefined, " ")
                })
        });
    }
})


module.exports = router;