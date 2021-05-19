let apiKey = 'fdd75beff106b9a3c8672033aa3f2045';
const weatherIcon = document.querySelector('#weather-icon');
const cityDisplay = document.querySelector('#city-display');
const container = document.querySelector('#container');
const temp = document.querySelector('#temp');
const date = document.querySelector('#date');
async function getWeatherData(location){
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    let res = await response.json();
    console.log(res);
    if (res.cod == 200){
      console.log(res);
      weather = processJSON(res);
      dataToDOM(weather, location);
      // getGif(weather.weather);
      return res;
    }
    throw new Error (res.message);
  } catch (error) {
    console.log('Error: ', error);
    alert(error);
  }
}
function processJSON(data){
  let weather = data.weather[0].description;
  changeBackground(weather);
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const weatherObject = {
    weather: weather,
    temp: data.main.temp,
    toDisplay: {
      'feels like': data.main.feels_like + '\u00B0',
      'wind speed': data.wind.speed + 'm/s',
      'humidity': data.main.humidity + '%'

    }
  };
  return weatherObject;
}
function changeBackground(weather){
  let result;
  switch (weather) {
    case 'clear sky':
      result = 'clear-sky';
      break;
    case 'rain':
      result = 'little-rain';
      break;
    case 'shower rain':
    case 'thunderstorm':
      result = 'heavy-rain';
      break;
    case 'snow':
      result = 'snow';
      break;
    default:
      result = 'cloudy';
  }
  container.style['background-image'] = `url('assets/${result}.jpg')`
}
function dataToDOM(dataObject, location = 'Moscow'){
  const list = document.querySelector('ul');
  while (list.firstChild){
    list.removeChild(list.firstChild);
  }
  const date1 = new Date();
  date.textContent = ' ' + date1.getDate() + '.' + date1.getMonth() + '.' + date1.getFullYear();
  cityDisplay.textContent = location;
  temp.textContent = `${dataObject.temp}\u00B0`;
  for (let i in dataObject.toDisplay){
    const li = document.createElement('li');
    li.textContent = `${i}: ${dataObject.toDisplay[i]}`;
    list.appendChild(li);
  }
}

const form = document.querySelector('form');
form.addEventListener('submit', function(event){
  let location = document.querySelector('#location').value;
  getWeatherData(location);
  event.preventDefault();
});

getWeatherData('Moscow');
