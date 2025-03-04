mapboxgl.accessToken = "pk.eyJ1IjoiZmFpemExMzIiLCJhIjoiY201d3E1Y2JwMDByYzJrb290MWltMTN1dyJ9.JsEiKVuT3vMCT8JQDlDA4g";

// intializing instance of map object
const map = new mapboxgl.Map({
    container: "my-map",
    style: 'mapbox://styles/faiza132/cm72f283a007a01quayc2g04v', // basemap, monochrome style to make data points pop
    center: [-79.3878583, 43.7205208], //Toronto's centre lat and lon
    zoom: 12
});

// /*--------------------------------------------------------------------
// ADD DATA AS CHOROPLETH MAP ON MAP LOAD
// Use get expression to categorise data based on population values
// Same colours and threshold values are used in hardcoded legend
// --------------------------------------------------------------------*/
// // Add data source and draw initial visiualization of layer
map.on('load', () => {
    map.addSource('fire-incident-data', {
        'type': 'vector',
        'url': "mapbox://faiza132.at4sfay1"
    });
    map.addLayer({
        'id': 'fire-points',
        'type': 'circle',
        'source': 'fire-incident-data',
        'paint': {
            'circle-color': [
                'step',
                ['get', 'Event_Alarm_Level'], // GET expression retrieves property value from 'capacity' data field
                '#FFD407', // Colour assigned to any values < first step
                1, '#FFB536', // Colours assigned to values >= each step
                2, '#FC9841',
                3, '#F06832',
                4, '#E23D28',
                5, '#CE2029',
                6, '#9F191F'
            ],
            'circle-opacity': 0.5,
            'circle-stroke-color': 'black'
        },
        'source-layer': "Basic_incidents_details_2014_-clr2re"
    });
});
