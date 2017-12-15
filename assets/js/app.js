// $(document).ready(function(){
	console.log("link script js ok");

	$("input").change(function() {
		var myRequest = $(this).val();
		ajaxRequest(myRequest, function(res){ //test du callback
			addElement(res);
		});
	})

	function ajaxRequest(cityRequest, cb) {
		$.ajax({
			url : 'http://api.openweathermap.org/data/2.5/weather?q=' + cityRequest + '&units=metric&APPID=ee43646aad159fa17c9141272573d285', 
			type : 'GET',
			dataType: 'json',
			success: function(res) {
				myData = {
					"Ville": res.name,
					"Longitude": res.coord.lon,
					"Latitude": res.coord.lat,
					"Vitesse du vent": res.wind.speed,
					"Humidité":res.main.humidity,
					"Pression":res.main.pressure,
					"Température min":res.main.temp_min,
					"Température max":res.main.temp_max,
				};
				cb(myData);
			},
			error: function(err) {
				console.log(err);
			},
			complete : function() { 
				console.log("complete");
			},
		});
	};


// });
/**
*
*
*/
function addElement(myData) {
	$(".content").html("");
	for (var i in myData) {
		$(".content").append("<div class=\"description\">" + i + " : " + myData[i] + "</div>");
	}
}

