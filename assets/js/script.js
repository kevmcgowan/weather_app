var apiKey = "a87f8badc77fd8896923e7a24622a25f";
var city = "London";
var baseURL = "https://api.openweathermap.org/data/2.5/";
var currentURL = baseURL + `weather?appid=${apiKey}&units=metric&`;
var forecastURL = baseURL + `forecast?appid=${apiKey}&units=metric&`;
var iconURL = "https://openweathermap.org/img/w/";
var currentDateEl = $(".current-date");
var searchBtn = $("#search-button");
var searchInput = $(".search-input");
var today = $("#today");
var foreCast = $("#forecast");
var cardWrapper =$('main')
//Add current date

console.log(searchBtn);

searchBtn.click(function () {
  inputSubmitted(searchInput.val());
});

function inputSubmitted(cityName) {
  $.get(currentURL + `q=${cityName}`).then(function (currentData) {
    console.log(currentData)
    today.html("");
    // console.log(currentData);
    // console.log(currentData.name);
    var currentDay = moment().format("dddd Do MMMM YYYY");
    today.append(currentDay);
    var nameEl = $("<h1></h1>");
    nameEl.text(currentData.name);
    today.append(nameEl);
    var iconEl = (`<img src='${iconURL + currentData.weather[0].icon}.png'>`);
    today.append(iconEl);
    var tempEl = $("<h3>");
    tempEl.text(`Temp: ${Math.round(currentData.main.temp)}°C`);
    today.append(tempEl);
    var humEl = $("<h3>");
    humEl.text(`Humidity: ${currentData.main.humidity}%`);
    today.append(humEl);
    var windEl = $("<h3>");
    windEl.text(`Wind: ${currentData.wind.speed}`);
    today.append(windEl);

    // console.log(`
    //     Temp: ${Math.round(currentData.main.temp)}°C
    //     Humidity: ${currentData.main.humidity}%
    //     Wind: ${currentData.wind.speed}
    //     IconURL: ${iconURL + currentData.weather[0].icon}.png;
    //     `);

      $.get(forecastURL + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`
        ).then(function (forecastData) {
            for (var castObj of forecastData.list) {
                cardWrapper.append(`
                <div class="weather-card" style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),;">
                    <h3>${castObj.dt_txt}</h3>    
                    <img src='${iconURL + castObj.weather[0].icon.png}'>
                    <h3>Temp: ${castObj.main.temp}°C</h3>
                    <h3>Wind: ${castObj.wind.speed}m/s</h3>
                    <h3>Humidity: ${castObj.main.humidity}%</h3>       
                </div>`)
                console.log(forecastData.list)
        }
    });
});
}

// $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
//     .then(function(currentData) {
//         var lon = currentData.coord.lon;
//         var lat = currentData.coord.lat;

//         console.log(`
//         ------Current Conditions-------
//         Temp: ${Math.round(currentData.main.temp)}°C
//         Wind: ${currentData.wind.speed} M/S
//         Humidity: ${currentData.main.humidity}
//         `);

//         $.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
//         .then(function (forecastData){
//             console.log(forecastData);
//         })
//     });

// // no jquery version

// function handleResponse(responseObj) {
//     var dataPromise = responseObj.json();
//     return dataPromise;
// }

// fetch(cityUrl)
//     .then(handleResponse)
//     .then(function(data) {

//     })
