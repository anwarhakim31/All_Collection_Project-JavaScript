const apikey = "b1537b79e56d6682264b432d9378341c";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const weathericon = document.querySelector(".weather-icon");
const searchbtn = document.querySelector(".search button");

function checkweather(city) {
  fetch(apiUrl + city + `&appid=${apikey}`)
    .then(function (response) {
      if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
      } else {
        return response.json();
      }
    })
    .then((response) => {
      const data = response;

      console.log(data);

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main == "Clouds") {
        weathericon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weathericon.src = "images/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weathericon.src = "images/Rain.png";
      } else if (data.weather[0].main == "Snow") {
        weathericon.src = "images/snow.png";
      } else if (data.weather[0].main == "Mist") {
        weathericon.src = "images/mist.png";
      } else if (data.weather[0].main == "Drizzle") {
        weathericon.src = "images/drizzle.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// function geturl(city) {
//   return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b1537b79e56d6682264b432d9378341c`;
// }

// function checkweather(city) {
//   const ajax = new XMLHttpRequest();
//   const url = geturl(city);

//   ajax.open("GET", url);

//   ajax.onload = function () {
//     if (ajax.status == 404) {
//
//     } else {
//       const data = JSON.parse(ajax.responseText);

//       document.querySelector(".city").innerHTML = data.name;
//       document.querySelector(".temp").innerHTML =
//         Math.round(data.main.temp) + "°c";
//       document.querySelector(".humidity").innerHTML =
//         data.main.humidity + " %";
//       document.querySelector(".wind").innerHTML =
//         data.wind.speed + " km/h";

//       document.querySelector(".weather").style.display = "block";
//       document.querySelector(".error").style.display = "none";
//     }
//   };
//   ajax.send();
// }

// async function checkweather(city) {
//   const response = await fetch(apiUrl + city + `&appid=${apikey}`);

//   if (response.status === 404) {
//     document.querySelector(".error").style.display = "block";
//     document.querySelector(".weather").style.display = "none";
//   } else {
//     const data = await response.json();

//     console.log(data);

//     document.querySelector(".city").innerHTML = data.name;
//     document.querySelector(".temp").innerHTML =
//       Math.round(data.main.temp) + "°c";
//     document.querySelector(".humidity").innerHTML =
//       data.main.humidity + " %";
//     document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

//     document.querySelector(".weather").style.display = "block";
//     document.querySelector(".error").style.display = "none";
//   }
// }

searchbtn.addEventListener("click", () => {
  checkweather(searchbox.value);
});
const searchbox = document.querySelector(".search input");
searchbox.focus();
searchbox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkweather(searchbox.value);
  }
});
