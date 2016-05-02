$(document).ready(function() {
   
   	$("#from").sortable({ // begin sortable
		connectWith: "#store1, #store2",
		receive: function(event, ui) { // begin receive
		    alert("dropped on from")
		}, // end receive
	}) // end sortable

	$("#store1").sortable({ // begin sortable
		connectWith: "#from, #store2",
		receive: function(event, ui) { // begin receive
		    alert("dropped on store1")
		} // end receive 
	}); // end sortable

	$("#store2").sortable({ // begin sortable
		connectWith: "#from, #store1",
		receive: function(event, ui) { // begin receive
		    alert("dropped on store1")
		} // end receive 
	}); // end sortable

	
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
