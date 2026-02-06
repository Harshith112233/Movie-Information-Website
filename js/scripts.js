const apiKey = '21362ef4';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    if (searchTerm) {
        fetchMovies(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`).then(data => {
            if (data.Response === "True") {
                displaySearchResults(data.Search);
            } else {
                searchResults.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
            }
        });
    }
});
searchInput.addEventListener('input', debounce(() => {
    const searchTerm = searchInput.value;
    if (searchTerm) {
fetchMovies(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`).then(data => {
            if (data.Response === "True") {
                displaySearchResults(data.Search);
            } else {
                searchResults.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
            }
        });
    }
}, 300));
async function fetchMovies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}function displaySearchResults(results) {
    searchResults.innerHTML = '';
    results.forEach(result => {
        const resultCard = document.createElement('div');
        resultCard.className = 'resultCard';
        resultCard.innerHTML = `
            <img src="${result.Poster}" alt="${result.Title}" data-imdbid="${result.imdbID}">
            <h2>${result.Title} (${result.Year})</h2>
        `;
        resultCard.addEventListener('click', () => {
            window.location.href = `movie.html?imdbID=${result.imdbID}`;
        });
        searchResults.appendChild(resultCard);
    });
}
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}
const popularMovieIDs = ['tt1630029','tt4154796','tt7286456','tt1790809','tt1375666','tt4849438','tt0454921','tt6105098','tt0120338','tt1457767','tt0816692','tt16116174','tt0468569','tt2250912','tt2091384','tt3722118','tt1211837','tt5034838','tt0988045','tt21692408','tt27511275','tt0118799','tt0249795','tt0054215','tt3735246','tt6836936','tt15398776','tt0172495','tt11322920','tt6139732'];
function displayPopularMovies() {
    const popularMoviesSection = document.getElementById('popularMovies');
    popularMovieIDs.forEach(imdbID => {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
            .then(response => response.json())
            .then(movieData => {
                const moviePoster = document.createElement('img');
                moviePoster.src = movieData.Poster;
                moviePoster.classList.add('movie-poster');
                moviePoster.addEventListener('click', () => {
                    window.open(`movie.html?imdbID=${imdbID}`, '_blank');
                });
                popularMoviesSection.appendChild(moviePoster);
            });
    });
}
displayPopularMovies();