import * as ELEMENTS from './elements.js';
import { Http } from './http.js';
import { weatherProxyHandler, WeatherData} from './weather-data.js';

const API_KEY = '15b87d0fe20d1ece55245a1f887cf44c';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather() {
  const cityName = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
  if (!cityName) {
    return alert('Please enter a city name');
  }

  ELEMENTS.ELEMENT_LOADING_TEXT.style.display= 'block';
  ELEMENTS.ELEMENT_WETHER_BOX.style.display = 'none';

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
  Http.fetchData(url).then(data => {
    const weatherData = new WeatherData(cityName, data.weather[0].description.toUpperCase());
    const weatherProxy = new Proxy(weatherData, weatherProxyHandler);
    weatherProxy.temperature = data.main.temp;
    updateWeather(weatherProxy);
  }).catch(err => {
    alert(err.message);
  });
}

function updateWeather(weatherData) {
  ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
  ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
  ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature;

  ELEMENTS.ELEMENT_LOADING_TEXT.style.display= 'none';
  ELEMENTS.ELEMENT_WETHER_BOX.style.display = 'block';
}