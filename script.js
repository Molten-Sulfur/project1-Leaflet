// Initialize my own map
var map = L.map('washMap').setView([38.083, -90.69], 14);

// Initialize the basemap
var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(map);

// A style for the trails
var trailStyle = {
    "color": "#840000",
    "weight": 3,
    "opacity": 0.6
};

// Add the trails to the map
jQuery.getJSON("https://raw.githubusercontent.com/Molten-Sulfur/project1-Leaflet/main/WASH.geojson",function(data){
    L.geoJson(data, {
    style: trailStyle
}).addTo(map);
  });

// Add the petroglyphs to the map
// It's easier just to make separate geoJSONs for petroglyphs and overlooks
//than doing one layer and assigning different symbology.
jQuery.getJSON("https://raw.githubusercontent.com/Molten-Sulfur/project1-Leaflet/main/WASH-petroglyph.geojson",function(data) {
  //define the logo for petroglyphs
  var petroglyphIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/Molten-Sulfur/project1-Leaflet/main/petroglyph.png',
    iconSize: [42,25]
  });
  L.geoJson(data,{
    pointToLayer: function(feature,latlng){
	  return L.marker(latlng,{icon: petroglyphIcon});
    }
  }  ).addTo(map);
});

//Add the overlooks to the map
jQuery.getJSON("https://raw.githubusercontent.com/Molten-Sulfur/project1-Leaflet/main/WASH-overlooks.geojson",function(data) {
  //define the logo for overlooks
  var overlookIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/Molten-Sulfur/project1-Leaflet/main/lookout.png',
    iconSize: [30,30]
  });
  L.geoJson(data,{
    pointToLayer: function(feature,latlng){
	  return L.marker(latlng,{icon: overlookIcon});
    }
  }  ).addTo(map);
});
