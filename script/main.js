window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const body = document.body;

  if (scrollPosition > 50) {
    body.style.backgroundColor = '#566246';
    document.querySelectorAll('h1').forEach(function (h1) {
      h1.style.color = '#c17817';
    });
  } else {
    body.style.backgroundColor = 'white';
    document.querySelectorAll('h1').forEach(function (h1) {
      h1.style.color = '#c17817';
    });
  }
});


// IMPLEMENTING tmdB movie api 

//Global variables
const API_KEY = '?api_key=c1a816ca66c3ef114eee6648c734672e';
const BASE_URL_GEN = 'https://api.themoviedb.org/3/movie/top_rated';
const BASE_URL_POPULAR = 'https://api.themoviedb.org/3/movie/popular';
const BASE_URL_NEW = 'https://api.themoviedb.org/3/movie/now_playing';
const BASE_URL_UPCOMING = 'https://api.themoviedb.org/3/movie/upcoming';

let idNum_counter = 0;



const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// The URL for fetching popular movies
const POPULAR_URL = BASE_URL_POPULAR + API_KEY;
const GEN_URL = BASE_URL_GEN + API_KEY;
const NEW_URL = BASE_URL_NEW + API_KEY;
const UPCOMING_URL = BASE_URL_UPCOMING + API_KEY;

//global arrays 

const watchlistArray = [];


const arrUserDetail = JSON.parse(localStorage.getItem('formData'));

$(document).ready(function () {

  console.log(POPULAR_URL + " and " + GEN_URL + "and " + NEW_URL + " and " + UPCOMING_URL);
  // calling fetch's 

  fetchMovies(GEN_URL);
  fetchPopularMovies(POPULAR_URL);
  fetchNewMovies(NEW_URL);
  fetchUpcomingMovies(UPCOMING_URL);

  getUsername(arrUserDetail);

});





//CALLING INNER HTML ELEMENTS

const movContainer_gen = document.getElementById('general_mov_container');

const movContainer_new = document.getElementById('new_mov_container');

const movContainer_popular = document.getElementById('popular_mov_container');

const movContainer_upcoming = document.getElementById('upcoming_mov_container');


// Fetching data from server
function fetchMovies(url_gen) {

  fetch(url_gen)
    .then(response => response.json())
    .then(data => {

      console.log(data.results);

      if (data.results.length != 0) {

        displayMovies(data.results);

      } else {

      }

    });

}

function fetchPopularMovies(url_pop) {

  fetch(url_pop)
    .then(response => response.json())
    .then(data => {

      console.log(data.results);

      if (data.results.length != 0) {

        displayPopularMovies(data.results);

      } else {

      }

    });
}

function fetchNewMovies(url_new) {

  fetch(url_new)
    .then(response => response.json())
    .then(data => {

      console.log(data.results);

      if (data.results.length != 0) {

        displayNewMovies(data.results);

      } else {

      }

    });
}

function fetchUpcomingMovies(url_up) {

  fetch(url_up)
    .then(response => response.json())
    .then(data => {

      console.log(data.results);

      if (data.results.length != 0) {

        displayUpcomingMovies(data.results);

      } else {

      }

    });
}



//DISPLAYING MOVIES 

function displayMovies(gen_data) {

  movContainer_gen.innerHTML = '';

  

  gen_data.forEach(movie_results => {

    const { title, poster_path, release_date, vote_average, original_language, popularity, id } = movie_results;

    const cardEl = document.createElement('div');

    cardEl.classList.add('col', 'col-3', 'col-lg-3', 'col-md-4', 'py-4', 'd-flex', 'align-items-stretch', 'mov_card_full');

    cardEl.innerHTML = `<div class="card rounded-4" style="width: 18rem;" id="${id}">
      <img src="${poster_path ? IMAGE_URL + poster_path : "../assets/images/movie card 5.png"}" class="card-img-top" alt="Movie Poster not available" id="img_card">
      <div class="card-body d-flex flex-column">
          <h4 class="title">${title}</h4>
          <h6 class="lang">${original_language}</h6>
          <h6 class="year">${release_date}</h6>
          <p class="card-text popular_score">${popularity}</p>
          <p class="text-body-tertiary rating">Rating - ${vote_average}</p>

          <!-- icons -->
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end icons-cont mx-auto">
                                    <button class="btn btn-warning me-md-2 btnPlay icon-btn" type="button" onclick="watchNow(this)"  id="${id}"><img
                                            src="../assets/icons/play-circle-fill.svg" width="25px" height="25px" id="play"></button>
                                    <button class="btn btn-warning me-md-2 btnBookmark icon-btn" type="button" onclick="storeMovie(this, ${idNum_counter})" id="${id}"><img
                                            src="../assets/icons/bookmark-check.svg" width="25px" height="25px"  class="addedMovie"id="added${idNum_counter}"></button>
                                </div>

      </div>
  </div>`

    movContainer_gen.append(cardEl);

    idNum_counter = idNum_counter + 1;
    console.log(idNum_counter);

  });

}

