mapboxgl.accessToken = 'pk.eyJ1IjoibGVvbnN1YXJlejEwIiwiYSI6ImNsMG4wajNkMTEwNWEzY28zMnNzZGtyamIifQ.fegQJGn9sTp4fAdo7NTBZw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-84.5120, 39.1031 ],
    zoom: 10
});

var marker = new mapboxgl.Marker()
.setLngLat([-84.5120, 39.1031 ])
.addTo(map)

//'mapbox://styles/mapbox/dark-v10'