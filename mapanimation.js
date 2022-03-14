const weatherArray = [];

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvbnN1YXJlejEwIiwiYSI6ImNsMG4wajNkMTEwNWEzY28zMnNzZGtyamIifQ.fegQJGn9sTp4fAdo7NTBZw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.091542, 42.358862 ],
    zoom: 12
});

var marker = new mapboxgl.Marker()
.setLngLat([-71.091542, 42.358862 ])
.addTo(map);

const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

var counter = 0;

function move() {
  setTimeout(() => {
    if (counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++;
    move();
  }, 1000);
}

//'mapbox://styles/mapbox/dark-v10'

// Fetch weather data


// async function fetchWeatherData () {
//   const url = 'https://api.openweathermap.org/data/2.5/weather?lat=39.1031&lon=-84.5120&appid=89e5d770eac3d99dee8786f4791aa5fb';
//   const response = await fetch(url);
//   const data = await response.text();
//   const obj = JSON.parse(data);
//   weatherArray.push(obj);
// }
// console.log(weatherArray);

fetchWeatherData()