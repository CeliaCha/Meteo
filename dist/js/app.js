function meteoRequest(e,t){$.ajax({url:"https://api.openweathermap.org/data/2.5/weather?q="+e+"&units=metric&APPID=ee43646aad159fa17c9141272573d285",type:"GET",dataType:"json",success:function(e){var i={City:e.name,Longitude:e.coord.lon,Latitude:e.coord.lat,WindSpeed:e.wind.speed,Humidity:e.main.humidity,Pressure:e.main.pressure,Temp_min:e.main.temp_min+" C°",Temp_max:e.main.temp_max+" C°"};t(i)},error:function(e){alert("Echec de la requête."),console.log(e)},complete:function(){console.log("complete")}})}function updateView(e){countCities++,citiesStorage.setItem(countCities+"city",e.City),twoLastRequests.length>1&&twoLastRequests.splice(0,1),twoLastRequests.push(e);var t=twoLastRequests[twoLastRequests.length-1],i=twoLastRequests[twoLastRequests.length-2];$("#fiche2").html("");for(var a in t)$("#fiche2").append('<div class="description">'+a+" : "+t[a]+"</div>");$("#fiche1").html("");for(var a in i)$("#fiche1").append('<div class="description">'+a+" : "+i[a]+"</div>");void 0!=cityMap&&cityMap.remove(),cityMap=L.map("mapid").setView([t.Latitude,t.Longitude],10),L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',maxZoom:18,id:"mapbox.streets",accessToken:"pk.eyJ1IjoiY2VsaWFjaGEiLCJhIjoiY2piYW9kb2NjMHU5eTJ3bm51NDYwNm96YyJ9.bd3WcQc8BlJc-P7hXQUeVA"}).addTo(cityMap),L.marker([t.Latitude,t.Longitude]).addTo(cityMap)}function log(e){console.log(e)}console.log("link script js ok");var cityMap,citiesStorage=localStorage,countCities=0,twoLastRequests=[""];$("input").click(function(){$(this).val(""),$(this).css("color","black")}),$("#cityChoice").click(function(){meteoRequest($("input").val(),updateView)});