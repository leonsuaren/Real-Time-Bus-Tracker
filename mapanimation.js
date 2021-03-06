var marker;

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvbnN1YXJlejEwIiwiYSI6ImNsMG4wajNkMTEwNWEzY28zMnNzZGtyamIifQ.fegQJGn9sTp4fAdo7NTBZw';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-118.183883, 33.955836],
  zoom: 10
});

function showMarker() {
  marker = new mapboxgl.Marker()
    .setLngLat([-118.183883, 33.955836])
    .addTo(map);
}

map.on('load', () => {
  map.addSource('route', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [-118.187199, 33.921381],
          [-118.183883, 33.955836],
          [-118.182576, 33.933707],
          [-118.190169, 33.914194],
          [-118.193283, 33.906704],
          [-118.185732, 33.925698],
          [-118.191828, 33.910166],
          [-118.184687, 33.958259],
          [-118.186841, 33.965883],
          [-118.188167, 33.919017],
        ]
      }
    }
  });
  map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': 'blue',
      'line-width': 8
    }
  });
});

const busStops = [
  [-118.187199, 33.921381],
  [-118.183883, 33.955836],
  [-118.182576, 33.933707],
  [-118.190169, 33.914194],
  [-118.193283, 33.906704],
  [-118.185732, 33.925698],
  [-118.191828, 33.910166],
  [-118.184687, 33.958259],
  [-118.186841, 33.965883],
  [-118.188167, 33.919017],
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

// Add the control to the map.
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

//'mapbox://styles/mapbox/dark-v10'

//========Weather API Begin==========//
function sucessHandler(data) {
  const dataObj = data;
  console.log(data)
  const weatherDiv = document.getElementById('temp');
  const weatherFragment = `
    <h5 class='weather-title'>Weather</h5>
    <hr class='division'/>
    <h5>${dataObj.name}</h5>
    <div class='center-img'>
    <img 
      src="http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png"
      alt="${dataObj.weather[0].description}"
    />
    </div>
    <p>
    <span class="tempF">${tempToF(dataObj.main.temp)}&deg;</span> | 
    ${dataObj.weather[0].description}
  </p>
  `;
  weatherDiv.innerHTML = weatherFragment;
}

function tempToF(kelvin) {
  return ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
}
// Fetch weather data
async function fetchWeatherData() {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=los+angeles&appid=89e5d770eac3d99dee8786f4791aa5fb';
  const response = await fetch(url);
  const data = await response.text();
  const obj = JSON.parse(data);
  sucessHandler(obj)
}

//===========Weather End========//
//===========Knews API begin========//

function knewsSuccessHandler(data) {
  const knewsObj = data.results;
  let counter = 0;
  setInterval(() => {
    if (counter <= knewsObj.length) {
      counter++;
      let img = ''
      if (knewsObj[counter].image_url === null) {
        img = 'coming-soon.jpeg'
      } else {
        img = knewsObj[counter].image_url
      }
  
      const knewsOneDiv = document.getElementById('knewsOne');
      const knewsOneFragment = `
      <a href='${knewsObj[counter].link}' class='link-to' target="_blank">
      <figure class='card'>
      <img src='${img}'/>
      <figcaption class='caption'>
      <span class='caption-title'>${(knewsObj[counter].title).slice(0, 20)}</span>
      </figcaption>
      </figure>
      </a>
      `
      knewsOneDiv.innerHTML = knewsOneFragment;
    }
  }, 5000);
  counter = 0;
  knewsSuccessHandler();
}

async function fetchKnewsData() {
  const url = 'https://newsdata.io/api/1/news?apikey=pub_5471c2f13f0b107554e22983dc66674168b5&country=us&language=en';
  const response = await fetch(url);
  const data = await response.text();
  const obj = JSON.parse(data);
  knewsSuccessHandler(obj);
};
fetchKnewsData();

fetchWeatherData();
sucessHandler();