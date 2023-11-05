// GLOBAL VARIABLES 

// tmdb global variables 
const API_KEY_ = '?api_key=' + '94b6a2d34c3b54e7f76a308cedd0b6b3';
const BASE_URL_ = 'https://api.themoviedb.org/3/discover/movie';
const IMAGE_URL_ = 'https://image.tmdb.org/t/p/w500';

const API_URL_ = BASE_URL_ + API_KEY_;

//const GEN_URL= 'https://api.themoviedb.org/3/discover/movie/';

//filter appends -> global variables 

const YEAR_FILT = "&sort_by=primary_release_date.asc"; 
const VOTE_FILT = "&sort_by=vote_average.desc";

// end of filter appends -> global variables 

const movieContainer = document.getElementById('movies');
const tagsElement = document.getElementById('tags');

const arrUserDetail_lib = JSON.parse(localStorage.getItem('formData'));

const arrWatchlistMovies = [];

const genreTypes = [
	{
		"id": 28,
		"name": "Action"
	},
	{
		"id": 12,
		"name": "Adventure"
	},
	{
		"id": 16,
		"name": "Animation"
	},
	{
		"id": 35,
		"name": "Comedy"
	},
	{
		"id": 80,
		"name": "Crime"
	},
	{
		"id": 99,
		"name": "Documentary"
	},
	{
		"id": 18,
		"name": "Drama"
	},
	{
		"id": 10751,
		"name": "Family"
	},
	{
		"id": 14,
		"name": "Fantasy"
	},
	{
		"id": 36,
		"name": "History"
	},
	{
		"id": 27,
		"name": "Horror"
	},
	{
		"id": 10402,
		"name": "Music"
	},
	{
		"id": 9648,
		"name": "Mystery"
	},
	{
		"id": 10749,
		"name": "Romance"
	},
	{
		"id": 878,
		"name": "Science Fiction"
	},
	{
		"id": 10770,
		"name": "TV Movie"
	},
	{
		"id": 53,
		"name": "Thriller"
	},
	{
		"id": 10752,
		"name": "War"
	},
	{
		"id": 37,
		"name": "Western"
	}
];

const arrGenreSelector = [];


getMovieData(API_URL_);

//getGeneralMovieData(API_GEN);

// Global Vars end 
$(document).ready(function () {

	
    getUsername(arrUserDetail_lib);

});

function sendFilterApi(select){

	const filterSelect = select.id; 

	const api_yearFilter = API_URL_ + YEAR_FILT;
	const api_ratingFilter = API_URL_ + VOTE_FILT; 
	const defaultUrl = API_URL_;

	if(filterSelect == "default"){

		//only if show all filter is selected
		console.log("selected: " + filterSelect);

		getMovieData(defaultUrl);

	} else if(filterSelect == "filter_year" ){

		//only if year filter is selected
		console.log("selected: " + filterSelect);

		getMovieData(api_yearFilter);

	}else if(filterSelect == "filter_rating"){
		//only if rating filter selected
		console.log("selected: " + filterSelect);

		getMovieData(api_ratingFilter);
	}
	
	
}

//calling immediatly
setGenre();

function setGenre() {

	tagsElement.innerHTML = ''; //to load dynamically

	genreTypes.forEach(genre => {

		const tg = document.createElement('div');
		
		tg.classList.add('btn', 'btn-secondary', 'btn-sm', 'rounded-4', 'm-1', 'tag',);
		tg.id = genre.id;
		tg.innerText = genre.name;

		tg.addEventListener('click', () => {
			if (arrGenreSelector.length === 0) {

				arrGenreSelector.push(genre.id);
			} else {

				if (arrGenreSelector.includes(genre.id)) {
					arrGenreSelector.forEach((id, idx) => {
						if (id === genre.id) {
							arrGenreSelector.splice(idx, 1);
						}
					})
				} else {

					arrGenreSelector.push(genre.id);
				}
			}
			console.log(arrGenreSelector);

			getMovieData(API_URL_ + '&with_genres=' + encodeURI(arrGenreSelector.join(',')));
			showSelection()

		});

		tagsElement.append(tg);
	});
}

