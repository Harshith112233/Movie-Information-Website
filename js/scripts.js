document.addEventListener("DOMContentLoaded", () => {

  const apiKey = '21362ef4';

  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchResults = document.getElementById('searchResults');

  /* ---------- SEARCH BUTTON ---------- */
  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      fetchMovies(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
        .then(data => {
          if (data.Response === "True") {
            displaySearchResults(data.Search);
          } else {
            searchResults.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
          }
        });
    }
  });

  /* ---------- SEARCH AS YOU TYPE ---------- */
  searchInput.addEventListener('input', debounce(() => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      fetchMovies(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
        .then(data => {
          if (data.Response === "True") {
            displaySearchResults(data.Search);
          } else {
            searchResults.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
          }
        });
    } else {
      searchResults.innerHTML = '';
    }
  }, 300));

  /* ---------- FETCH ---------- */
  async function fetchMovies(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  /* ---------- DISPLAY SEARCH ---------- */
  function displaySearchResults(results) {
    searchResults.innerHTML = '';
    results.forEach(result => {
      const resultCard = document.createElement('div');
      resultCard.className = 'resultCard';
      resultCard.innerHTML = `
        <img src="${result.Poster !== 'N/A' ? result.Poster : 'images/no-image.png'}">
        <h3>${result.Title} (${result.Year})</h3>
      `;
      resultCard.addEventListener('click', () => {
        window.location.href = `movie.html?imdbID=${result.imdbID}`;
      });
      searchResults.appendChild(resultCard);
    });
  }

  /* ---------- DEBOUNCE ---------- */
  function debounce(func, delay) {
    let debounceTimer;
    return function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(func, delay);
    };
  }

  /* ---------- POPULAR MOVIES ---------- */
  const popularMovieIDs = [
    'tt1630029','tt4154796','tt7286456','tt1790809','tt1375666','tt0468569',
    'tt4849438','tt0454921','tt6105098','tt0120338','tt1457767','tt10872600',
    'tt0816692','tt0373889','tt15097216','tt1568346','tt2096673','tt2091384'
  ];

  function displayPopularMovies() {
    const popularMoviesSection = document.getElementById('popularMovies');
    popularMovieIDs.forEach(imdbID => {
      fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
        .then(res => res.json())
        .then(movie => {
          const img = document.createElement('img');
          img.src = movie.Poster;
          img.className = 'movie-poster';
          img.addEventListener('click', () => {
            window.open(`movie.html?imdbID=${imdbID}`, '_blank');
          });
          popularMoviesSection.appendChild(img);
        });
    });
  }

  displayPopularMovies();

});