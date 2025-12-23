const API_KEY = "PFA6NSLTJQYEH8AH5ZD9R6SKZ";

const dom = {
    searchInput: document.querySelector("#get-location"),
    searchBtn: document.querySelector("#search-btn"),
    weatherIcon: document.querySelector("#icon"),
    temp: document.querySelector("#temp"),
    conditions: document.querySelector("#conditions"),
    tempContainer: document.querySelector("#temp-container")
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
    dom.tempContainer.appendChild(newBtn);
}

function populateData(variableName) {
    dom.weatherIcon.src = weatherIconDisplay(variableName);
    dom.weatherIcon.alt = variableName.icon;
    dom.weatherIcon.style.display = "block";
    dom.temp.textContent = `${variableName.temp}°F`;
    dom.conditions.textContent = variableName.currentConditions;
}

function weatherIconDisplay (variableName) {
    if (variableName.icon.includes("clear")) {
        return "/svgs/clear-day.svg";
    } else if (variableName.icon.includes("cloudy")) {
        return "/svgs/cloudy.svg";
    } else if (variableName.icon.includes("partly")) {
        return "/svgs/partly-cloudy.svg";
    } else if (variableName.icon.includes("rain")) {
        return "/svgs/rain.svg";
    } else if (variableName.icon.includes("thunderstorm")) {
        return "/svgs/thunderstorm.svg";
    }
}

let isCelsius = false;
let currentTempF = 0; 

function changeTempFormat() {
    isCelsius = !isCelsius;
    
    if (isCelsius) {
        const cTemp = ((currentTempF - 32) * (5/9)).toFixed(1);
        dom.temp.textContent = `${cTemp}°C`;
        document.querySelector(".change-temp-format-btn").textContent = "Change to °F";
    } else {
        dom.temp.textContent = `${currentTempF}°F`;
        document.querySelector(".change-temp-format-btn").textContent = "Change to °C";
    }
}

dom.searchBtn.addEventListener("click", async function () {
    const weatherData = await fetchData(dom.searchInput.value);
    
    currentTempF = weatherData.temp;
    isCelsius = false; 
    
    populateData(weatherData);
    
    const existingBtn = document.querySelector(".change-temp-format-btn");
    if (existingBtn) existingBtn.remove();

    createButton("change-temp-format-btn", "Change to °C");
    
    let formatTempBtn = document.querySelector(".change-temp-format-btn");

    formatTempBtn.addEventListener("click", changeTempFormat);
});
