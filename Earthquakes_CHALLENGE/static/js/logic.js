// Add console.log to check to see if our code is working.
console.log("working");


// We create the tile layer from Mapbox that will be the background of our map.
    // different mapbox styles: https://docs.mapbox.com/api/maps/#static-tiles
    let streetStyle = 'streets-v11'
    let darkStyle = 'dark-v10'
    let outdoorStyle = 'outdoors-v11'
    let lightStyle = 'light-v10'
    let satelliteStyle = 'satellite-streets-v11'
        
        // Copy an API styles from Mapbox Glossary and put it into the tilelayer()
    let styles1 = L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/${streetStyle}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {        
            attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            accessToken: API_KEY
    });
    
    let styles2 = L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/${satelliteStyle}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {        
            attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            accessToken: API_KEY
    });

    let styles3 = L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/${lightStyle}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {        
            attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            accessToken: API_KEY
    });
    
    // Create a base layer that holds both maps.
    let baseMaps = {
        Streets: styles1,
        Satellite: styles2,
        Light: styles3
      };

    // Create the earthquake and tectonic layers for our map.
    let earthquakes = new L.layerGroup();
    let tectonic = new L.layerGroup();

    // We define an object that contains the overlays.
    // This overlay will be visible all the time.
    let overlays = {
        Earthquakes: earthquakes,
        'Tectonic Plates': tectonic
    };


// Create the map object with a center and zoom level (to view the center of US by default):
    // This is just a gray object on html, it's blank, nothing show up yet. L stands for Leaflet
    let map = L.map('mapid', {
        center: [39.5, -98.5],
        zoom: 3,
        layers: [styles1]
    }) // [lat,long] and zoom level (scale 0-18)

    // Pass our map layers into our layers control and add the layers control to the map. (allow end-user to select the map style and layers)
    L.control.layers(baseMaps,overlays).addTo(map);

    // Retrieve the earthquake GeoJSON data.
    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
        // Creating a GeoJSON layer with the retrieved data.
        L.geoJson(data, {
                // We turn each feature into a circleMarker on the map.            
                pointToLayer: function(feature, latlng) {
                            console.log(data);
                            return L.circleMarker(latlng);
                                },
                // We set the style for each circleMarker using our styleInfo function.
                style: styleInfo,
                // We create a popup for each circleMarker to display the magnitude and
                // location of the earthquake after the marker has been created and styled.
                onEachFeature: function(feature, layer) {
                            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
                            }
            }).addTo(earthquakes);
            
            // Then we add the earthquakes layer to our map:
            earthquakes.addTo(map);
            
            // Create a legend control object.
            let legend = L.control({position: 'bottomright'});
            // Then add all the details for the legend.
            legend.onAdd = function () {
                let div = L.DomUtil.create('div', 'info legend');
            
                const magnitudes = [0, 1, 2, 3, 4, 5];
                const colors = [
                  "#98ee00",
                  "#d4ee00",
                  "#eecc00",
                  "#ee9c00",
                  "#ea822c",
                  "#ea2c2c"
                    ];
                    
                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < magnitudes.length; i++) {
                    console.log(colors[i]);
                    div.innerHTML +=
                        '<i style="background:' + colors[i] + '"></i> ' +
                        magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
                }

                return div;
            };
            legend.addTo(map);
        });
    
    // This function returns the style data for each of the earthquakes we plot on
    // the map. We pass the magnitude of the earthquake into a function
    // to calculate the radius.
    function styleInfo(feature) {
        return {
                opacity: 1,
                fillOpacity: 1,
                fillColor: getColor(feature.properties.mag),
                color: "#000000",
                radius: getRadius(feature.properties.mag),
                stroke: true,
                weight: 0.5
                };
    };    
    
    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
        return 1;
        }
        return magnitude * 4;
    };

    // This function determines the color of the circle based on the magnitude of the earthquake.
    function getColor(magnitude) {
        if (magnitude > 5) {
        return "#ea2c2c";
        }
        if (magnitude > 4) {
        return "#ea822c";
        }
        if (magnitude > 3) {
        return "#ee9c00";
        }
        if (magnitude > 2) {
        return "#eecc00";
        }
        if (magnitude > 1) {
        return "#d4ee00";
        }
        return "#98ee00";
    };

// CHALLENGE:

// Create a style for the lines strings.
let myStyle = {
    color: '#ff8c00', //color for the lines
    weight: 2, //line weight
    };

// Retrieve the tectonic plates GeoJSON data.    
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {        
        // Creating a GeoJSON layer with the retrieved data.
        L.geoJson(data, {            
            style: myStyle,
            // We create a popup for each circleMarker to display the magnitude and
            // location of the earthquake after the marker has been created and styled.
            onEachFeature: function(feature, layer) {
                        }
        }).addTo(tectonic);
        
        // Then we add the tectonic layer to our map:
        tectonic.addTo(map);
});