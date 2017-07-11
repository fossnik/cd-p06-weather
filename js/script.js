$(document).ready(function() {

    $("#getMessage").on("click", function(){
        // Only change code below this line.
      
    $.getJSON("/json/cats.json", function(json) {
        $(".message").html(JSON.stringify(json));
        });
        
        // Only change code above this line.
    });

});