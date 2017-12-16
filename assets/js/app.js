// $(document).ready(function(){
	console.log("link script js ok");
	var cityArray = [];

	$("input").click(function() {
		$("input").val("");
		$("input").css("color", "black");

	})

	$("#cityChoice").click(function() {
		var myRequest = $("input").val();
		meteoRequest(myRequest,updateCards);
	})


	// requête Ajax
	function meteoRequest(cityRequest, callback) {
		$.ajax({
			url : 'https://api.openweathermap.org/data/2.5/weather?q=' + cityRequest + '&units=metric&APPID=ee43646aad159fa17c9141272573d285', 
			type : 'GET',
			dataType: 'json',
			success: function(res) {
				var myData = {
					"Votre recherche" : res.name,
					"Longitude" : res.coord.lon,
					"Latitude" : res.coord.lat,
					"Vitesse du vent": res.wind.speed,
					"Humidité": res.main.humidity,
					"Pression": res.main.pressure,
					"Température min": res.main.temp_min + ' C°',
					"Température max":res.main.temp_max + ' C°',
				};
				callback(myData);
			},
			error: function(err) {
				console.log(err);
			},
			complete : function() { 
				console.log("complete");
			},
		});
	};



		// callback pour meteoRequest() :
		function updateCards(myData) { 
			cityArray.push(myData);
			var newCity = cityArray[cityArray.length-1];
			var lastCity = cityArray[cityArray.length-2];
			$('#fiche2').html("");
			for (var i in newCity) {
				$('#fiche2').append("<div class=\"description\">" + i + " : " + newCity[i] + "</div>");
			}
			$('#fiche1').html("");
			for (var i in lastCity) {
				$('#fiche1').append("<div class=\"description\">" + i + " : " + lastCity[i] + "</div>");
			};
		}


