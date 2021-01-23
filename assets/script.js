$(document).ready(function () {

    var recentSearch = localStorage.getItem("recentCity");

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== recentSearch) {
            $("#searchHistory").append(`<li class="list-group-item"><button type="button" class="btn btn-link">${localStorage.getItem(localStorage.key(i))}</button></li>`);
        }
    }
    var recentCityURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + recentSearch + "&appid=33c8f0cb48a2516d3091cecee2d54254";
    
        $.ajax({
            url: recentCityURL1,
            type: "GET",
            error: function () {
                return;
            },
            success: function (result) {
                $("#currentCity").text(recentSearch);
                $("#currentWeather").empty();
                var lat = result.coord.lat;
                var long = result.coord.lon;
                var recentCityURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly,alerts&appid=33c8f0cb48a2516d3091cecee2d54254";
    
                $.ajax({
                    url: recentCityURL2,
                    type: "GET",
                    success: function (result) {
                        var currentDay = new Date(result.current.dt * 1000).toLocaleDateString("en-US");
                        var currentConditionsIcon = $(`<img src="http://openweathermap.org/img/wn/${result.current.weather[0].icon}.png" alt="current weather" />`);
                        var currentTemp = $(`<p>Temperature: ${result.current.temp}°F</p>`);
                        var currentFeelsLike = $(`<p>Feels Like: ${result.current.feels_like}°F</p>`);
                        var currentHum = $(`<p>Humidity: ${result.current.humidity}%</p>`);
                        var currentWind = $(`<p>Wind Speed: ${result.current.wind_speed} MPH</p>`);
                        var currentUVI = $("<p>");
                        currentUVI.html("UV Index: " + result.current.uvi);

                        if (result.current.uvi <= 2) {
                            currentUVI.attr("class", "mild")
                        } else if (3 <= result.current.uvi <= 7) {
                            currentUVI.attr("class", "moderate")
                        } else {
                            currentUVI.attr("class", "severe")
                        }

                        var fiveDayForecast = result.daily;
                        console.log(fiveDayForecast);
    
                        $("#currentDate").text(" " + currentDay);
                        $("#currentConditions").html(currentConditionsIcon);
                        $("#currentWeather").prepend(currentTemp).append(currentFeelsLike, currentHum, currentWind, currentUVI);
    
                        for (let i = 1; i < 6; i++) {
                            var newDays = $(`<div class="card text-white bg-info mb-3" style="width: 18rem;"><div class="card-body"><h5 class="card-title">${new Date(fiveDayForecast[i].dt * 1000).toLocaleDateString("en-US")}</h5><img src="http://openweathermap.org/img/wn/${fiveDayForecast[i].weather[0].icon}.png" /><p class="card-text">Temp: ${fiveDayForecast[i].temp.day}°F</p><p class="card-text">Humidity: ${fiveDayForecast[i].humidity}%</p></div></div>`);
                            $("#fiveDay").append(newDays);
                        };
    
                    }
                })
            }
        });

    $(".search").on("click", function () {

        var newCity = $("#newCitySearch").val().trim();
        var newCityURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=33c8f0cb48a2516d3091cecee2d54254";

        $.ajax({
            url: newCityURL1,
            type: "GET",
            error: function () {
                return;
            },
            success: function (result) {
                $("#currentCity").text(newCity);
                localStorage.setItem("recentCity", newCity);
                localStorage.setItem(newCity, newCity);
                var lat = result.coord.lat;
                var long = result.coord.lon;
                var newCityURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly,alerts&appid=33c8f0cb48a2516d3091cecee2d54254";

                $.ajax({
                    url: newCityURL2,
                    type: "GET",
                    success: function (result) {
                        var currentDay = new Date(result.current.dt * 1000).toLocaleDateString("en-US");
                        var currentConditionsIcon = $(`<img src="http://openweathermap.org/img/wn/${result.current.weather[0].icon}.png" alt="current weather" />`);
                        var currentTemp = $(`<p>Temperature: ${result.current.temp}°F</p>`);
                        var currentFeelsLike = $(`<p>Feels Like: ${result.current.feels_like}°F</p>`);
                        var currentHum = $(`<p>Humidity: ${result.current.humidity}%</p>`);
                        var currentWind = $(`<p>Wind Speed: ${result.current.wind_speed} MPH</p>`);
                        var currentUVI = $("<p>");
                        currentUVI.html("UV Index: " + result.current.uvi);

                        if (result.current.uvi <= 2) {
                            currentUVI.attr("class", "mild")
                        } else if (3 <= result.current.uvi <= 7) {
                            currentUVI.attr("class", "moderate")
                        } else {
                            currentUVI.attr("class", "severe")
                        }
                        var fiveDayForecast = result.daily;
                        console.log(fiveDayForecast);

                        $("#currentDate").text(" " + currentDay);
                        $("#currentConditions").html(currentConditionsIcon);
                        $("#currentWeather").prepend(currentTemp).append(currentFeelsLike, currentHum, currentWind, currentUVI);

                        for (let i = 1; i < 6; i++) {
                            var newDays = $(`<div class="card text-white bg-info mb-3" style="width: 18rem;"><div class="card-body"><h5 class="card-title">${new Date(fiveDayForecast[i].dt * 1000).toLocaleDateString("en-US")}</h5><img src="http://openweathermap.org/img/wn/${fiveDayForecast[i].weather[0].icon}.png" /><p class="card-text">Temp: ${fiveDayForecast[i].temp.day}°F</p><p class="card-text">Humidity: ${fiveDayForecast[i].humidity}%</p></div></div>`);
                            $("#fiveDay").append(newDays);
                        };
                        location.reload();
                    }
                })
            }
        });
    });

    $(".btn-link").on("click", function() {

        var searchedCity = $(this).text();

        $("#currentCity").text(searchedCity);
        $("#currentWeather").empty();
        $("#fiveDay").empty();

        var searchedCityURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=33c8f0cb48a2516d3091cecee2d54254";

        $.ajax({
            url: searchedCityURL1,
            type: "GET",
            success: function (result) {

                var lat = result.coord.lat;
                var long = result.coord.lon;
                var searchedCityURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly,alerts&appid=33c8f0cb48a2516d3091cecee2d54254";

                $.ajax({
                    url: searchedCityURL2,
                    method: "GET",
                    success: function (result) {

                        var currentDay = new Date(result.current.dt * 1000).toLocaleDateString("en-US");
                        var currentConditionsIcon = $(`<img src="http://openweathermap.org/img/wn/${result.current.weather[0].icon}.png" alt="current weather" />`);
                        var currentTemp = $(`<p>Temperature: ${result.current.temp}°F</p>`);
                        var currentFeelsLike = $(`<p>Feels Like: ${result.current.feels_like}°F</p>`);
                        var currentHum = $(`<p>Humidity: ${result.current.humidity}%</p>`);
                        var currentWind = $(`<p>Wind Speed: ${result.current.wind_speed} MPH</p>`);
                        var currentUVI = $("<p>");
                        currentUVI.html("UV Index: " + result.current.uvi);

                        if (result.current.uvi <= 2) {
                            currentUVI.attr("class", "mild")
                        } else if (3 <= result.current.uvi <= 7) {
                            currentUVI.attr("class", "moderate")
                        } else {
                            currentUVI.attr("class", "severe")
                        }
                        var fiveDayForecast = result.daily;
                        console.log(fiveDayForecast);

                        $("#currentDate").text(" " + currentDay);
                        $("#currentConditions").html(currentConditionsIcon);
                        $("#currentWeather").prepend(currentTemp).append(currentFeelsLike, currentHum, currentWind, currentUVI);

                        for (let i=1; i < 6 ; i++) {
                            var newDays = $(`<div class="card text-white bg-info mb-3" style="width: 18rem;"><div class="card-body"><h5 class="card-title">${new Date(fiveDayForecast[i].dt * 1000).toLocaleDateString("en-US")}</h5><img src="http://openweathermap.org/img/wn/${fiveDayForecast[i].weather[0].icon}.png" /><p class="card-text">Temp: ${fiveDayForecast[i].temp.day}°F</p><p class="card-text">Humidity: ${fiveDayForecast[i].humidity}</p></div></div>`);
                                $("#fiveDay").append(newDays);           
                        };  
                    }
                });
            }
        });
    });
})         