const searchField = document.querySelector(".searchField");
const searchForm = document.querySelector(".search-form");
const time_field = document.querySelector('.datetime');
const location_field = document.querySelector('.location');
const feelsLike_Field = document.querySelector('#feelsLike');
const temp_area = document.querySelector(".temp");
const humidity_field = document.querySelector('#humidity');
const wind_field = document.querySelector('#wind');
const visibility_field = document.querySelector('#visibility');
const uv_field = document.querySelector('#uv_index');
const pressure_field = document.querySelector('#pressure');
const condition_field = document.querySelector('.condition');
const icon_field = document.querySelector('.weather-icon img');

let target = "Mumbai";

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  target = searchField.value;
  console.log(target);
  fetchData(target);
});

async function fetchData(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=60a2644b575445d9b7f61215261901&q=${location}&aqi=yes`;
  try {
    // we need to make a call to the api
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    let temp = data.current.temp_c;
    let location = data.location.name;
    let feelsLike = data.current.feelslike_c;
    let humidity = data.current.humidity;
    let wind = data.current.wind_kph;
    let visibility = data.current.vis_km;
    let uv = data.current.uv;
    let pressure = data.current.pressure_mb;
    let condition = data.current.condition.text; 
    let icon = data.current.condition.icon;

    updateData(temp , location , feelsLike, humidity, wind, visibility, uv, pressure, condition, icon)

  } catch (error) {
    console.log(error);
  }
}

function updateData(temp , location , feelsLike, humidity, wind, visibility, uv, pressure, condition, icon){
    temp_area.innerText = `${temp}°`
    location_field.innerText = location
    feelsLike_Field.innerText = `${feelsLike}°`
    humidity_field.innerText = `${humidity}%` 
    wind_field.innerText = `${wind} km/h`
    visibility_field.innerText = `${visibility} km`
    uv_field.innerText = uv
    pressure_field.innerText = `${pressure} hPa`;
    condition_field.innerText = condition; 
    icon_field.src = icon;
}

fetchData(target);

function updateClock() {
  const now = new Date();

  const options = {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  let timeString = now.toLocaleString('en-US', options);
  
  timeString = timeString.replace(/, ([0-9]+:)/, " • $1");
  
  time_field.innerText = timeString;
}

updateClock();
setInterval(updateClock, 1000);