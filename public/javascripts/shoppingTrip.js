function sendTripDate() {
    var tripDate = document.getElementById("tripDate").value;
    if (!tripDate) {
        alert("tripdate not set");
        return;
    };  
    $.ajax({
	type: "GET",
	url: "/settripdate",
	//		contentType: 'application/json; charset=utf-8',
	data: {
	    storeId: getThingId(),
	    tripDate: tripDate,
	},
	success: function(result) { 
	    document.getElementById("currentFixedDate").innerHTML = "(Now " + tripDate + ")";
	},
    });
};

function cancelRemoveTrip() {
        $.ajax({
	type: "GET",
	url: "/cancelremovetrip",
	//		contentType: 'application/json; charset=utf-8',
	data: {
	    storeId: getThingId(),
	},
	success: function(result) {
	},
    });
    setTimeout(returnAlloc, 1000); // wait for the db write commands to go through
}


function returnAlloc() {
    location.replace("/alloc");
}


