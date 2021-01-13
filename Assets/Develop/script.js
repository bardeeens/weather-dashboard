$( document ).ready(function() {
    
    var city = "Chicago" //will be user input later $("input").val()
    var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=70482e2b61f2d16121b8a6db0d8a674c"
    
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        console.log(response.Runtime);
      });






});