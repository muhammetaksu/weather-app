const url1 = "http://api.openweathermap.org/geo/1.0/";
const url2 = "https://api.openweathermap.org/data/2.5/";

const key = "5de0b5042b84f2266ba800146060bb19";

const setQuery = (e) => {
    if (e.keyCode == "13") getResult(aramaBar.value);
};

const getResult = (cityName) => {
    console.log(cityName);
    let query = `${url1}direct?q=${cityName}&appid=${key}`;
    fetch(query)
        .then((result) => {
            return result.json();
        })
        .then(latslons);
};

const latslons = (res) => {
    const lat = res[0].lat;
    const lon = res[0].lon;

    let query2 = `${url2}weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=en
    `;

    fetch(query2)
        .then((result2) => {
            return result2.json();
        })
        .then(finalResult);
};

const finalResult = (weather) => {
    console.log(weather);
    let city = document.querySelector(".city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temp = document.querySelector(".temp");
    temp.innerText = `${Math.round(weather.main.temp)}°`;

    let desc = document.querySelector(".desc");
    desc.innerText = weather.weather[0].description;

    let minmax = document.querySelector(".minmax");
    minmax.innerHTML = `<span style="color:white;">Lowest temperature:</span> <span style="font-size:4vh;">${Math.round(
        weather.main.temp_min
    )}°</span> <br> <span style="color:white;">Highest temperature:</span> <span style="font-size:4vh;">${Math.round(
        weather.main.temp_max
    )}°</span>`;
};

const aramaBar = document.querySelector("#aramaBar");
aramaBar.addEventListener("keypress", setQuery);
