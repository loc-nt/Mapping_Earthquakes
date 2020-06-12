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
    
    // Create a base layer that holds both maps.
    let baseMaps = {
        Street: styles1,
        Satellite: styles2
      };


// Create the map object with a center and zoom level (to view the center of US by default):
    // This is just a gray object on html, it's blank, nothing show up yet. L stands for Leaflet
    let map = L.map('mapid', {
        center: [43.7, -79.3],
        zoom: 11,
        layers: [styles1]
    }) // [lat,long] and zoom level (scale 0-18)

    // Pass our map layers into our layers control and add the layers control to the map. (allo end-user to select the map style)
    L.control.layers(baseMaps).addTo(map);
    
    // Accessing the airport GeoJSON URL
    let airportData = "https://raw.githubusercontent.com/loc-nt/Mapping_Earthquakes/master/majorAirports.json";    

    // Accessing the Toronto airline routes GeoJSON URL.
    let torontoData = "https://raw.githubusercontent.com/loc-nt/Mapping_Earthquakes/master/torontoRoutes.json";

    // Accessing the Toronto neighborhoods GeoJSON URL.
    let torontoHoods = "https://raw.githubusercontent.com/loc-nt/Mapping_Earthquakes/master/torontoNeighborhoods.json";

    // Create a style for the lines.
    let myStyle = {
        color: 'blue', //color for the lines
        weight: 1, //line weight
        fillColor: 'yellow'
        }

    // Grabbing our GeoJSON data.
    d3.json(torontoHoods).then(function(data) {
        console.log(data);
        // Creating a GeoJSON layer with the retrieved data.
        L.geoJson(data, {
            style: myStyle,
            onEachFeature: function(feature, layer) {
                            layer.bindPopup(`<h3>Neighborhood: ${feature.properties.AREA_NAME}</h3>`); // another dot notation to add popup together with the marker
                            }
                        }        
            )    
         .addTo(map);
    });



// Grabbing our GeoJSON data and add a single point.
    // L.geoJSON(sanFranAirport).addTo(map);

// Grabbing our GeoJSON data and add a single point plus popup marker:
    // Option 1: using pointToLayer
    // L.geoJson(sanFranAirport, {
    //     // We turn each feature from the GeoJSON sanFranAirport into a marker on the map. Note how different to use pointToLayer callback function from leaflet!
    //     pointToLayer: function(feature, latlng) {
    //         console.log(feature);
    //         console.log(latlng);
    //         return L.marker(latlng) //add marker
    //                 .bindPopup(`<h2>${feature.properties.name}</h2> <hr> <h3>${feature.properties.city}, ${feature.properties.country}</h3>`); // another dot notation to add popup together with the marker
    //         }
    // }
    // ).addTo(map);

    // Option 2: using onEachFeature 
    // L.geoJson(sanFranAirport, {
    //     // We turn each feature from the GeoJSON sanFranAirport into a marker on the map. Note how different to use pointToLayer callback function from leaflet
    //     onEachFeature: function(feature, layer) {
    //         console.log(layer);            
    //         layer.bindPopup(`<h3>Airport Code: ${feature.properties.faa}</h3> <hr> <h3>Airport Name: ${feature.properties.name}</h3>`); // another dot notation to add popup together with the marker
    //         }
    //   }
    // ).addTo(map);

// get the line between 2 points (this eg is SFO, LAX, SLC, SEA):
    // let line = [
    //     [33.9416, -118.4085],
    //     [37.6213, -122.3790],
    //     [40.7899, -111.9791],
    //     [47.4502, -122.3088]
    //   ];
// Create a polyline using the line coordinates and make the line red.
    // L.polyline(line, {
    //     color: "blue",
    //     opacity: 0.5,
    //     weight: 4,
    //     dashArray: '20, 20', dashOffset: '0' //dashed line    

    //   }).addTo(map);

    // Get data from cities.js
    // let cityData = cities;

// Loop through the cities array and create one marker for each city + radisu as population + popups
    // cityData.forEach((city) => {
    //     console.log(city)
    //     L.circleMarker( city.location, 
    //                     {radius: city.population/200000,
    //                      color: 'orange',
    //                      fillColor: 'orange',
    //                      lineWeight: 4} )
    //         .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>") //toLocaleString() is to format the population number
    //         .addTo(map);
    //    });

// Practice adding marker:
//  Add a marker to the map for Los Angeles, California.
    // let marker = L.marker([34.0522, -118.2437]).addTo(map);
// Add circle marker to the map instead:
    // L.circle([34.0522, -118.2437], {
    //     radius: 300, //100 meter radius
    //     color: 'black',
    //     fillColor: '#ffffa1'
    //  }).addTo(map);

// Also circle, but the radius is in pixel instead of meter:
    // L.circleMarker([34.0522, -118.2437], {
    //     radius: 300, //100 meter radius
    //     color: 'black',
    //     fillColor: '#ffffa1'
    //  }).addTo(map);
