//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//
// Geolocal Coordinates grab & construct JSON url for wunderground.
//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//
var api_key = "fd97edca66614862";

ditch();  <!-- Obviously Awkward -->

function ditch() {
  navigator.geolocation.getCurrentPosition(function(location) {
      var latitude = location.coords.latitude;
      var longitude = location.coords.longitude;
      var json_query_conditions = 'https://api.wunderground.com/api/' +
                            api_key + '/conditions/geolookup/q/' +
                            latitude + ',' + longitude + '.json';

      var units = true;

<!-- CONDITIONS -->
      $.ajax({
        url: json_query_conditions,
        dataType: "json",
        success: function(url) {
          // console.log(url);
          $("#display_location").html(url.current_observation.display_location.full);
          $("#currentconditions").html(url.current_observation.weather);
          $("#observation_time").html(url.current_observation.observation_time);
          $("#icon_url").attr("src", url.current_observation.icon_url);
          $("#temperature_string").html(url.current_observation.temp_f + " F");
          $("#unitsButton").click(function() {
            if ( units === true ) {
              $("#temperature_string").html(url.current_observation.temp_c + " C");
              $("#unitsButton").html("Normal");
            } else {
              $("#temperature_string").html(url.current_observation.temp_f + " F");
              $("#unitsButton").html("Metric");
            }
            units = !units;
          });
          $("#tableBorder").html(function() {  <!-- Modify container color by weather descriptor -->
            var weatherDescriptor = url.current_observation.icon
            if (weatherDescriptor.includes("cloudy")) {
              $("#tableBorder").attr("style", "background-color: grey");
            } else if (weatherDescriptor.includes("sunny") | weatherDescriptor.includes("clear")) {
              $("#tableBorder").attr("style", "background-color: yellow");
            } else if (weatherDescriptor.includes("rain")) {
              $("#tableBorder").attr("style", "background-color: blue");
            } else {
              console.log("No Match");
            }
          });
        }
      }); <!-- END OF AJAX -->



<!-- FORECAST -->
      var json_query_forecast = 'https://api.wunderground.com/api/' +
                            api_key + '/forecast/geolookup/q/' +
                            latitude + ',' + longitude + '.json';

      $.ajax({
        url: json_query_forecast,
        dataType: "json",
        success: function(url) {
          var weatherDescriptor = url.forecast.txt_forecast.forecastday[0]["fcttext"];

          $("#forecastDate").html(url.forecast.simpleforecast.forecastday[0].date.pretty);
          $("#forecast").html(url.forecast.txt_forecast.forecastday[0]["fcttext"]);
          $("#forecastDate1").html(url.forecast.simpleforecast.forecastday[1].date.pretty);
          $("#forecast1").html(url.forecast.txt_forecast.forecastday[1]["fcttext"]);
          $("#forecastDate2").html(url.forecast.simpleforecast.forecastday[2].date.pretty);
          $("#forecast2").html(url.forecast.txt_forecast.forecastday[2]["fcttext"]);

          $("#forecastBorder").html(function() {  <!-- Modify container color by weather descriptor -->
            if (weatherDescriptor.includes("cloudy")) {
              $("#forecastBorder").attr("style", "background-color: grey");
            } else if (weatherDescriptor.includes("sunny") | weatherDescriptor.includes("clear")) {
              $("#forecastBorder").attr("style", "background-color: yellow");
            } else if (weatherDescriptor.includes("rain")) {
              $("#forecastBorder").attr("style", "background-color: blue");
            } else {
              console.log("No Match");
            }
          });
        }
      }); <!-- END OF AJAX -->

  }); <!-- END OF NAVIGATOR -->
} <!-- END OF DITCH -->


//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//
// jquery for WUNDERGROUND.com weather API
//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//
// $(document).ready(function() {
//   $.getJSON(success.url_query_local, function(response) {
//     var location = response['current_observation']['display_location']['city'];
//     var temp_f = response['current_observation']['temp_f'];
//     $(".conditions").html("Current temperature in " + location + " is: " + temp_f + "ºF");
//     console.log(response);
//   });
// });
