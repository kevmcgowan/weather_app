// use moment
// search history on the left
// check lower casing, like the movie app
// open weather api, current and 5 day
// use jquery to create the wireframing layout
// use hover for the buttons and filter the information if you can
// arrays has a filter by value function
//region check
// current weather
// media query to adjust for screen size
// alert for city not found
// prevent default if using a form
//  2 colum lay out
// degree = &deg inject into DOM
//  api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=apiKey - 5day
// $.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid={apiKey}&units=metric
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} - geo query - current day
// `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}`
var apiKey = '2477ba37b5fe48f255ae88cf1a2662ae';
var city = 'London'

   
// 

$.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(function(currentData) {
        var lon = currentData.coord.lon;
        var lat = currentData.coord.lat;


        console.log(`
        ------Current Conditions-------
        Temp: ${Math.round(currentData.main.temp)}°C
        Wind: ${currentData.wind.speed} M/S
        Humidity: ${currentData.main.humidity}
        `);

        $.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(function (forecastData){
            console.log(forecastData);
        })
    });

// // no jquery version

// function handleResponse(responseObj) {
//     var dataPromise = responseObj.json();
//     return dataPromise;
// }

// fetch(cityUrl)
//     .then(handleResponse)
//     .then(function(data) {

//     })