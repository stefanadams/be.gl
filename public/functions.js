var map, latLng, marker, infoWindow;

function initialize() {
  map = new google.maps.Map(document.getElementById('googlemaps'), {
    zoom: 14,
    panControl: false, 
    streetViewControl: false, 
    scaleControl: false,
    scaleControlOptions: {position: google.maps.ControlPosition.BOTTOM_RIGHT},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }); 

	if (geoPosition.init()) {
	   geoPosition.getCurrentPosition(gmap, null, {enableHighAccuracy:true});
  }
}

function gmap(position) {
  var lat = position.coords.latitude.toFixed(5);
  var lng = position.coords.longitude.toFixed(5);
  $('#map').attr('href', "https://www.google.com/maps/place/"+lat+","+lng+"/\@"+lat+","+lng+",15z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0").html(lat + ', ' + lng);
  showMap(lat, lng);
}
      
function showMap(lat, lng) {
  ws.onmessage = function (event) { console.log(event.data);  };
  ws.onopen    = function (event) {
    ws.send(JSON.stringify([lat, lng]));
    setInterval(function() { ws.send(JSON.stringify([lat, lng])); }, 1*1000);
  };

  latLng = new google.maps.LatLng(lat, lng);
  map.setCenter(latLng);
  marker = new google.maps.Marker({
    position: latLng,
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP
  });

	console.log("Show Map: " + marker.getPosition().lat() + ',' + marker.getPosition().lng());

  infoWindow = new google.maps.InfoWindow({
    content: '<div id="iw"><a target="_blank" href="https://www.google.com/maps/place/'+lat+','+lng+'/\@'+lat+','+lng+',15z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0"><strong>Latitude ::</strong> ' + lat + '<br/><strong>Longitude::</strong> ' + lng + '</a></div>'
  });
  infoWindow.open(map, marker);

  google.maps.event.addListener(marker, 'dragstart', function (e) {
    infoWindow.close();
  });

  google.maps.event.addListener(marker, 'dragend', function (e) {
    var point = marker.getPosition();
    map.panTo(point);
    geocode(point);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);