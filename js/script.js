// var url_query_local = "https://api.wunderground.com/api/fd97edca66614862/conditions/geolookup/q/41.828855,-71.43304959999999.json";

//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//
// Geolocal Coordinates grab & construct JSON url for wunderground.
//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//
var api_key = "fd97edca66614862";

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
    url_query_local = 'https://api.wunderground.com/api/' +
                      api_key + '/conditions/geolookup/q/' +
                      pos.coords.latitude + ',' + pos.coords.longitude + '.json';

    console.log(url_query_local);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);



//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//
// AJAX for WUNDERGROUND.com weather API
//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//
$.ajax({
  // url: url_query_local,
  url: "https://api.wunderground.com/api/fd97edca66614862/conditions/geolookup/q/41.828798,-71.4336524.json",
  dataType: "json",
  success: function(url) {
    console.log(url);
    var location = url.current_observation.display_location.full;
    var temp_f = url.current_observation.temp_f;
    // $(".conditions").html("Current temperature in " + location + " is: " + temp_f + "ºF");
    $(".locale").html(location);
    $("#currentconditions").html(url.current_observation.weather);
    // $(".weatherdate").html(url.)
    // $(".icon_url")
    // $(".forecast_url")
  }
});





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
