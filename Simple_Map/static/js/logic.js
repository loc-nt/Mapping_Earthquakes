// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level (to view the center of US by default):
    // This is just an object on html, it's blank, nothing show up yet. L stands for Leaflet
let map = L.map('mapid').setView([40.7, -94.5], 4); // [lat,long] and zoom level (scale 0-18)

    /* another alternative way:
    let map = L.map("mapid", {
        center: [
        40.7, -94.5
        ],
        zoom: 4
    });
    */

// We create the tile layer from Mapbox that will be the background of our map.
    // Copy an API styles from Mapbox Glossary and put it into the tilelayer()
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);