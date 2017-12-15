// $(document).ready(function(){
	console.log("link script js ok");
	var cityArray = [];

	$("input").click(function() {
		$("input").val("");
	})

	$("#cityChoice").click(function() {
		var myRequest = $("input").val();
		// push la réponse Ajax dans l'array cityArray
		meteoRequest(myRequest, function(res){ 
			cityArray.push(res);
			switchElement(cityArray);
		});
	})

	function meteoRequest(cityRequest, callback) {
		$.ajax({
			url : 'https://api.openweathermap.org/data/2.5/weather?q=' + cityRequest + '&units=metric&APPID=ee43646aad159fa17c9141272573d285', 
			type : 'GET',
			dataType: 'json',
			success: function(res) {
				// on stocke les données dans un array...
				var myData = {
					"Ville": res.name,
					"Longitude": res.coord.lon,
					"Latitude": res.coord.lat,
					"Vitesse du vent": res.wind.speed,
					"Humidité":res.main.humidity,
					"Pression":res.main.pressure,
					"Température min":res.main.temp_min,
					"Température max":res.main.temp_max,
				};
				// qu'on retourne via le callback
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



	function switchElement(cityArray) {
		console.log(cityArray.length);
		var newCity = cityArray[cityArray.length-1];
		var lastCity = cityArray[cityArray.length-2];
		console.log(newCity);
		console.log(lastCity);
		$('#fiche2').html("");
		for (var i in newCity) {
			$('#fiche2').append("<div class=\"description\">" + i + " : " + newCity[i] + "</div>");
		}
		$('#fiche1').html("");
		for (var i in lastCity) {
			$('#fiche1').append("<div class=\"description\">" + i + " : " + lastCity[i] + "</div>");
		}
	}

