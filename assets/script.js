// My API KEY: 33c8f0cb48a2516d3091cecee2d54254

//  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=33c8f0cb48a2516d3091cecee2d54254

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=33c8f0cb48a2516d3091cecee2d54254


$(document).ready(function () {

    var recentSearch = localStorage.getItem("recentCity");
    $("#currentCity").text(recentSearch);
    $("#currentWeather").empty();
    var recentCityURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + recentSearch + "&appid=33c8f0cb48a2516d3091cecee2d54254";

    $.ajax({
        url: recentCityURL1,
        method: "GET"
    })
        .then(function (response) {

            var lat = response.coord.lat;
            var long = response.coord.lon;
            var recentCityURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly,alerts&appid=33c8f0cb48a2516d3091cecee2d54254";

            $.ajax({
                url: recentCityURL2,
                method: "GET"
            })
                .then(function (response) {

                    var currentDay = new Date(response.current.dt * 1000).toLocaleDateString("en-US");
                    var currentConditionsIcon = $(`<img src="http://openweathermap.org/img/wn/${response.current.weather[0].icon}.png" alt="current weather" />`);
                    var currentTemp = $(`<p>Temperature: ${response.current.temp}°F</p>`);
                    var currentFeelsLike = $(`<p>Feels Like: ${response.current.feels_like}°F</p>`);
                    var currentHum = $(`<p>Humidity: ${response.current.humidity}%</p>`);
                    var currentWind = $(`<p>Wind Speed: ${response.current.wind_speed} MPH</p>`);
                    var currentUVI = $(`<p>UV Index: <span id="uvindex">${response.current.uvi}</span></p>`);
                    var fiveDayForecast = response.daily;
                    console.log(fiveDayForecast);

                    $("#currentDate").text(" " + currentDay);
                    $("#currentConditions").html(currentConditionsIcon);
                    $("#currentWeather").prepend(currentTemp).append(currentFeelsLike, currentHum, currentWind, currentUVI);

                    for (let i=1; i < 6 ; i++) {
                        var newDays = $(`<div class="card text-white bg-info mb-3" style="width: 18rem;"><div class="card-body"><h5 class="card-title">${new Date(fiveDayForecast[i].dt * 1000).toLocaleDateString("en-US")}</h5><img src="http://openweathermap.org/img/wn/${fiveDayForecast[i].weather[0].icon}.png" /><p class="card-text">Temp: ${fiveDayForecast[i].temp.day}°F</p><p class="card-text">Humidity: ${fiveDayForecast[i].humidity}</p></div></div>`);
                            $("#fiveDay").append(newDays);           
                    }  
                });
        });

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== recentSearch) {
            $("#searchHistory").append(`<li class="list-group-item"><button type="button" class="btn btn-link">${localStorage.getItem(localStorage.key(i))}</button></li>`);
        }
    };


    $(".search").on("click", function () {

        var newCity = $("#newCitySearch").val().trim();
        localStorage.setItem("recentCity", newCity);
        localStorage.setItem(newCity, newCity);
        location.reload();

    });

    $(".btn-link").on("click", function() {

        var searchedCity = $(this).text();

        $("#currentCity").text(searchedCity);
        $("#currentWeather").empty();
        $("#fiveDay").empty();

        var searchedCityURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=33c8f0cb48a2516d3091cecee2d54254";

        $.ajax({
            url: searchedCityURL1,
            method: "GET"
        })
            .then(function (response) {
    
                var lat = response.coord.lat;
                var long = response.coord.lon;
                var searchedCityURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly,alerts&appid=33c8f0cb48a2516d3091cecee2d54254";
    
                $.ajax({
                    url: searchedCityURL2,
                    method: "GET"
                })
                    .then(function (response) {
    
                        var currentDay = new Date(response.current.dt * 1000).toLocaleDateString("en-US");
                        var currentConditionsIcon = $(`<img src="http://openweathermap.org/img/wn/${response.current.weather[0].icon}.png" alt="current weather" />`);
                        var currentTemp = $(`<p>Temperature: ${response.current.temp}°F</p>`);
                        var currentFeelsLike = $(`<p>Feels Like: ${response.current.feels_like}°F</p>`);
                        var currentHum = $(`<p>Humidity: ${response.current.humidity}%</p>`);
                        var currentWind = $(`<p>Wind Speed: ${response.current.wind_speed} MPH</p>`);
                        var currentUVI = $(`<p>UV Index: <span id="uvindex">${response.current.uvi}</span></p>`);
                        var fiveDayForecast = response.daily;
                        console.log(fiveDayForecast);
    
                        $("#currentDate").text(" " + currentDay);
                        $("#currentConditions").html(currentConditionsIcon);
                        $("#currentWeather").prepend(currentTemp).append(currentFeelsLike, currentHum, currentUVI);
    
                        for (let i=1; i < 6 ; i++) {
                            var newDays = $(`<div class="card text-white bg-info mb-3" style="width: 18rem;"><div class="card-body"><h5 class="card-title">${new Date(fiveDayForecast[i].dt * 1000).toLocaleDateString("en-US")}</h5><img src="http://openweathermap.org/img/wn/${fiveDayForecast[i].weather[0].icon}.png" /><p class="card-text">Temp: ${fiveDayForecast[i].temp.day}°F</p><p class="card-text">Humidity: ${fiveDayForecast[i].humidity}</p></div></div>`);
                                $("#fiveDay").append(newDays);           
                        }  
                    });
            });
    })
})        