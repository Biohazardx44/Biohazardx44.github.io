import getLocation from "./helperFunctions/getLocation.js";
import DataHelpers from "./helperFunctions/dataHelpers.js";
import CardTemplates from "./helperFunctions/cardTemplates.js";

const apiParameters = {
    // globalCity: `Skopje`,
    apiKey: `74e59f6374abe0d9b758877616ae444c`,
    apiFirstUrl: `https://api.openweathermap.org/data/2.5/onecall`,
    apiSecondUrl: `https://api.openweathermap.org/data/2.5/forecast`,
    imgUrl: ` http://openweathermap.org/img/wn/`,
}

const cardsContainer = document.getElementById(`cardsContainer`);


// setData(`test2`, 5);
// const data2 = getData(`test2`);
// console.log(data2);

// setData(`test3`, `egagaga`);
// const data3 = getData(`test3`);
// console.log(data3);

// setData(`test4`, [2, 5, 6, 7]);
// const data4 = getData(`test4`);
// console.log(data4);

getLocation()
    .then(position => {
        // const {latitude, longitude} = position.coords;
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        DataHelpers.getDataFromURLorLocal(`${apiParameters.apiFirstUrl}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiParameters.apiKey}&exclude=minutely`)
            .then(data => {
                // console.log(data);
                for (let element of data.hourly) {
                    const cardHtml = CardTemplates.hourly(element);
                    cardsContainer.innerHTML += cardHtml;
                }
            })
    })