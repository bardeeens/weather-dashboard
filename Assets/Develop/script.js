$( document ).ready(function() {

    $("#searchcity").on("click enterKey", function (){
        console.log("working");
        let city =  $("#form1").val()
        var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=70482e2b61f2d16121b8a6db0d8a674c"
    
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);

            let K = response.list[0].main.temp
            let temp = (K - 273.15) * 1.80 + 32

            $('#city').text(response.city.name); //need to add date
            $("#weather-today").html("Temp: " + temp.toFixed(1) + "F°<br>Humidity:<br>Wind Speed:<br>UV Index:");
            console.log(response.list[0].main.humidity);
          
           
        
        
        
        
        
        
        });
    })






});