var myAJAX3 = function (){
	$.get (
		"http://api.open-notify.org/iss-now.json",
		function(longitude) {
			var elem = document.getElementById('longitude')
			elem.innerHTML = longitude.iss_position.longitude;
		}
	);
};
myAJAX3();
setInterval(myAJAX3, 5000);

var myAJAX4 = function (){
	$.get (
		"http://api.open-notify.org/iss-now.json",
		function(latitude) {
			var elem = document.getElementById('latitude')
			elem.innerHTML = latitude.iss_position.latitude;
		}
	);
};
myAJAX4();
setInterval(myAJAX4, 5000);

// ================================================ЧАСЫ================================
var clock = document.getElementById('clock');
function timehours(){
	var t = new Date();
	var h = t.getUTCHours().toString();
	var m = t.getUTCMinutes().toString();
	var s = t.getUTCSeconds().toString();
	if (h.length < 2) {
		h = '0' + h;
	}
	if (m.length < 2) {
		m = '0' + m;
	}
	if (s.length < 2) {
		s = '0' + s;
	};

	var time = h + ':' + m + ':' + s;
	clock.innerHTML = time;
};
timehours();
setInterval(timehours, 1000);

// ==================================================ДАТА==============================


	var currentdate = document.getElementById('dat');

	var t2 = new Date();
	var dw = t2.getUTCDay();
	var dm = t2.getUTCDate();
	var y = t2.getUTCFullYear();
	var m = t2.getUTCMonth();
	
	
	if (m === 0) {
		m = 'Jan';
	} 
	else if (m === 1) {
		m = 'Feb';
	} 
	else if (m === 2) {
		m = 'Mar';
	} 
	else if (m === 3) {
		m = 'Apr';
	} 
	else if (m === 4) {
		m = 'May';
	} 
	else if (m === 5) {
		m = 'Jun';
	} 
	else if (m === 6) {
		m = 'Jul';
	} 
	else if (m === 7) {
		m = 'Aug';
	} 
	else if (m === 8) {
		m = 'Sep';
	} 
	else if (m === 9) {
		m = 'Oct';
	} 
	else if (m === 10) {
		m = 'Nov';
	} 
	else if (m === 11) {
		m = 'Dec';
	};

	if (dw === 1) {
		dw = 'Monday';
	}
	else if (dw === 2) {
		dw = 'Tuesday';
	}
	else if (dw === 3) {
		dw = 'Wednesday';
	}
	else if (dw === 4) {
		dw = 'Thursday';
	}
	else if (dw === 5) {
		dw = 'Friday';
	}
	else if (dw === 6) {
		dw = 'Saturday';
	}
	else if (dw === 7) {
		dw = 'Sunday';
	}

	var curdate = dw + ', ' + dm + ' ' + m + ' ' + y ;
	currentdate.textContent = curdate;

// ============================================ЛЮДИ НА МКС==================================


function myAJAX5(){
	$.get (
		"http://api.open-notify.org/astros.json",
		function(ludi) {
			for (i=0; i < ludi.people.length; i++){
				if(ludi.people[i].craft === 'ISS'){
					var elem1 = document.getElementById('human1');
					elem1.innerHTML = ludi.people[i++].name;
					var elem1 = document.getElementById('human2');
					elem1.innerHTML = ludi.people[i++].name;
					var elem1 = document.getElementById('human3');
					elem1.innerHTML = ludi.people[i++].name;
					var elem1 = document.getElementById('human4');
					elem1.innerHTML = ludi.people[i++].name;
					var elem1 = document.getElementById('human5');
					elem1.innerHTML = ludi.people[i++].name;
					var elem1 = document.getElementById('human6');
					elem1.innerHTML = ludi.people[i++].name;
				} else {
					console.log('1');
				}
				var amount = document.getElementById('amountnumb');
				amount.innerHTML = ludi.people.length + ' ' + 'people on ISS';
			}
		}
	);
};
myAJAX5();
setInterval(myAJAX5, 5000);

// =============================================КАРТА============================================

function initMap(){
	$.get(
		"http://api.open-notify.org/iss-now.json",
		function (coord) {
			var coordlat = coord.iss_position.latitude;
			var coordlon = coord.iss_position.longitude;
		    var position = new google.maps.LatLng(coordlat, coordlon);
		    var map = new google.maps.Map(document.getElementById('map'), {
		      zoom: 4,
		      center: position
		    });
		    function markercoord(){
		    	$.get(
		    		"http://api.open-notify.org/iss-now.json",
		    		function(markercoord){
		    			var coordlat = markercoord.iss_position.latitude;
						var coordlon = markercoord.iss_position.longitude;
		    			var position = new google.maps.LatLng(coordlat, coordlon);
				    	var marker = new google.maps.Marker({
				      		position: position,
				      		map: map				      		
				    	});
				    	map.setCenter(position);
				    	google.maps.event.addListener(map, 'center_changed', function(event) {
					        
					           if (marker !== map.center) {
					                marker.setMap(null);
					    		}
							
						});
				    }	
				); 
			};
			markercoord();
			setInterval(markercoord, 5000);
		}
	);
};
initMap();

