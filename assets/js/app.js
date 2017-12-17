console.log("link script js ok");

var citiesStorage = localStorage; // historique des recherches
var countCities = 0; // compteur pour générer les clés du localStorage
var twoLastRequests = [""]; // stockage des données complètes des deux dernières villes
var cityMap;

// LISTENERS :
$("input").click(function() {
	$(this).val("");
	$(this).css("color", "black");

})

$("#cityChoice").click(function() {
	var userRequest = $("input").val();
	meteoRequest(userRequest,updateView);
})


// REQUÊTE AJAX :
function meteoRequest(userRequest, callback) {
	$.ajax({
		url : 'https://api.openweathermap.org/data/2.5/weather?q=' + userRequest + '&units=metric&APPID=ee43646aad159fa17c9141272573d285', 
		type : 'GET',
		dataType: 'json',
		success: function(res) {
		var ajaxRes = {
			City : res.name,
			Longitude : res.coord.lon,
			Latitude : res.coord.lat,
			WindSpeed: res.wind.speed,
			Humidity: res.main.humidity,
			Pressure: res.main.pressure,
			Temp_min: res.main.temp_min + ' C°',
			Temp_max: res.main.temp_max + ' C°',
		};
		callback(ajaxRes);
		},
		error: function(err) {
			alert('Echec de la requête.');
			console.log(err);
		},
		complete : function() { 
			console.log("complete");
		},
	});
};

// CALLBACK DE LA REQUÊTE :
function updateView(ajaxRes) { 

	// actualisation du localStorage et du tableau twoLastRequests :
	countCities++;
	citiesStorage.setItem(countCities+'city', ajaxRes.City);
	if (twoLastRequests.length > 1) {twoLastRequests.splice(0, 1);} // supprime du tableau l'avant-dernière requête 
	twoLastRequests.push(ajaxRes);

	// actualisation des fiches :
	var newCity = twoLastRequests[twoLastRequests.length-1];
	var lastCity = twoLastRequests[twoLastRequests.length-2];
	$('#fiche2').html("");
	for (var i in newCity) {
		$('#fiche2').append("<div class=\"description\">" + i + " : " + newCity[i] + "</div>");
	}
	$('#fiche1').html("");
	for (var i in lastCity) {
		$('#fiche1').append("<div class=\"description\">" + i + " : " + lastCity[i] + "</div>");
	};

	// actualisation de la map :
	if (cityMap != undefined) {cityMap.remove();}
	cityMap = L.map('mapid').setView([newCity.Latitude, newCity.Longitude], 10);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiY2VsaWFjaGEiLCJhIjoiY2piYW9kb2NjMHU5eTJ3bm51NDYwNm96YyJ9.bd3WcQc8BlJc-P7hXQUeVA'
	}).addTo(cityMap);
	L.marker([newCity.Latitude, newCity.Longitude]).addTo(cityMap);
}


// DEV :
function log(stuff) {
	console.log(stuff);
}