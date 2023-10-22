window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const body = document.body;

    if (scrollPosition > 50) {
        body.style.backgroundColor = '#566246';
        document.querySelectorAll('h1').forEach(function(h1) {
            h1.style.color = '#c17817'; 
        });
    } else {
        body.style.backgroundColor = 'white'; 
        document.querySelectorAll('h1').forEach(function(h1) {
            h1.style.color = '#c17817'; 
        });
    }
});


// IMPLEMENTING tmdB movie api 

const API_KEY = '?api_key=' + '94b6a2d34c3b54e7f76a308cedd0b6b3';
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular/';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

$(document).ready(function(){
    getMoviesByFirstLetter('a');
});

$("input[name='letterFilter']").click(function(){
    const selectedLetter = $(this).attr('value');
    getMoviesByFirstLetter(selectedLetter);
});

function getMoviesByFirstLetter(letter) {
    const apiURL = 'https://api.themoviedb.org/3/movie/popular/';
    

    $.ajax({
        url: apiURL,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const movies = data.results.map(movie => ({
                id: movie.id,
                name: movie.title,
                image: movie.poster,
            }));

            displayMovies(movies);
        },
        
    });
}

function displayMovies(movies) {
    const moviesContainer = $('#moviesContainer'); 
    moviesContainer.empty();

    movies.forEach(movie => {
        const card = $(`
        <div class="row watchlist-mov py-5">
        <div class="col-3 d-flex align-items-stretch">
            <div class="card rounded-4" style="width: 18rem;">
                <img src="assets/images/movie card 9.png" class="card-img-top" alt="The Expendables 4">
                <div class="card-body d-flex flex-column">
                    <h4>The Expendables 4</h4>
                    <h6>2023 - 1h 43min -Action/Adventure</h6>
                    <p class="card-text">Director: Scott Waugh</p>
                    <p class="text-body-tertiary rating">Rating - 4.9/10</p>
                </div>
            </div>
        </div>`);

        card.click(function() {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        moviesContainer.append(card);
    });
}
