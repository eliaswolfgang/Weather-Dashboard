// My API KEY: 33c8f0cb48a2516d3091cecee2d54254

//  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=33c8f0cb48a2516d3091cecee2d54254

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=33c8f0cb48a2516d3091cecee2d54254


$(document).ready(function() {


$(".search").on("click", function () {
    
    var newCity = $("#newCitySearch").val().trim();
    localStorage.setItem('recentCity', newCity);
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=33c8f0cb48a2516d3091cecee2d54254";

    $("#currentCity").text(newCity);
    $("#currentWeather").empty();

    $.ajax({
        url: queryURL1,
        method: "GET"
      })
        .then(function(response) {
          
        var lat = response.coord.lat;
        var long = response.coord.lon;
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&appid=33c8f0cb48a2516d3091cecee2d54254";

            $.ajax({
                url: queryURL2,
                method: "GET"
            })
              .then(function(response) {
                  
                var currentDay = new Date(response.current.dt*1000).toLocaleDateString("en-US");
                var currentConditionsIcon = $(`<img src="http://openweathermap.org/img/wn/${response.current.weather[0].icon}.png" alt="current weather" />`);
                var currentTemp = $(`<p>Temperature: ${response.current.temp}°F</p>`);
                var currentFeelsLike = $(`<p>Feels Like: ${response.current.feels_like}°F</p>`);
                var currentHum = $(`<p>Humidity: ${response.current.humidity}%</p>`);
                var currentUVI = $(`<p>UV Index: <span id="uvindex">${response.current.uvi}</span></p>`);
                $("#currentDate").text(" " + currentDay);
                $("#currentConditions").html(currentConditionsIcon);
                $("#currentWeather").prepend(currentTemp).append(currentFeelsLike, currentHum, currentUVI);

              });

        });

});
    
})        