import getDay from './getDay.js';

/**
 * Card Templates used to generate the information in the Hourly and Daily cards in the html
 */
export default class CardTemplates {
    static hourly(element, timezoneOffset = 0) {
        const timezone_offset = timezoneOffset * 1000;
        const current_time = element.dt * 1000;
        const time = new Date(current_time + timezone_offset);
        const icon_url = `http://openweathermap.org/img/wn/${element.weather[0].icon}.png`;
        const weather_description = element.weather[0].description;
        const hours = time.getHours().toString().padStart(2, '0');
        const humidity = element.humidity;
        const wind_speed_in_kmph = (element.wind_speed * 3.6).toFixed(1);

        return CardTemplates._generateHtml(icon_url, weather_description, Math.round(element.temp), `${hours}:00`, Math.floor(element.pop * 100), wind_speed_in_kmph, humidity);
    };

    static daily(element, timezoneOffset = 0, index = 0) {
        const currentDay = getDay(new Date().getDay() + index);
        const icon_url = `http://openweathermap.org/img/wn/${element.weather[0].icon}.png`;
        const weather_description = element.weather[0].description;
        const precipitation = Math.floor(element.pop * 100);
        const wind_speed_in_kmph = (element.wind_speed * 3.6).toFixed(1);
        const temp = Math.round(element.temp.max);
        const humidity = element.humidity;

        return CardTemplates._generateHtml(icon_url, weather_description, temp, currentDay, precipitation, wind_speed_in_kmph, humidity);
    };

    static _generateHtml(icon_url, weather_description, temp, timeOrDay, precipitation, wind_speed_in_kmph, humidity) {
        return `
      <div class="weather-card">
        <div class="weather-card__timeOrDay">${timeOrDay}</div>
        <div class="weather-card__icon-description-container">
          <img src="${icon_url}" alt="Weather icon">
          <div class="weather-card__weather-condition">${weather_description}</div>
        </div>
        <div class="weather-card__temp">${temp}°</div>
        <div class="weather-card__precipitation">
          <span class="weather-card__precipitation__span">Precipitation</span><br>
          ${precipitation}%
        </div>
        <div class="weather-card__humidity">
          <span class="weather-card__humidity__span">Humidity</span><br>
          ${humidity}%
        </div>
        <div class="weather-card__wind-speed">
          Wind Speed<br>
          ${wind_speed_in_kmph} km/h
        </div>
      </div>
    `;
    };
};