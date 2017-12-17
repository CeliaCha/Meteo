$(document).ready(function(){

var userRequest;
var citiesStorage = localStorage; // historique des recherches
var countCities = 0; // compteur pour générer les clés du localStorage
var twoLastRequests = [""]; // stockage des données complètes des deux dernières villes
var cityMap, lastCityMap; // API Leaflet

// LISTENERS :
$("input").click(function() {
	$(this).val("");
	$(this).css("color", "black");
})


$("#cityChoice").click(function() {
	userRequest = $("input").val();
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
			Ville : res.name,
			Longitude : res.coord.lon,
			Latitude : res.coord.lat,
			Humidité: res.main.humidity + ' %',
			Pression: res.main.pressure + ' hpa',
			Temp_min: res.main.temp_min + ' C°',
			Temp_max: res.main.temp_max + ' C°',
		};
		callback(ajaxRes);
		},
		error: function(err) {
			alert('Echec de la requête ou requête invalide.');
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
	citiesStorage.setItem(countCities+'city', ajaxRes.Ville);
	if (twoLastRequests.length > 1) {twoLastRequests.splice(0, 1);} // supprime du tableau l'avant-dernière requête 
	twoLastRequests.push(ajaxRes);

	// actualisation des cartes :
	var newCity = twoLastRequests[twoLastRequests.length-1], lastCity = twoLastRequests[twoLastRequests.length-2];
	$('#card2 ul').empty();
	for (var i in newCity) {
		$('#card2 ul').append("<li>" + i + " : " + newCity[i] + "</li>");
	}
	$('#card1 ul').empty();
	for (var i in lastCity) {
		$('#card1 ul').append("<li>" + i + " : " + lastCity[i] + "</li>");
	};

	// actualisation des maps :
	// nouveau map :
	if (cityMap != undefined) {cityMap.remove();}
	cityMap = L.map('mapFrame2').setView([newCity.Latitude, newCity.Longitude], 12);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiY2VsaWFjaGEiLCJhIjoiY2piYW9kb2NjMHU5eTJ3bm51NDYwNm96YyJ9.bd3WcQc8BlJc-P7hXQUeVA'
	}).addTo(cityMap);
	L.marker([newCity.Latitude, newCity.Longitude]).addTo(cityMap);
	// map précédent :
	if (lastCity != "" && lastCity != undefined) {
		if (lastCityMap != undefined) {lastCityMap.remove();}
		lastCityMap = L.map('mapFrame1').setView([lastCity.Latitude, lastCity.Longitude], 12);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			maxZoom: 18,
			id: 'mapbox.streets',
			accessToken: 'pk.eyJ1IjoiY2VsaWFjaGEiLCJhIjoiY2piYW9kb2NjMHU5eTJ3bm51NDYwNm96YyJ9.bd3WcQc8BlJc-P7hXQUeVA'
		}).addTo(lastCityMap);
		L.marker([lastCity.Latitude, lastCity.Longitude]).addTo(lastCityMap);
	}

	// Réinitialisation du champ de recherche et de userRequest
	$("input").val("Rechercher une ville");
	$("input").css("color", "darkgrey");
	userRequest = undefined;
}

});