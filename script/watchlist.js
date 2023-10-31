$(document).ready(function () {

    const arrMoviesData = JSON.parse(localStorage.getItem('arrMovies'));

    showWatchlistMovies(arrMoviesData);

    console.log(arrMoviesData);

});

// tmdb global variables 
const API_KEY = '?api_key=' + '2348b3158ad558d789bf75055253fb91';
const BASE_URL2 = 'https://api.themoviedb.org/3/movie/';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';


//end of gloabal vars 

const watchlistContainer = document.getElementById('watchlist-movies');

function getIdData() {

    for (i = 0; i < movData.length; i++) {

        let movieId = movData[i];

        const url = BASE_URL2 + movieId + '/' + API_KEY;

        $.ajax({
            url: url, 
            method: 'GET', 
            dataType: 'json', 
            success: function(data) {
                //mapping 

                const movieData
            }
        })

    }
}


function showWatchlistMovies(movData) {

    watchlistContainer.innerHTML = '';


    if (movData.length != 0) {
        for (i = 0; i < movData.length; i++) {

            let movieId = movData[i];

            let idAPI = BASE_URL2 + movieId + '/' + API_KEY;

            //idAPI.forEach(movie => {

            //const { title, poster_path, release_date, vote_average, original_language, popularity, id } = movie;


            const movieDataElement = document.createElement('div');

            movieDataElement.classList.add('col', 'col-12', 'col-lg-3', 'col-md-4', 'd-flex', 'align-items-stretch', 'py-4', 'movie-cards');

            movieDataElement.innerHTML = `
                            <div class="card rounded-4" style="width: 18rem;">
                                <img src="${idAPI.poster_path ? IMAGE_URL + idAPI.poster_path : "../assets/images/download (7).jpeg"}" class="rounded-4 mov-movie-poster">
                                    <div class="card-content">
                                        <h4 class="lblMovName py-3" id="title">${idAPI.title}</h4>
                                        <h5 class="lblMeta" id="year">${idAPI.release_date}</h5>
                                        <h5 class="lblMeta" id="language">original language -${idAPI.original_language}</h5>
                                        <p class="card-text" id="popularity">Popularity - ${idAPI.popularity}</p>
                                        <h6 class="imd-score" id="rating"> IMBD - ${idAPI.vote_average} </h6>
                                    
                                        <!-- icons -->
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-end icons-cont">
                                            <button class="btn btn-warning me-md-2 btnBookmark" type="button"><img
                                                    src="../assets/icons/play-circle-fill.svg" width="25px" height="25px" id="play"></button>
                                            <button class="btn btn-warning me-md-2 btnBookmark" type="button" onclick="getMovieId(this)" id="${idAPI.id}"><img
                                                    src="../assets/icons/bookmark-check.svg" width="25px" height="25px" ></button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

            watchlistContainer.append(movieDataElement);

            // });

        }
    } else {
        watchlistContainer.innerHTML = `<h1>404 ERROR: No Results found</h1>`
    }



}