function showSelection() {

	const tags = document.querySelectorAll('.tag');

	tags.forEach(tag => {
		tag.classList.remove('selected');
	});

	if (arrGenreSelector != 0) {

		arrGenreSelector.forEach(id => {

			const selectedTag = document.getElementById(id);

			selectedTag.classList.add('selected');

		})
	}
}



function getMovieData(url) {

	

	fetch(url).then(res => res.json()).then(data => {
		console.log(data.results);

		if (data.results.length != 0) {
			showMovieData(data.results);
		} else {
			movieContainer.innerHTML = `<h1>404 ERROR: No Results found</h1>`
		}

	})
}


function showMovieData(data) {

	movieContainer.innerHTML = '';

	

	let idNum = 0;

	data.forEach(movie => {

		const { title, poster_path, release_date, vote_average, original_language, popularity, id } = movie;

		const movieDataElement = document.createElement('div');

		movieDataElement.classList.add('col', 'col-12', 'col-lg-3', 'col-md-4', 'd-flex', 'align-items-stretch', 'py-4', 'movie-cards');

		movieDataElement.innerHTML = `
                    <div class="card rounded-4" style="width: 18rem;">
                        <img src="${poster_path ? IMAGE_URL + poster_path : "../assets/images/download (7).jpeg"}" class="rounded-4 mov-movie-poster">
                            <div class="card-content">
                                <h4 class="lblMovName py-3" id="title">${title}</h4>
                                <h5 class="lblMeta" id="year">${release_date}</h5>
                                <h5 class="lblMeta" id="language">original language -${original_language}</h5>
                                <p class="card-text" id="popularity">Popularity - ${popularity}</p>
                                <h6 class="imd-score" id="rating"> IMBD - ${vote_average} </h6>
                            
                                <!-- icons -->
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end icons-cont mx-auto">
                                    <button class="btn btn-warning me-md-2 btnPlay icon-btn" type="button" onclick="getSingleMoviesId(this)"  id="${id}"><img
                                            src="../assets/icons/play-circle-fill.svg" width="25px" height="25px" id="play"></button>
                                    <button class="btn btn-warning me-md-2 btnBookmark icon-btn" type="button" onclick="getMovieId(this, ${idNum})" id="${id}"><img
                                            src="../assets/icons/bookmark-check.svg" width="25px" height="25px"  class="addedMovie"id="added${idNum}"></button>
                                </div>
                            </div>
                        </div>
                    </div>`;

		movieContainer.append(movieDataElement);

		idNum = idNum + 1; 
		console.log(idNum);

	});


}

//get movie ID

function getMovieId(element, num) {

	const added = document.getElementById(`added${num}`);

	const idVal = element.id;
	var flag = true;

	console.log(idVal);

	if (arrWatchlistMovies.length === 0 && flag == true) {

		arrWatchlistMovies.push(idVal);

		added.src = '../assets/icons/bookmark-plus-fill.svg';

	} else {

		if (arrWatchlistMovies.includes(idVal)) {
			arrWatchlistMovies.forEach((id, idx) => {
				if (id === idVal) {
					arrWatchlistMovies.splice(idx, 1);

					flag = false;

					added.src = '../assets/icons/bookmark-check.svg';
				}
			})
		} else if(flag == true){

			arrWatchlistMovies.push(idVal);

			added.src = '../assets/icons/bookmark-plus-fill.svg';
		}
	}

	console.log(arrWatchlistMovies);

	sessionStorage.setItem('arrMovies', JSON.stringify(arrWatchlistMovies));


}


function getSingleMoviesId(e){

	const singleId = e.id; 

	localStorage.setItem('single_movie_id', JSON.stringify(singleId));

	window.location.href=`detail.html?id=${singleId}`;

	console.log(singleId);

}

function getUsername(userDetails){

    const navContainer = document.getElementById('username');

    const username = userDetails[0]; 

    navContainer.innerHTML = `Hello, ${username}`; 


}