function displayPopularMovies(pop_data) {

  movContainer_popular.innerHTML = '';

  

  pop_data.forEach(movie_results => {

    const { title, poster_path, release_date, vote_average, original_language, popularity, id } = movie_results;

    const cardEl = document.createElement('div');

    cardEl.classList.add('col', 'col-3', 'col-lg-3', 'col-md-4', 'py-4', 'd-flex', 'align-items-stretch', 'mov_card_full');

    cardEl.innerHTML = `<div class="card rounded-4" style="width: 18rem;" id="${id}">
      <img src="${poster_path ? IMAGE_URL + poster_path : "../assets/images/movie card 5.png"}" class="card-img-top" alt="Movie Poster not available" id="img_card">
      <div class="card-body d-flex flex-column">
          <h4 class="title">${title}</h4>
          <h6 class="lang">${original_language}</h6>
          <h6 class="year">${release_date}</h6>
          <p class="card-text popular_score">${popularity}</p>
          <p class="text-body-tertiary rating">Rating - ${vote_average}</p>

          <!-- icons -->
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end icons-cont mx-auto">
                                    <button class="btn btn-warning me-md-2 btnPlay icon-btn" type="button" onclick="watchNow(this)"  id="${id}"><img
                                            src="../assets/icons/play-circle-fill.svg" width="25px" height="25px" id="play"></button>
                                    <button class="btn btn-warning me-md-2 btnBookmark icon-btn" type="button" onclick="storeMovie(this, ${idNum_counter})" id="${id}"><img
                                            src="../assets/icons/bookmark-check.svg" width="25px" height="25px"  class="addedMovie"id="added${idNum_counter}"></button>
                                </div>

      </div>
  </div>`

    movContainer_popular.append(cardEl);

    idNum_counter = idNum_counter + 1;
    console.log(idNum_counter);

  });
}

function displayNewMovies(new_data) {

  movContainer_new.innerHTML = '';

  

  new_data.forEach(movie_results => {

    const { title, poster_path, release_date, vote_average, original_language, popularity, id } = movie_results;

    const cardEl = document.createElement('div');

    cardEl.classList.add('col', 'col-3', 'col-lg-3', 'col-md-4', 'py-4', 'd-flex', 'align-items-stretch', 'mov_card_full');

    cardEl.innerHTML = `<div class="card rounded-4" style="width: 18rem;" id="${id}">
      <img src="${poster_path ? IMAGE_URL + poster_path : "../assets/images/movie card 5.png"}" class="card-img-top" alt="Movie Poster not available" id="img_card">
      <div class="card-body d-flex flex-column">
          <h4 class="title">${title}</h4>
          <h6 class="lang">${original_language}</h6>
          <h6 class="year">${release_date}</h6>
          <p class="card-text popular_score">${popularity}</p>
          <p class="text-body-tertiary rating">Rating - ${vote_average}</p>

          <!-- icons -->
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end icons-cont mx-auto">
                                    <button class="btn btn-warning me-md-2 btnPlay icon-btn" type="button" onclick="watchNow(this)"  id="${id}"><img
                                            src="../assets/icons/play-circle-fill.svg" width="25px" height="25px" id="play"></button>
                                    <button class="btn btn-warning me-md-2 btnBookmark icon-btn" type="button" onclick="storeMovie(this, ${idNum_counter})" id="${id}"><img
                                            src="../assets/icons/bookmark-check.svg" width="25px" height="25px"  class="addedMovie"id="added${idNum_counter}"></button>
                                </div>

      </div>
  </div>`

    movContainer_new.append(cardEl);

    idNum_counter = idNum_counter + 1;
    console.log(idNum_counter);

  });
}

