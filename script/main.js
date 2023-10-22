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
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

function displayMovies(movies) {
    const moviesContainer = $('#moviesContainer'); 
    moviesContainer.empty();

    movies.forEach(movie => {
        const card = $(`
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card">
                    <img src="${movie.image}" class="card-img-top" alt="${movie.name}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.name}</h5>
                        <a href="#" class="btn btn-primary">View Movie</a>
                    </div>
                </div>
            </div>`);

        card.click(function() {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        moviesContainer.append(card);
    });
}