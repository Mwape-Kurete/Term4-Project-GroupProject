// IMPLEMENTENTING tmdB api 

// tmdb global variables 
const API_KEY = '?api_key=' + '94b6a2d34c3b54e7f76a308cedd0b6b3';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'; 

$(document).ready(function () {

    getMovieData('top_rated');

});

$("input[name='btnCheck']").click(function() {

    const selectOption = $(this).attr('value'); 

    getMovieData(selectOption);

});

function getMovieData(selectOption) {


    const apiUrl = `${BASE_URL}/${selectOption}/${API_KEY}`;

    
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovieData(data.results);
    })
}

function showMovieData(data){

     
    const movieContainer = $('#library-mov-container');
    movieContainer.empty();

    data.forEach(movie => {
        const {title, poster_path, release_date, vote_average, original_language, popularity} = movie;

        const card =$(`
        <div class="col col-12 col-lg-3 col-md-4 d-flex align-items-stretch py-4 movie-cards">
                    <div class="card rounded-4" style="width: 18rem;">
                        <img src="${IMAGE_URL+poster_path}">
                            <h4 class="lblMovName py-3" id="title">${title}</h4>
                            <h5 class="lblMeta" id="year">${release_date}</h5>
                            <h5 class="lblMeta" id="language">original language -${original_language}</h5>
                            <p class="card-text" id="popularity">Popularity - ${popularity}</p>
                            <h6 class="imd-score" id="rating"> IMBD - ${vote_average} </h6>

                            <!-- icons -->
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end icons-cont">
                                <button class="btn btn-warning me-md-2 btnBookmark" type="button"><img
                                        src="../assets/icons/bookmark-check.svg" width="25px" height="25px" id="bookmark"></button>
                                <button class="btn btn-warning btnWatched" type="button"><img
                                        src="../assets/icons/eye.svg" width="25px" height="25px" id="watch"></button>
                            </div>
                        </div>
                    </div>
                </div>`);
    })

}