function displayUpcomingMovies(up_data) {

  movContainer_upcoming.innerHTML = '';

  

  up_data.forEach(movie_results => {

    const { title, poster_path, release_date, vote_average, original_language, popularity, id } = movie_results;

    const cardEl = document.createElement('div');

    cardEl.classList.add('col', 'col-3', 'col-lg-3', 'col-md-4', 'py-4', 'd-flex', 'align-items-stretch', 'mov_card_full');

    cardEl.innerHTML = `<div class="card rounded-4" style="width: 18rem;" id="${id}">
    <img src="${poster_path ? IMAGE_URL + poster_path : "../assets/images/movie card 5.png"}" class="card-img-top" alt="Movie Poster not available" id="img_card">
    <div class="card-body d-flex flex-column">
        <h4 class="title">${title}</h4>
        <h6 class="lang">${original_language}</h6>
        <h6 class="year">${release_date}</h6>
        <p class="card-text popular_score">${popularity}</p>
        <p class="text-body-tertiary rating">Rating - ${vote_average}</p>

        <!-- icons -->
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end icons-cont mx-auto">
                                    <button class="btn btn-warning me-md-2 btnPlay icon-btn" type="button" onclick="watchNow(this)"  id="${id}"><img
                                            src="../assets/icons/play-circle-fill.svg" width="25px" height="25px" id="play"></button>
                                    <button class="btn btn-warning me-md-2 btnBookmark icon-btn" type="button" onclick="storeMovie(this, ${idNum_counter})" id="${id}"><img
                                            src="../assets/icons/bookmark-check.svg" width="25px" height="25px"  class="addedMovie"id="added${idNum_counter}"></button>
                                </div>

    </div>
</div>`

    movContainer_upcoming.append(cardEl);

    idNum_counter = idNum_counter + 1;
    console.log(idNum_counter);

  });
}


function storeMovie(idElement, num_count) {

  const movieID = idElement.id;
  const added_mov = document.getElementById(`added${num_count}`);

  var isChecked = true;

  console.log(movieID);

  if (watchlistArray.length === 0) {

    watchlistArray.push(movieID);

    added_mov.src = '../assets/icons/bookmark-plus-fill.svg';

  } else {

    if (watchlistArray.includes(movieID)) {
      watchlistArray.forEach((id, idx) => {
        if (id === movieID) {
          watchlistArray.splice(idx, 1);

          isChecked = false;

          added_mov.src = '../assets/icons/bookmark-check.svg';
        }
      })
    } else {

      watchlistArray.push(movieID);

      added_mov.src = '../assets/icons/bookmark-plus-fill.svg';
    }
  }

  console.log(watchlistArray);

  sessionStorage.setItem('movieArray_home', JSON.stringify(watchlistArray));

}

function watchNow(e) {

  const mov_id_watch = e.id;

  console.log(mov_id_watch);

  //localStorage.setItem('single_movie_id', JSON.stringify(mov_id_watch));

  window.location.href = `/pages/detail.html?id=${mov_id_watch}`;



}

function getUsername(userDetails) {

  const navContainer = document.getElementById('username');

  const username = userDetails[0];

  navContainer.innerHTML = `Hello, ${username}`;


}

// Add these variables at the top with your other global variables
const HERO_SLIDER_CONTAINER = document.getElementById('hero-slider');

// Function to populate the hero slider
function populateHeroSlider(movies) {
  HERO_SLIDER_CONTAINER.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, id } = movie;

    const slideEl = document.createElement('div');
    slideEl.classList.add('swiper-slide');

    slideEl.innerHTML = `
      <div class="hero-slide">
        <img src="${poster_path ? IMAGE_URL + poster_path : '../assets/images/movie card 5.png'}" alt="Movie Poster not available" class="hero-image">
        <div class="hero-content">
          <h2>${title}</h2>
          <button class="btn btn-light btn-sm watchlist" id="${id}" onclick="storeMovie(this)">Add to watchlist</button>
          <button class="btn btn-light btn-sm watchNow" id="${id}">Watch Now</button>
        </div>
      </div>
    `;

    HERO_SLIDER_CONTAINER.appendChild(slideEl);
  });

  // Initialize Swiper with autoplay
  new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 5000, // Delay in milliseconds (5 seconds)
    },
  });
}

// Update your fetchMovies function to call populateHeroSlider
function fetchMovies(url_gen) {
  fetch(url_gen)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);

      if (data.results.length !== 0) {
        // Display movies in the hero slider
        populateHeroSlider(data.results);
        // Display other movies
        displayMovies(data.results);
      } else {
        // Handle no results
      }
    });
}

// Call the fetchMovies function to populate the hero slider
fetchMovies(GEN_URL);

