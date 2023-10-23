$(document).ready(function() {

    let watch = JSON.parse(localStorage.getItem("..."));

    $('#watch-container').empty(); 

    for(i = 0; i < watch.length; i++){

        getMovies(watch[i]);

    }

});

