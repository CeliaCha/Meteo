function meteoRequest(e,i){$.ajax({url:"https://api.openweathermap.org/data/2.5/weather?q="+e+"&units=metric&APPID=ee43646aad159fa17c9141272573d285",type:"GET",dataType:"json",success:function(e){var t={"Votre recherche":e.name,Longitude:e.coord.lon,Latitude:e.coord.lat,"Vitesse du vent":e.wind.speed,"Humidité":e.main.humidity,Pression:e.main.pressure,"Température min":e.main.temp_min+" C°","Température max":e.main.temp_max+" C°"};i(t)},error:function(e){console.log(e)},complete:function(){console.log("complete")}})}function updateCards(e){cityArray.push(e);var i=cityArray[cityArray.length-1],t=cityArray[cityArray.length-2];$("#fiche2").html("");for(var a in i)$("#fiche2").append('<div class="description">'+a+" : "+i[a]+"</div>");$("#fiche1").html("");for(var a in t)$("#fiche1").append('<div class="description">'+a+" : "+t[a]+"</div>")}console.log("link script js ok");var cityArray=[];$("input").click(function(){$("input").val(""),$("input").css("color","black")}),$("#cityChoice").click(function(){meteoRequest($("input").val(),updateCards)});