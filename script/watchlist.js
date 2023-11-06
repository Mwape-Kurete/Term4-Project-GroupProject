// start of global Variables 

// tmdb global variables 
const API_KEY2 = '?api_key=' + '2348b3158ad558d789bf75055253fb91';
const BASE_URL2 = 'https://api.themoviedb.org/3/movie/';
const IMAGE_URL2 = 'https://image.tmdb.org/t/p/w500';

// ----------------------------------------------------------------------------------------------------- 

// fetching from local and session storage

const arrMovies_Library = JSON.parse(sessionStorage.getItem('arrMovies'));
const arrMovies_Index =  JSON.parse(sessionStorage.getItem('movieArray_home'));

const arrUserDetail_watch = JSON.parse(localStorage.getItem('formData'));

// -----------------------------------------------------------------------------------------------------

// concatinating arrays from library and home page 

const arrMoviesData = arrMovies_Index.concat(arrMovies_Library);

// -----------------------------------------------------------------------------------------------------

// getting html containers 

const watchlistContainer = document.getElementById('watchlist-movies');

// -----------------------------------------------------------------------------------------------------


//end of gloabal vars 

// -----------------------------------------------------------------------------------------------------



$(document).ready(function () {

    console.log(arrMoviesData);


    getIdData(arrMoviesData);

    getUsername(arrUserDetail_watch);


});



function getIdData(arrData) {

    let arrMovies = [];

    console.log("the data parameter: " + arrData);

    if (arrData != 0) {
        for (i = 0; i < arrData.length; i++) {

            let movieId = arrMoviesData[i];

            const apiUrl = BASE_URL2 + movieId + API_KEY2;

            console.log("the url: " + apiUrl);

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzQ4YjMxNThhZDU1OGQ3ODliZjc1MDU1MjUzZmI5MSIsInN1YiI6IjY1NDExZDk0NDU1N2EwMDEzYWMwMzNlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.npDQj6_n-RPfN1exbW24m4LITqOvE6SskVwdPKl9A8k'
                }
            };

            fetch(`${apiUrl}language=en-US`, options)
                .then(response => response.json())
                .then(response => {

                    console.log(response);

                    arrMovies.push(response);

                    console.log(arrMovies);

                    showWatchlistMovies(arrMovies);

                })
                .catch(err => console.error(err));
        }

    } else {
        watchlistContainer.innerHTML = `<h1>404 ERROR: No Results found</h1>`
    }

    //START OF CODE THAT IS NOT WORKING BELOW 

    // const fetchData = () => { fetch(apiUrl).then(res => res.json()).then(data => {

    //         arrMovies = data;

    //         console.log(arrMovies);

    //         if (arrMovies.length != 0) {
    //             showWatchlistMovies(arrMovies);
    //         } else {
    //             watchlistContainer.innerHTML = `<h1>404 ERROR: No Results found</h1>`
    //         }

    //     })
    // }

    // $.ajax({
    //     url: url,
    //     method: 'GET',
    //     dataType: 'json',
    //     success: function (data) {
    //         //mapping 

    //         //data to map 
    //         //title, poster_path, release_date, vote_average, original_language, popularity, id 

    //         const movieData = data.films.map(movieData => ({

    //             id: movieData.id,
    //             name: movieData.title,
    //             img: movieData.poster_path,
    //             year: movieData.release_date,
    //             score: movieData.vote_average,
    //             lang: movieData.original_language,
    //             popularity: movieData.popularity,

    //         }))

    //         console.log(movieData);
    //         showWatchlistMovies(movieData);
    //     }
    // })


    // fetch(apiUrl).then(res => res.json()).then(data => {

    //     arrMovies = data.results;

    //     console.log(arrMovies);

    // 	if (arrMovies.length != 0) {
    // 		showWatchlistMovies(arrMovies);
    // 	} else {
    // 		watchlistContainer.innerHTML = `<h1>404 ERROR: No Results found</h1>`
    // 	}

    // })

    //END OF CODE THAT IS NOT WORKING
}


function showWatchlistMovies(movData) {

    watchlistContainer.innerHTML = '';

    let count = 0; 

    movData.forEach(movData => {

        const { title, poster_path, release_date, vote_average, original_language, popularity, id } = movData;



        const movieDataElement = document.createElement('div');

        movieDataElement.classList.add('col', 'col-12', 'col-lg-3', 'col-md-4', 'd-flex', 'align-items-stretch', 'py-4', 'movie-cards');

        movieDataElement.setAttribute('id', `card-no${count}`);

        
        movieDataElement.innerHTML = `
                            <div class="card rounded-4" style="width: 18rem;">
                                <img src="${poster_path ? IMAGE_URL2 + poster_path : "../assets/images/download (7).jpeg"}" class="rounded-4 mov-movie-poster">
                                    <div class="card-content">
                                        <h4 class="lblMovName py-3" id="title">${title}</h4>
                                        <h5 class="lblMeta" id="year">${release_date}</h5>
                                        <h5 class="lblMeta" id="language">original language -${original_language}</h5>
                                        <p class="card-text" id="popularity">Popularity - ${popularity}</p>
                                        <h6 class="imd-score" id="rating"> IMBD - ${vote_average} </h6>
                                    
                                        <!-- icons -->
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-end icons-cont">
                                            <button class="btn btn-warning me-md-2 btnBookmark" type="button" onclick="getSingleMoviesId(this)"  id="${id}"><img
                                                    src="../assets/icons/play-circle-fill.svg" width="25px" height="25px" id="play"></button>
                                            <button class="btn btn-warning me-md-2 btnBookmark" type="button" onclick="removeMovie(${count})" id="${id}"><img
                                                    src="../assets/icons/bookmark-x-fill.svg" width="25px" height="25px" ></button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

        watchlistContainer.append(movieDataElement);

        count = count + 1;
        console.log(count);
    });

}


// NAV TO SINGLE MOVIE PAGE


function getSingleMoviesId(e){

	const singleId = e.id; 

	localStorage.setItem('single_movie_id', JSON.stringify(singleId));

	window.location.href=`detail.html?id=${singleId}`;

	console.log(singleId);

}

function removeMovie(cardId){

    const selectCard = document.getElementById(`card-no${cardId}`); 

    selectCard.remove();
    

}




function getUsername(userDetails){

    const navContainer = document.getElementById('username');

    const username = userDetails[0]; 

    navContainer.innerHTML = `Hello, ${username}`; 


}