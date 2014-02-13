// ------------------------------
//       Map Initialization
// ------------------------------

var map;
		
	function initmap() {
		
		map = new L.Map('map');
		
		//the original osm 'standard' style (most updated, with untag buildings)
		//L.TileLayer.MapBox.Light({minZoom: 10, maxZoom: 16});
		var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			osmAttrib='Map data &copy; OpenStreetMap contributors';
		var osm = new L.TileLayer(osmUrl, {minZoom: 5, maxZoom: 20, attribution: osmAttrib});
		
		var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/d4f57307605347aeb36aecf0f44dde8a/{styleId}/256/{z}/{x}/{y}.png',
			cloudmadeAttribution = 'Peta &copy; 2011 Kontributor OSM, Provider &copy; 2011 CloudMade';
		
		//basemaps
		var tourist   	=  L.tileLayer(cloudmadeUrl, {styleId: 7, attribution: cloudmadeAttribution}),
			midnight  	= L.tileLayer(cloudmadeUrl, {styleId: 999, attribution: cloudmadeAttribution});
			

		//markers
		lestari = L.marker([-5.13955, 119.44492]);
		rumah = L.marker([-5.14100, 119.50821]).bindPopup("<b>Akad Nikah</b><br>Rumah Mempelai Wanita");
		bandara = L.marker([-5.07656,119.54865]).bindPopup("<b>Bandara Sultan Hassanuddin</b>");
		
		//This one is to fix some bug that make image unfit leaflet's pop-up.
		var divNode = document.createElement('DIV');
		divNode.innerHTML = '<b>Walimatul \'Urs</b><br>Gedung Lestari 45</br> <img src="/img/gdg.jpg"/>';
		lestari.bindPopup(divNode);
		
		titik = new L.featureGroup([lestari, rumah, bandara]).addTo(map);
		
		//buat control
		var baseMaps = {
			"Standard": osm,
			"Tourist": tourist,
			"Night": midnight
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
	
	
	//$('#viewAkad').click(function() {
	//	map.setView(rumah.getLatLng(),10);
	//});
	
	
	/*
	// routing function
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
			weight: 3,
			opacity: 0.5,
			smoothFactor: 1
		}).addTo(map);
		route.bringToFront();
	}
	
	
	
	fromMarker = lestari;
	toMarker= rumah;
	alert(toMarker.getLatLng().lng);
	addScript('http://routes.cloudmade.com/d4f57307605347aeb36aecf0f44dde8a/api/0.3/' + fromMarker.getLatLng().lat + ',' + fromMarker.getLatLng().lng + ',' + toMarker.getLatLng().lat + ',' + toMarker.getLatLng().lng + '/car.js?callback=getRoute'); */
	
	}


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

	
	
// ------------------------------
//        Buku Tamu
// ------------------------------
	
jQuery(document).on('ready', function() {
		//alert('dipanggil');
		jQuery('#bukuTamuForm').bind('submit', function(event){
			event.preventDefault();
			var form = this;
			json = ConvertFormToJSON(form);
			//var tbody = jQuery('#isiBuku > tbody');
			//tbody.append('<h2> ditambah lo</h2>');
			$( ".panel-body" ).prepend( "<h4>"+ this['inputNama'].value+"</h4>" );
			
			return false;
			
		});
	});
	
function ConvertFormToJSON(form){
	var array = jQuery(form).serializeArray();
	var json = {};

	jQuery.each(array, function() {
		json[this.name] = this.value || '';
	});

	return json;
}		
	
