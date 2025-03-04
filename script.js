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
        'type': 'geojson',
        'url': "https://github.com/faizachwd/Lab3/blob/c88931c2ef7daf6b6692d590e18a81faee94e8c8/Basic%20incidents%20details%202023%20onward%20-%204326.geojson"
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
                5, '#CE2029'
            ],
            'circle-opacity': 0.5,
            'circle-stroke-color': 'black'
        }
    });
});
