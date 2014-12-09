      var map, latLng, marker, infoWindow, ad;

      function initialize() {

        var myOptions = {
          zoom: 14,
          panControl: false, 
          streetViewControl: false, 
          scaleControl: false,
          scaleControlOptions: {position: google.maps.ControlPosition.BOTTOM_RIGHT},
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('googlemaps'), myOptions); 

	if (geoPosition.init()) {
            console.log(locationFound);
	    geoPosition.getCurrentPosition(locationFound, defaultLocation, {enableHighAccuracy:true});
        }
        else {
	    defaultLocation();
        }
      }

      function defaultLocation() {
        showMap(38.8977, -77.0366);
      }

      function showMap(lat, lng) {

        latLng = new google.maps.LatLng(lat, lng);

        var adUnitDiv = document.createElement('div');

	var adWidth = window.innerWidth || document.documentElement.clientWidth;

	if ( adWidth >= 728 ) 
	  adFormat = google.maps.adsense.AdFormat.LEADERBOARD;
	else if ( adWidth >= 300 ) 
          adFormat = google.maps.adsense.AdFormat.SMALL_SQUARE; 
        else
          adFormat = google.maps.adsense.AdFormat.X_LARGE_VERTICAL_LINK_UNIT;      

        var adUnitOptions = {
          format: adFormat,
          position: google.maps.ControlPosition.BOTTOM,
          map: map,
          visible: false,
          publisherId: 'ca-pub-9238225005366006'
        }

//        ad = new google.maps.adsense.AdUnit(adUnitDiv, adUnitOptions);

        map.setCenter(latLng);

        marker = new google.maps.Marker({
           position: latLng, map: map, draggable: false, animation: google.maps.Animation.DROP
        });

        infoWindow = new google.maps.InfoWindow({
           content: '<div id="iw"><strong>Latitude ::</strong> ' + marker.getPosition().lat() + '<br/><strong>Longitude::</strong> ' + marker.getPosition().lng() + '</div>'
        });
	console.log(marker.getPosition().lat() + ',' + marker.getPosition().lng());
	//$.post('/email.cgi', {lat: marker.getPosition().lat(), lng: marker.getPosition().lng()});

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

