//API Link ===>https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=1cebc20e05e3fcc1713485cd42e3b2f5

const apiKey = "1cebc20e05e3fcc1713485cd42e3b2f5";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const cityInputValue = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const temp = document.querySelector(".temp");
const cityName = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherImg = document.querySelector(".weather img");

btn.addEventListener("click", () => {

  checkWeather(cityInputValue.value);
});

async function checkWeather(city) {
  const resp = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (resp.status == 404) {
    document.querySelector(".error").innerHTML = `Invalid city Name`;
    weatherImg.setAttribute('src', 'img/error_image.png');
    cityName.style.display = `none`;
    temp.style.display = `none`;
    humidity.style.display = `none`;
    wind.style.display = `none`;
  }
  
  let data = await resp.json();

  cityName.innerHTML = data.name;
  temp.innerHTML = Math.round(data.main.temp) + `°C`;
  humidity.innerHTML = data.main.humidity + `%`;
  wind.innerHTML = data.wind.speed + ` KM/h`;
  
  if (data.weather[0].main == "Thunderstorm") {
    weatherImg.setAttribute("src", "img/drizzle.png");
  } else {
      if (data.weather[0].main == "Rain") {
      weatherImg.setAttribute("src", "img/rain.png");
    } else if (data.weather[0].main == "Clear") {
      weatherImg.setAttribute("src", "img/clear.png");
    } else if (data.weather[0].main == "Clouds") {
        weatherImg.setAttribute("src", "img/clouds.png");
    } else if (data.weather[0].main == "Snow") {
      weatherImg.setAttribute("src", "img/snow.png");
    }
}
// console.log(data);
}
