import { getWindDirection,getWeatherEmoji } from "./utils.js";
import { getLocation,getWeather } from "./weather.js";
let cityInput=document.getElementById("cityInput");
let Search=document.getElementById("searchBtn");
let weatherResult=document.getElementById("weatherResult");
cityInput.addEventListener("keydown",function(event){
if(event.key==="Enter"){
    Search.click();
}
});
function formatCityName(city){
let lowerCity=city.toLowerCase();
let words=lowerCity.split(/\s+/)
let formattedWords=words.map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
});
return formattedWords.join(" ");
}
let lastCity="";
Search.addEventListener("click",async function(){
let city=cityInput.value.trim().replace(/\s+/g," ");
if(city===""){
    weatherResult.innerHTML="Please enter a city.";
    return;
}
if(city.toLowerCase()===lastCity.toLowerCase()){
    return;
}
Search.disabled=true;
weatherResult.innerHTML="🌤️loading weather...";
let data;
try{
  data= await getLocation(city);
if (!data.results || data.results.length ===0){
    weatherResult.innerHTML="City not found.";
    return;
}
const country = data.results[0].country;
const latitude=data.results[0].latitude;
const longitude=data.results[0].longitude;
let weatherData;
  weatherData= await getWeather(latitude,longitude);
  lastCity=city;
const code=weatherData.current.weather_code;
console.log("Weather code:", code);
const emoji= getWeatherEmoji(code);
if(weatherData.current.wind_direction_10m===undefined){
    weatherResult.innerHTML="Wind direction unavailable"
    return;
}
const direction=
 getWindDirection(weatherData.current.wind_direction_10m);
let condition;
if(code===0){
  condition="Clear sky";
}
else if(code===1){
    condition ="Mainly clear";
}
else if(code===2){
    condition = "Partly cloudy"
}
else if(code===3){
  condition= "Overcast";
}
else if(code>=45 && code <= 48){
    condition = "Fog";
}
else if(code>=51 && code<=67){
    condition= "Rain";
}
else if(code===95){
    condition= "Thunderstorm";
}
else if(code>=71 && code <= 77){
 condition = "Snow";
}
else if(code>=80 && code <= 82){
    condition ="Rain showers";
}
else if(code>=85 && code <=86){
    condition="Snow showers";
}
else if(code>= 96 && code<= 99){
    condition ="Thunderstorm with hail";
}
else{
    condition ="Unknown weather"
}

let formattedCity = formatCityName(city);
weatherResult.innerHTML=`<span style="font-size:50px">${emoji}</span><br>
                         ${formattedCity}, ${country}<br>
                         <span style="font-size:35px">
                         Temperature: ${weatherData.current.temperature_2m.toFixed(1)}\u00B0C</span><br>
                         Condition: ${condition}<br>
                         Wind speed: ${weatherData.current.wind_speed_10m.toFixed(1)} km/h <br>
                         Humidity: ${weatherData.current.relative_humidity_2m} % <br>
                         Feels like: ${weatherData.current.apparent_temperature.toFixed(1)}\u00B0C <br>
                         Wind direction: ${direction}`;
}
catch(error){
    console.log(error);
    if(error.message==="Weather data is missing"){
        weatherResult.innerHTML="Weather information is unavailable.Please try again.";
    }
    else if(error instanceof TypeError){
        weatherResult.innerHTML="There was a problem communicating with the server.";
    }
    else{
    weatherResult.innerHTML="Something went wrong.please try again";
    }
}
finally{
    Search.disabled=false;
}
});
