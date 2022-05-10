const api = {
  key: "805fa91ae8a3301b68cc5c23e2bd2804",
  base: "https://api.openweathermap.org/data/2.5/"
}

// Setup event for button click - getResults on button click
const btn = document.querySelector('.btn');
btn.addEventListener('click', function(e){
   getResults(searchbox.value);
});

// setup event for keypress 13 (enter key) - getResults if true
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', function(e){
  if (e.keyCode == 13) {
    getResults(searchbox.value); 
  }
});

// fetch the api using the results from the searchbox value
function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then( 
    weather => { 
      // check if the results are valid (sucessfull value = 200 therefore anything that does not equal is not valid)
      if(weather.status!= 200){
        // display error message
        document.querySelector('.error').innerText = "*Please enter a valid city.";
      } else {
        // clear the error message
        document.querySelector('.error').innerText = "";
      }
      // get json results from API query 
      return weather.json();
    }
  ) // run the display results funtion
  .then(displayResults);
}

// various statements to display results on screen
function displayResults (weather) {
  // console log for testing
  // console.log(weather);
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let icon = document.querySelector('.current .icon');
  icon.innerHTML ='<img src=\"http://openweathermap.org/img/wn/' + weather.weather[0].icon +  '@2x.png\" alt="weather-icon">';

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${month} ${date}, ${year}`;
}

