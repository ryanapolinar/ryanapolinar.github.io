$(document).ready(function() {
	//Call the main function to locate and update the website
	var main = locateUpdate();
});

//Presents the weather status in a user-friendly way
function parseWeather(weather){
	/*clear-day, clear-night, rain, snow, sleet, wind, fog, 
	cloudy, partly-cloudy-day, or partly-cloudy-night*/
	var result = "None";
	var database = {
		"clear-day": "Sunny",
		"clear-night": "Clear",
		"rain": "Rainy",
		"snow": "Snow",
		"sleet": "Sleet",
		"wind": "Windy",
		"fog": "Foggy",
		"cloudy": "Cloudy",
		"partly-cloudy-day": "Partly Cloudy (Day)",
		"partly-cloudy-night": "Partly Cloudy (Night)"
	}
	result = database[weather];
	return result;
}

//Updates image based on parseWeather
function weatherImage(weather){
	var result = "none";
	var imageDB = {
		"Sunny": "http://i63.tinypic.com/2yzldsh.jpg",
		"Clear": "http://i63.tinypic.com/2ef6ej8.jpg",
		"Rainy": "http://i64.tinypic.com/2j2cll1.jpg",
		"Snow": "http://i63.tinypic.com/2rwxf7m.jpg",
		"Sleet": "http://i67.tinypic.com/2i0yu13.jpg",
		"Windy": "http://i66.tinypic.com/2hcgqac.jpg",
		"Foggy": "http://i67.tinypic.com/d71o3.jpg", //same as cloudy for now
		"Cloudy": "http://i67.tinypic.com/d71o3.jpg",
		"Partly Cloudy (Day)": "http://i63.tinypic.com/2igdnw4.jpg",
		"Partly Cloudy (Night)": "http://i66.tinypic.com/2dhu3yg.jpg"
	}
	result = imageDB[weather];
	return result;
}

function bgColor(weather){
	var colors = {
		"Sunny": "#ff9933",
		"Clear": "#004de6",
		"Rainy": "#3366ff",
		"Snow": "#ccd8ff",
		"Sleet": "#4d88ff",
		"Windy": "#4dff88",
		"Foggy": "#afbecf", //same as cloudy for now
		"Cloudy": "#afbecf",
		"Partly Cloudy (Day)": "#ffbf80",
		"Partly Cloudy (Night)": "#50619a"
	}
	return colors[weather];
}

function locateUpdate(){
	var lat, long, country, location;
	var url = 'https://api.forecast.io/forecast/';
	var key = '6180b92f0cd77718b905d88b0259e63e';
	
	//Access the user's location via IP API
	$.getJSON('https://ipapi.co/json/', function(data){
		lat = data.latitude;
		long = data.longitude;
		
		location = data.city + ", " + data.country;
		url = url + key + "/" + lat + "," + long + "?callback=?";
		
		$("#loc").html("<div class='animated fadeIn'>"+location+"</div>");
		
		//Get the weather via location and update the text
		$.getJSON(url, function(json){
			var weather = parseWeather(json.currently.icon);
			var fahrenheit = parseInt(json.currently.temperature);
			var celsius = parseInt((fahrenheit - 32) * 5 / 9);
			
			//Background animation
			
			$("html body").animate({
        		backgroundColor: bgColor(weather),
      	}, 1000);
			
			//Update the website to reflect data
			$("#temp").html('<a class="no-line animated fadeIn" title="Swap Units" href="javascript:swapUnits(' + fahrenheit + "," + celsius + ",'F'" + ')">' + fahrenheit + " °" + "F" + '</a>');
			$("#weather").html("<div class='animated fadeIn'>"+weather+"</div>");
			$("#icon").html("<img class='img-responsive to-center animated fadeIn' src='"+weatherImage(weather)+"' alt="+ weather + " height=250 width=250>");
		});
	});
}

function swapUnits(f, c, currentUnit){
	if (currentUnit == "F"){
		$("#temp").html('<a class="no-line" title="Swap Units" href="javascript:swapUnits(' + f + "," + c + ", 'C'" + ')">' + c + " °C</a>");
	}else if (currentUnit == "C"){
		$("#temp").html('<a class="no-line" title="Swap Units" href="javascript:swapUnits(' + f + "," + c + ", 'F'" + ')">' + f + " °F</a>");
	}
}