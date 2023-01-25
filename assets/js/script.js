var apiKey = "a87f8badc77fd8896923e7a24622a25f";
var baseURL = "https://api.openweathermap.org/data/2.5/";
var currentURL = baseURL + `weather?appid=${apiKey}&units=metric&`;
var forecastURL = baseURL + `forecast?appid=${apiKey}&units=metric&`;
var iconURL = "https://openweathermap.org/img/w/";
var currentDateEl = $(".current-date");
var searchBtn = $("#search-button");
var searchInput = $(".search-input");
var today = $("#today");
var foreCast = $("#forecast");
var cardWrapper = $('#forecast');
var searchHistory = $('#search-history');

console.log(searchBtn);

searchBtn.click(function () {
  inputSubmitted(searchInput.val());
  searchFunction();
  
  searchInput.val('');
  
});

function inputSubmitted(cityName) {
  $.get(currentURL + `q=${cityName}`).then(function (currentData) {
    console.log(currentData)
    today.html("");
    var currentDay = $('<h1></h1>');
    currentDay.text(moment().format("dddd Do MMMM YYYY"));
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
    
    $.get(forecastURL + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`
    ).then(function (forecastData) {
      cardWrapper.html('');
      for (var i = 0; i < forecastData.list.length; i+=8) {
        cardWrapper.append(`
        <div class="weather-card" style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),;">
        <h3>${forecastData.list[i].dt_txt}</h3>    
        <img src='${iconURL + forecastData.list[i].weather[0].icon}.png'>
        <h3>Temp: ${forecastData.list[i].main.temp}°C</h3>
        <h3>Wind: ${forecastData.list[i].wind.speed}m/s</h3>
        <h3>Humidity: ${forecastData.list[i].main.humidity}%</h3>       
        </div>`)
        localStorage.setItem(forecastData, JSON.stringify(forecastData));
        console.log(forecastData.list)
      }
    });
  });
}
function searchFunction(data) {
  console.log($('#search').val());
  localStorage.setItem(searchHistory, JSON.stringify(searchHistory));
  searchHistory.push($('#search').val());
  // $('#search').val('');
  $('#search-history').text('');

  $.each(searchHistory, function (index, value){
    $('#search-history').append("<button class='historyItem' onclick='addtotextbox("+index+")'>" + value + '</button')
    console.log(value);
  });
}

// function addtotextbox(id) {
//   $('.search-input').val(searchHistory(id));
// }



