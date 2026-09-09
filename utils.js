export function getWindDirection(degrees){
    const directions=["N","NE","E","SE","S","SW","W","NW"];
    const index=Math.round(degrees/45)% 8;
    return directions[index];
}
export function getWeatherEmoji(code){
    console.log("Emoji function received:",code);
    if(code===0){
        return"☀";
    }
else if(code===1){
       return "🌤";
}
else if(code===2){
    return "⛅";
}
else if(code===3){
    return "☁";
}
else if(code >=45 && code <=48){
    return "🌫️";
}
else if(code>=51 && code<=67){
    return"🌧️";
}
else if(code>=71 && code<= 77){
    return"❄️";
}
else if(code >= 80 && code<=82){
    return "🌦️";
}
else if(code >=85 && code<=86){
    return "🌨️";
}
else if(code===95){
    return "⛈️";
}
else if(code>=96 && code<=99){
    return "⛈️";
}
else{
    return "🌡️";
}
}