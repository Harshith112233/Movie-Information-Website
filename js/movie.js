const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');
fetch(`http://www.omdbapi.com/?apikey=21362ef4&i=${imdbID}`)
    .then(response => response.json())
    .then(data => {
        displayMovieDetails(data);
    })
    .catch(error => console.error('Error:', error));

function displayMovieDetails(movie) {
    document.getElementById('title').textContent = `${movie.Title} (${movie.Year})`;
    document.getElementById('poster').src = movie.Poster;
    document.getElementById('release').textContent =  movie.Released;
    document.getElementById('director').textContent =  movie.Director;
    document.getElementById('cast').textContent =  movie.Actors;
    document.getElementById('genre').textContent = movie.Genre;
    document.getElementById('rating').textContent =  movie.imdbRating;
    document.getElementById('duration').textContent =  movie.Runtime;
    document.getElementById('languages').textContent =  movie.Language;
    document.getElementById('plot').textContent =  movie.Plot;   
}
const moviePosters = document.querySelectorAll('.resultCard img');
moviePosters.forEach(poster => {
    poster.addEventListener('click', function() {
        const imdbID = this.getAttribute('data-imdbid');
        fetchMovieDetails(imdbID);
    });
});

