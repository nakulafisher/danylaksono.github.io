L.TileLayer.Common = L.TileLayer.extend({
	initialize: function (options) {
		L.TileLayer.prototype.initialize.call(this, this.url, options);
	}
});

var coordsCNTG = {lat : 42.86291, lon:-8.554634};

function initMap() {

	map = new L.Map('map');

	var mqTilesAttr = 'Tiles &copy; <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" />';
	
	L.TileLayer.MapQuestOpen = L.TileLayer.Common.extend({
		url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.png',
		options: {
			subdomains: '1234',
			type: 'osm',
			attribution: 'Map data, ' + mqTilesAttr,
			minZoom: 2, 
			maxZoom: 16
		}
	});
	
	var myIcon = L.icon({
		 iconUrl: 'img/cntg_logo.png',
		 iconSize: [218, 50],
		 className : 'img-rounded'
	});
	
	map.setView(new L.LatLng(coordsCNTG.lat, coordsCNTG.lon),15);
	map.addLayer(new L.TileLayer.MapQuestOpen());
	
	var markerCNTG = new L.marker([coordsCNTG.lat, coordsCNTG.lon], 
		{
			icon: myIcon,
			clickable : true,
		});
		
	markerCNTG.addTo(map);
}
