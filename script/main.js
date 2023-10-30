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

$(document).ready(function() {}) 
    const API_KEY = '?api_key=c1a816ca66c3ef114eee6648c734672e';
    const BASE_URL = 'https://api.themoviedb.org/3/movie/popular/';
    const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

    $(document).ready(function() {
        // TMDb API key
        const API_KEY = '?api_key=c1a816ca66c3ef114eee6648c734672e';
        
        // The base URL for TMDb API
        const BASE_URL = 'https://api.themoviedb.org/3/';
      
        // The URL for fetching popular movies
        const POPULAR_MOVIES_URL = `${BASE_URL}movie/popular${API_KEY}`;
      
        // The base URL for movie images
        const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
      
        // Function to fetch popular movies and display them
        function fetchAndDisplayPopularMovies() {
          fetch(POPULAR_MOVIES_URL)
            .then(response => response.json())
            .then(data => {
              // Check if the data contains movies
              if (data.results && data.results.length > 0) {
                const moviesContainer = document.getElementById("movies-container");
      
                // Loop through the movie results and create HTML elements for each movie
                data.results.forEach(movie => {
                  // Create a div element for each movie
                  const movieDiv = document.createElement("div");
                  movieDiv.className = "movie-item"; // You can define your CSS class for movie items
      
                  // Create HTML content for the movie (title, poster, etc.)
                  movieDiv.innerHTML = `
                    <h2>${movie.title}</h2>
                    <img src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title} Poster">
                    <p>${movie.overview}</p>
                  `;
      
                  // Add a button to add this movie to the watchlist
                  const addToWatchlistButton = document.createElement("button");
                  addToWatchlistButton.textContent = "Add to Watchlist";
                  addToWatchlistButton.addEventListener("click", () => {
                    addToWatchlist(movie);
                  });
                  movieDiv.appendChild(addToWatchlistButton);
      
                  // Append the movie item to the movies container
                  moviesContainer.appendChild(movieDiv);
                });
              }
            })
            .catch(error => {
              // Handle any errors that occur during the fetch
              console.error("Error fetching movie data: ", error);
            });
        }
      
        // Call the function to fetch and display popular movies
        fetchAndDisplayPopularMovies();
      });

 