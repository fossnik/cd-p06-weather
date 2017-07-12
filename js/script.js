// var url_query_local = "https://api.wunderground.com/api/fd97edca66614862/conditions/q/RI/Providence.json"

var api_key = "fd97edca66614862"


var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
    var url_query_local = 'https://api.wunderground.com/api/' + api_key + '/conditions/geolookup/q/' + pos.coords.latitude + ',' + pos.coords.longitude + '.json';
    // var url_query_local = "https://api.wunderground.com/api/fd97edca66614862/conditions/q/RI/Providence.json";
    console.log(url_query_local);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);



$.ajax({
  url: "https://api.wunderground.com/api/fd97edca66614862/conditions/geolookup/q/41.8288517,-71.433088.json",
  dataType: "json",
  success: function(url) {
    console.log(url);
    var location = url.current_observation.display_location.full;
    var temp_f = url.current_observation.temp_f;
    $(".conditions").html("Current temperature in " + location + " is: " + temp_f + "ºF");
  }
});

// $(document).ready(function() {
//   $.getJSON(success.url_query_local, function(response) {
//     var location = response['current_observation']['display_location']['city'];
//     var temp_f = response['current_observation']['temp_f'];
//     $(".conditions").html("Current temperature in " + location + " is: " + temp_f + "ºF");
//     console.log(response);
//   });
// });