$(document).ready(function () {

    let todayinit = moment().format('MMMM Do, YYYY')

    let city = ''
    let previouscities = []
    $("#city").html(todayinit)
    $("#searchcity").on("click", getWeather)
    $(document).on("keypress", function (event) {
        if (event.key === "Enter") {

            city = $("#cityinput").val()

            return getWeather(city);
        }
    })



    $("#cities-list").on("click", function (event) {

        console.log("working");

        city = event.target.dataset.city
        getWeather(city);


        // {
        //     return getWeather(city);
        // } else {

        //     console.log(city);
        //     return 
        // }


    })




    function getWeather(city) {

        console.log(city);

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=70482e2b61f2d16121b8a6db0d8a674c"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(previouscities);
            if (previouscities.includes(city) !== true) {
                previouscities.push(city)
                $("#cities-list").empty()
                for (let i = 0; i < previouscities.length; i++) {
                    let previouscity = previouscities[i];


                    let div = $("<div>");
                    div.html(previouscity);
                    div.attr("class", "bg-dark card text-center m-2")
                    div.attr("data-city", (`${previouscity}`))
                    $("#cities-list").append(div)

                }
            }




            //     let oldcity = $("<div>").attr("class", "old-city card bg-dark")
            // oldcity.text(city)
            // $("#city-parent").append.oldcity
            // this is what keeps your old searched cities on their own card

            let lon = response.city.coord.lon
            let lat = response.city.coord.lat
            // day temperatures
            let temp = (((response.list[0].main.temp) - 273.15) * 1.80 + 32).toFixed(1)
            let temp1 = (((response.list[8].main.temp) - 273.15) * 1.80 + 32).toFixed(1)
            let temp2 = (((response.list[16].main.temp) - 273.15) * 1.80 + 32).toFixed(1)
            let temp3 = (((response.list[24].main.temp) - 273.15) * 1.80 + 32).toFixed(1)
            let temp4 = (((response.list[32].main.temp) - 273.15) * 1.80 + 32).toFixed(1)
            let temp5 = (((response.list[39].main.temp) - 273.15) * 1.80 + 32).toFixed(1)
            let humidity = response.list[0].main.humidity;
            let humidity1 = response.list[8].main.humidity;
            let humidity2 = response.list[16].main.humidity;
            let humidity3 = response.list[24].main.humidity;
            let humidity4 = response.list[32].main.humidity;
            let humidity5 = response.list[39].main.humidity;

            $("#temp1").html(`Temp<br>${temp1}<br>Humidity<br>${humidity1}%`);
            $("#temp2").html(`Temp<br>${temp2}<br>Humidity<br>${humidity2}%`);
            $("#temp3").html(`Temp<br>${temp3}<br>Humidity<br>${humidity3}%`);
            $("#temp4").html(`Temp<br>${temp4}<br>Humidity<br>${humidity4}%`);
            $("#temp5").html(`Temp<br>${temp5}<br>Humidity<br>${humidity5}%`);
            $("#icon1").attr("src", `http://openweathermap.org/img/wn/${response.list[8].weather[0].icon}@2x.png`)
            $("#icon2").attr("src", `http://openweathermap.org/img/wn/${response.list[16].weather[0].icon}@2x.png`)
            $("#icon3").attr("src", `http://openweathermap.org/img/wn/${response.list[24].weather[0].icon}@2x.png`)
            $("#icon4").attr("src", `http://openweathermap.org/img/wn/${response.list[32].weather[0].icon}@2x.png`)
            $("#icon5").attr("src", `http://openweathermap.org/img/wn/${response.list[39].weather[0].icon}@2x.png`)
            console.log(response.list[0].weather[0].icon);
            let windSpeed = response.list[0].wind.speed.toFixed(1);
            let today = moment().format('MMMM Do, YYYY')


            $('#city').html(`City of ${response.city.name}<br>${today}`); //need to add date
            $("#weather-today").html(`Temp: ${temp}F°<br>Humidity: ${humidity}%<br>Wind Speed: ${windSpeed}mph<br>UV Index: <button id="uvraysbaby" class="m-1 uv-button"></button>`);

            let coordURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=70482e2b61f2d16121b8a6db0d8a674c`
            $.ajax({
                url: coordURL,
                method: "GET"
            }).then(function (responseCoord) {
                let uvIndex = responseCoord.value.toFixed(1)
                $("#uvraysbaby").html(uvIndex)

                if (uvIndex < 3) {
                    $("#uvraysbaby").css("background-color", "green")
                } else if (uvIndex >= 3 && uvIndex <= 5) {
                    $("#uvraysbaby").css("background-color", "rgb(179, 179, 2)")
                } else if (uvIndex >= 5 && uvIndex <= 7) {
                    $("#uvraysbaby").css("background-color", "orange")
                } else if (uvIndex >= 7) {
                    $("#uvraysbaby").css("background-color", "red")
                }



                getWeekDays();
                storeCities();
                console.log(localStorage);

                function storeCities() {
                    // Stringify and set key in localStorage to todos array
                    localStorage.setItem("cities", JSON.stringify(previouscities));
                }
                function getWeekDays() {
                    var day = new Date();
                    var weekday = new Array(7);
                    weekday[0] = "Sunday";
                    weekday[1] = "Monday";
                    weekday[2] = "Tuesday";
                    weekday[3] = "Wednesday";
                    weekday[4] = "Thursday";
                    weekday[5] = "Friday";
                    weekday[6] = "Saturday";

                    $("#tomorrow").html(weekday[(day.getDay() + 1) % 7])
                    $("#tomorrow2").html(weekday[(day.getDay() + 2) % 7])
                    $("#tomorrow3").html(weekday[(day.getDay() + 3) % 7])
                    $("#tomorrow4").html(weekday[(day.getDay() + 4) % 7])
                    $("#tomorrow5").html(weekday[(day.getDay() + 5) % 7])

                }

            });


        });
        function getStorage() {
            let storedcities = JSON.parse(localStorage.getItem("cities"));
            if (storedcities !== null) {
                previouscities = storedcities;
            }

        }



    }
});