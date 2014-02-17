// ------------------------------
//       Map Initialization
// ------------------------------

var map;
		
	function initmap() {
		
		this.map = new L.Map('map', {
			minZoom: 9, 
			maxZoom: 20
		});
		
		//the original osm 'standard' style (most updated, with untag buildings)
		var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			osmAttrib='Map data &copy; OpenStreetMap contributors';
		var osm = new L.TileLayer(osmUrl, {minZoom: 5, maxZoom: 20, attribution: osmAttrib});
		
		var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/d4f57307605347aeb36aecf0f44dde8a/{styleId}/256/{z}/{x}/{y}.png',
			cloudmadeAttribution = 'Peta &copy; 2011 Kontributor OSM, Provider &copy; 2011 CloudMade';
		
		//basemaps
		var tourist   	= L.tileLayer(cloudmadeUrl, {styleId: 7, attribution: cloudmadeAttribution}),
			midnight  	= L.tileLayer(cloudmadeUrl, {styleId: 999, attribution: cloudmadeAttribution});
			calm	  	= L.tileLayer(cloudmadeUrl, {styleId: 22677, attribution: cloudmadeAttribution});
			
	
		//markers
		
		var rumahIcon = L.icon({
			iconUrl: 'img/home.png',
			iconAnchor:   [0, 0]
		});
		
		var lestariIcon = L.icon({
			iconUrl: 'img/apartment.png',
			iconAnchor:   [0, 0]
		});
		
		var bandaraIcon = L.icon({
			iconUrl: 'img/airport.png',
			iconAnchor:   [0, 0]
		});
		
		
		lestari = L.marker([-5.13955,119.44492],{icon: lestariIcon});
		bandara = L.marker([-5.07656,119.54865],{icon: bandaraIcon});
		rumah = L.marker([-5.14100,119.50821],{icon: rumahIcon}).bindPopup("<b>Akad Nikah</b><br>Rumah Mempelai Wanita");
		
		//This one is to fix some bug that make image unfit leaflet's pop-up.
		var divNodeGdg = document.createElement('DIV');
		divNodeGdg.innerHTML = '<b>Walimatul \'Urs</b><br>Gedung Lestari 45</br> <img src="/img/gdg.jpg"/>';
		lestari.bindPopup(divNodeGdg);
		
		var divNodeBndr = document.createElement('DIV');
		divNodeBndr.innerHTML = '<b>Bandara Sultan Hassanuddin</b> <img src="/img/bndr.jpg"/>';
		bandara.bindPopup(divNodeBndr);
		
		titik = new L.featureGroup([lestari, rumah, bandara]).addTo(map);
		
		//buat control
		var baseMaps = {
			"Standard": osm,
			"Tourist": tourist,
			"Night": midnight,
			"Calm": calm
		};

		var markers = {
			"Marker": titik
		};
		
		// Keep calm and draw le maps
		map.addLayer(tourist);
		map.fitBounds(titik.getBounds());
		
		latlngmap 	= map.getCenter();
		zoomap		= map.getZoom();
		
		map.setView(latlngmap, (zoomap-1)); //reset the view 
		
		L.control.layers(baseMaps, markers).addTo(map);
		
		map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);
		
		
// ------------------------------
//        Informasi
// ------------------------------
	
	
	
	
	$.getJSON("geojson/bandaraRumah.geoJSON", function (rumah) {
		L.geoJson(rumah).addTo(map);
	});
	
	
	
	var htmlLestari = [
		'<h5>Terdapat dua alternatif rute yang dapat anda gunakan untuk menuju Gedung Lestari 45 dari Bandara:</h5></br> ',
		'<label class="checkbox-inline"> <input type="checkbox" id="rute1" value="option1"> Rute 1 </label>',
		'<label class="checkbox-inline"> <input type="checkbox" id="rute2" value="option2"> Rute 2 </label>'
		].join('');
	
	
	
	
	$(document).ready(function() {
		$(lestari).click(function(){
			$("#info").fadeIn('slow').html(htmlLestari);
		});
		
		$(rumah).click(function(){
			$("#info").fadeIn('slow').html('<h5><i>Rumah Mempelai Perempuan</i></h5>');
		});
			
		$(bandara).click(function(){
			$("#info").fadeIn('slow').html('<h5><i>Bandara Sultan Hassanuddin</i></h5>'+
					'<h5> Klik pada tombol berikut untuk menampilkan informasi rute perjalanan dari dan ke Bandara Sultan Hassanuddin </h5>'+
					'<button class="btn btn-info" data-toggle="modal" data-target=".bs-example-modal-sm">Info Tiket</button>');
		});
	});

	}	
// ------------------------------
//        Routing Functions
// ------------------------------

	// for some (unknown) reasons, the cloudmade routing function on one of the location failed, so I'll just skip this one
	/*
	function addScript(url) {
		var script = document.createElement('script');
		script.type="text/javascript";
		script.src=url;
		document.getElementsByTagName('head') [0].appendChild(script);
	}

	getRoute = function(response) {
		var point, route, points = [];
		for (var i=0; i<response.route_geometry.length; i++)
		{
			point = new L.LatLng(response.route_geometry[i][0], response.route_geometry[i][1]);
			points.push(point);
		}
		route= new L.Polyline(points, {
			weight: 4,
			opacity: 0.5,
			smoothFactor: 1
		}).addTo(map);
		route.bringToFront();
	}
		
	fromMarker = bandara;
	toMarker= lestari;
	addScript('http://routes.cloudmade.com/d4f57307605347aeb36aecf0f44dde8a/api/0.3/' + fromMarker.getLatLng().lat + ',' + fromMarker.getLatLng().lng + ',' + toMarker.getLatLng().lat + ',' + toMarker.getLatLng().lng + '/car.js?callback=getRoute'); 
	*/
	
	
// ------------------------------
//       Polyline route
// ------------------------------

	//pointsRumah, pointsLestari 

	
	/*routeRumah= new L.Polyline(points, {
			color: "#ff7800",
			weight: 4,
			opacity: 0.5,
			smoothFactor: 1
		});
		
	*/

// ------------------------------
//        Animate scroll
// ------------------------------

$(document).ready(function() {
	$('.nav a').click('click', function() {
		var thehref = $(this).attr('href');
		if ( thehref == '#home' ) {
			$.scrollTo( 0, 900 );
		} else {
			$.scrollTo( thehref , 900, {offset:-45} );
		}
		return false;
	});
	
	$('body').scrollspy({'offset':50});
});


	
// ------------------------------
//        Map Functions
// ------------------------------
	
function perbesar(zoomnya) {
	 if (zoomnya == titik ) {
		map.fitBounds(zoomnya.getBounds())
	} else {
		map.setView(zoomnya.getLatLng(),18);
	}
}

	
//geolocation
function onLocationFound(e) {
	var radius = e.accuracy / 2;
	L.marker(e.latlng).addTo(map)
		.bindPopup("Anda berada pada radius " + radius + " meter di sekitar titik ini").openPopup();
	L.circle(e.latlng, radius).addTo(map);
	map.setView(e.latlng,16);
	
}

function onLocationError(e) {
	alert(e.message);
}

function locateMe(){
	map.locate({setView: true});
};


function utiket() {
  alert('poi');
  $('#myModal').modal();
}

	
	
		
		
		
		