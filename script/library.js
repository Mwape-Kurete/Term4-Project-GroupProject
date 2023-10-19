$(document).ready(function() {



});

$("input[name='btnradio']").click(function(){

    const selectedRadio = $(this).attr('value');

    getMovieDetailsByRadio(selectedRadio)

});

function getMovieDetailsByRadio(radio){

    const apiUrl= `https://api.themoviedb.org/3/movie/${radio}?api_key=94b6a2d34c3b54e7f76a308cedd0b6b3&append_to_response=images`; 

    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(data) {

            const movie = data.map(movie => ({
                id: movie.id,
                title: movie.original_title, 
                year: movie.release_date,
                image: movie.poster_path, 
            }))

            console.log(movie);

        }, error: function(error) {
            console.error('Errror:', error)
        }
    });
}

function displayMovies(movie) {
    const libraryContainer = $('#library-mov-container');
    libraryContainer.empty();

    movie.forEach(movie => {
        const card = $(`<div class="col d-flex align-items-stretch py-4">
        <div class="card rounded-4" style="width: 18rem;">
            <img src="${movie.image}" class="card-img-top" alt="Get Out Poster" id="poster">
            <div class="card-body d-flex flex-column">
                <h4 class="lblMovName py-3" id="title">${movie.title}</h4>
                <h5 class="lblMeta" id="year">${movie.year}</h5>
                <h5 class="lblMeta" id="duration">- 1h 44min</h5>
                <h5 class="lblMeta" id="genre">- Horror/Thriller</h5>
                <p class="card-text" id="director">Director: Jordan Peele</p>
                <h6 class="imd-score" id="rating">98% - Rotten Tomatoes</h6>

                <!-- icons -->
                <div class="d-grid gap-2 d-md-flex justify-content-md-end icons-cont">
                    <button class="btn btn-warning me-md-2 btnBookmark" type="button"><img
                            src="../assets/icons/bookmark-check.svg" width="25px" height="25px" id="bookmark"></button>
                    <button class="btn btn-warning btnWatched" type="button"><img
                            src="../assets/icons/eye.svg" width="25px" height="25px" id="watch"></button>
                </div>
            </div>
        </div>
    </div>`)

    libraryContainer.append(card);

    });
}