// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level (to view the center of US by default):
    // This is just a gray object on html, it's blank, nothing show up yet. L stands for Leaflet
let map = L.map('mapid').setView([34.0522, -118.2437], 14); // [lat,long] and zoom level (scale 0-18)

    /* another alternative way:
    let map = L.map("mapid", {
        center: [
        40.7, -94.5
        ],
        zoom: 4
    });
    */

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
L.circleMarker([34.0522, -118.2437], {
    radius: 300, //100 meter radius
    color: 'black',
    fillColor: '#ffffa1'
 }).addTo(map);

// We create the tile layer from Mapbox that will be the background of our map.
    // Copy an API styles from Mapbox Glossary and put it into the tilelayer()
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

