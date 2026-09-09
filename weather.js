export async function getLocation(city){
 let url=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;
 let response=await fetch(url);
 if(!response.ok){
    throw new Error(`Location request failed: ${response.status}`);
 }
 let data= await response.json();
 console.log(data);
 return data;
}
export async function getWeather(latitude,longitude){
const url = `https://api.open-meteo.com/v1/forecast?latitude=
${latitude}&longitude=${longitude}&current=temperature_2m,
weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature,wind_direction_10m`;
const response = await fetch(url);
if(!response.ok){
    throw new Error(`weather request failed:${response.status}`)
}
const data= await response.json();
if(!data.current){
    throw new Error("Weather data is missing");
}
console.log(data.current.weather_code);
return data;
}