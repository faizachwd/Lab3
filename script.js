mapboxgl.accessToken = "pk.eyJ1IjoiZmFpemExMzIiLCJhIjoiY201d3E1Y2JwMDByYzJrb290MWltMTN1dyJ9.JsEiKVuT3vMCT8JQDlDA4g";

// intializing instance of map object
const map = new mapboxgl.Map({
    container: "my-map",
    style: 'mapbox://styles/faiza132/cm72f283a007a01quayc2g04v', // basemap, monochrome style to make data points pop
    center: [-79.3878583, 43.7205208], //Toronto's centre lat and lon
    zoom: 10.5
});

map.addControl(new mapboxgl.NavigationControl());

// // Add data source and draw initial visiualization of layer
map.on('load', () => {
    map.addSource('fire-incident-data', {
        'type': 'vector',
        'url': "mapbox://faiza132.akmo1cn8"
    });
    //Layer with symbology
    map.addLayer({
        'id': 'fire-points',
        'type': 'circle',
        'source': 'fire-incident-data',
        'minzoom': 0,
        'maxzoom': 24,
        'paint': {
            'circle-color': [
                'step',
                ['get', 'Event_Alarm_Level'], // GET expression retrieves property value from 'capacity' data field
                '#ffe74d', // Colour assigned to any values < first step
                2, "#f77f00",
                3, '#fc7091',
                4, '#d62828',
                5, '#7c3f81',
                6, '#004468'
            ],
            'circle-opacity': 0.9,
            'circle-stroke-color': 'black',
            'circle-radius': 6
        },
        'source-layer': "fire_2014-3rmicb"

    });
});

// Popup on hover
//declaring popup outside of mouseenter so that i can remove it using mouseleave
let popup = new mapboxgl.Popup()


map.on('mouseenter', 'fire-points', (e) => {
    //pointer so users know which point they are hovering over because many of them overlap
    map.getCanvas().style.cursor = 'pointer';
    popup
        .setLngLat(e.lngLat)
        .setHTML("<b>Fire Incident:</b><br>" +
            "Persons Rescued: " + e.features[0].properties.Persons_Rescued)
                .addTo(map);
});

//popup remove
map.on('mouseleave', 'fire-points', () => {
    popup.remove();
});

// Method that changes visualization of a layer based on an event: upon clicking a point it hides all other points that do not have the same event alarm level
map.on('click', 'fire-points', (e) => {
    if (e.features.length > 0) {
        // in the second argument the setFilter function will filter out for all points that have the same alert level as the clicked on point
        map.setFilter('fire-points', ['==', ['get', 'Event_Alarm_Level'], e.features[0].properties.Event_Alarm_Level]);

    }
});

// undo's the fitler of points
document.getElementById('reset-btn').addEventListener('click', () => {
    // second arugment of setFilter takes a filer, and since i want all filters removed its set to null
    map.setFilter('fire-points', null);
});

