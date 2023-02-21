export default class CardTemplates {
    static hourly(element) {
        console.log(element);
        const time = new Date(element.dt * 1000)
        const weatherInfo = element.weather
        console.log(weatherInfo);
        console.log(time);
        const htmlToReturn = `
        <div class= "weather-card">
            <div class= "weather-card__temp">${Math.round(element.temp)}°</div>
            <div class= "weather-card__time">${time.getHours()}:00</div>
            <div class= "weather-card__precipitation"><span class="weather-card__precipitation__span">Precipitation:</span><br> ${element.pop * 100}%</div>
            <div class= "weather-card__wind-speed">Wind Speed:<br> ${element.wind_speed}m/s</div>
        </div>
        `

        //Can use math floor above element.pop & element.wind_speed
        return htmlToReturn
    }

    static daily() {
        
    }
}
