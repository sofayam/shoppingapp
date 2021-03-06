$(document).ready(function() {


    // get the list of possible stores from db
    var stores = getStores(); //["store1", "store2", "store3"];
    function concatlabels(storelabels) {
	res = ""
	for (var i = 0; i < storelabels.length; i++) {
	    res = res + storelabels[i] + ", ";
	};
	return res
    }

    function mklabels(stores) {
	res = [];
	for (var i = 0; i < stores.length; i++) {
	    res.push ("#" + stores[i]);
	}; 
	return res
    }

    var storelabels = mklabels(stores);
    var labellist = concatlabels(storelabels) + " #from";

    $("#from").sortable({ // begin sortable
	connectWith: labellist,
	receive: function(event, ui) { // begin receive
	    $.ajax({
		type: "GET",
		url: "/clearstoreforitem",
		data: {
			itemId: event.toElement.id,
		},
		success: function(result) {
		},
	    });

	    //alert("dropped on from")
	}, // end receive
    }) // end sortable

    function createclosure(label) {
	return function(event, ui) {
	    $.ajax({
		type: "GET",
		url: "/setstoreforitem",
		data: {
			itemId: event.toElement.id,
			storeId: event.target.id 
		},
		success: function(result) {
		},
	    });
	}
    }

    for (var i = 0; i < storelabels.length; i++) {
	var storelabel = storelabels[i];
	$(storelabel).sortable({ // begin sortable
	    connectWith: labellist,
	    receive: createclosure(storelabel)
	}); // end sortable
    }


    $('li').on('mousedown', function() {
	$(this).css(
	    {
		'backgroundColor' : 'black',
		'color' : 'white'
	    }
	);
    }).on('mouseup', function() {
	$('li').css(
	    {
		'backgroundColor' : '',
		'color' : ''
	    }
	)
    });
    
});
