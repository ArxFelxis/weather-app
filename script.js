const API_KEY = "PFA6NSLTJQYEH8AH5ZD9R6SKZ";

const dom = {
    searchInput: document.querySelector("#get-location"),
    searchBtn: document.querySelector("#search-btn"),
    weatherIcon: document.querySelector("#icon"),
    temp: document.querySelector("#temp"),
    conditions: document.querySelector("#conditions")
}

async function fetchData(location) {
    const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error("Request failed");
    }

    const data = await response.json();
    console.log(data)

    return {
        currentConditions: data.currentConditions.conditions,
        temp: data.currentConditions.temp,
        icon: data.currentConditions.icon
    };
}

function fahrenheitToCelcius (temp) {
    return ((temp - 32) * (5/9)).toFixed(1);
}

function celciusToFahrenheit (temp) {
    return (temp - 32) * (5/9);
}

function createButton (className, textContent) {
    const newBtn = document.createElement("button");
    newBtn.classList.add(className);
    newBtn.textContent = textContent;
    dom.conditions.append(newBtn);
}

function populateData(variableName) {
    dom.weatherIcon.alt = variableName.icon;
    dom.weatherIcon.style.display = "block";
    dom.temp.textContent = variableName.temp;
    dom.conditions.textContent = variableName.currentConditions;
}

dom.searchBtn.addEventListener("click", async function () {
    const weatherData = await fetchData(dom.searchInput.value);
    populateData(weatherData);
});


// searchBtn.addEventListener("click", async () => {
//     const weather = await fetchData(searchInput.value);

//     weatherTemp.textContent = `Current Temp: ${weather.temp}°F`;
//     weatherTempFeelsLike.textContent = `Feels Like: ${weather.tempFeelsLike}°F`;

//     const searchBtn = document.createElement("button");
//     searchBtn.classList.add("search-btn");
//     searchBtn.textContent = "Celcius";
//     document.querySelector("#temperature").appendChild(searchBtn);

//      let celcius = false;

//     searchBtn.addEventListener ("click", function() {
//         if (!celcius) {

//             weatherTemp.textContent = `Current Temp: ${((weather.temp - 32) * (5/9)).toFixed(1)}°C`;
//             weather.temp = (weather.temp - 32) * (5/9);

//             weatherTempFeelsLike.textContent = `Feels Like: ${((weather.tempFeelsLike - 32) * (5/9)).toFixed(1)}°C`;
//             weather.tempFeelsLike = (weather.tempFeelsLike - 32) * (5/9);

//             celcius = true;

//         } else if (celcius === true) {

//             weatherTemp.textContent = `Current Temp: ${((weather.temp * (9/5)) + 32).toFixed(1)}°F`;
//             weather.temp = (weather.temp * (9/5)) + 32;

//             weatherTempFeelsLike.textContent = `Feels Like: ${(weather.tempFeelsLike  * (9/5)) + 32}°F`;
//             weather.tempFeelsLike = (weather.tempFeelsLike  * (9/5)) + 32;

//             celcius = false;
//         }
//     })
// });

