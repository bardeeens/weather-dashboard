$( document ).ready(function() {
    let todayinit = moment().format('MMMM Do, YYYY')
    
    $("#city").html(todayinit)
    $("#searchcity").on("click", getWeather)
    $(document).on("keypress", function(event){
        if(event.key === "Enter"){
            getWeather();
        }
    })






});

function getWeather(){
    
    console.log("working");
    let city =  $("#form1").val()
    var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=70482e2b61f2d16121b8a6db0d8a674c"
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        let previouscities = []
        previouscities.push(city);
                
                console.log(previouscities);

        for (let i = 0; i < previouscities.length; i++) {
            let previouscity  = previouscities[i];

            let div = $("<div>");
            div.html(previouscity);
            div.attr("class", "bg-dark card text-center m-2")
            $("#cities-list").append(div)
           
              
            
        }

        
    //     let oldcity = $("<div>").attr("class", "old-city card bg-dark")
    // oldcity.text(city)
    // $("#city-parent").append.oldcity
// this is what keeps your old searched cities on their own card
        
        let lon = response.city.coord.lon
        let lat = response.city.coord.lat

        let K = response.list[0].main.temp
        let temp = ((K - 273.15) * 1.80 + 32).toFixed(1)
        let humidity = response.list[0].main.humidity;
        let windSpeed = response.list[0].wind.speed.toFixed(1);
        let today = moment().format('MMMM Do, YYYY')
    
         
        $('#city').html(`City of ${response.city.name}<br>${today}`); //need to add date
        $("#weather-today").html(`Temp: ${temp}F°<br>Humidity: ${humidity}%<br>Wind Speed: ${windSpeed}mph<br>UV Index:<button id="uvraysbaby" class="m-1"></button>`);
        
        let coordURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=70482e2b61f2d16121b8a6db0d8a674c`
        $.ajax({
            url: coordURL,
            method: "GET"
          }).then(function(responseCoord) {
             let uvIndex = responseCoord.value.toFixed(1)

             $("#uvraysbaby").html(uvIndex)
      
             storeCities();
    console.log(localStorage);
    
    function storeCities() {
        // Stringify and set key in localStorage to todos array
        localStorage.setItem("cities", JSON.stringify(previouscities));
      }
            
       
        });

    
    });
         
    
    
    
}