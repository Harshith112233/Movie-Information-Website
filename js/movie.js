const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get("imdbID");

fetch(`https://www.omdbapi.com/?apikey=21362ef4&i=${imdbID}`)
  .then(res => res.json())
  .then(data => {
    displayMovieDetails(data);
  })
  .catch(err => console.error(err));

function displayMovieDetails(movie) {

  /* -------- BLURRED BACKGROUND -------- */
  const bg = document.querySelector(".movie-bg");
  bg.style.backgroundImage = `url(${movie.Poster})`;

  /* -------- BASIC DETAILS -------- */
  document.getElementById("title").textContent =
    `${movie.Title} (${movie.Year})`;

  const poster = document.getElementById("poster");
  poster.src = movie.Poster;

  document.getElementById("release").textContent = movie.Released;
  document.getElementById("director").textContent = movie.Director;
  document.getElementById("cast").textContent = movie.Actors;
  document.getElementById("genre").textContent = movie.Genre;
  document.getElementById("rating").textContent = movie.imdbRating;
  document.getElementById("duration").textContent = movie.Runtime;
  document.getElementById("languages").textContent = movie.Language;
  document.getElementById("plot").textContent = movie.Plot;

  /* -------- DYNAMIC ACCENT COLOR -------- */
  poster.onload = () => {
    applyAccentFromPoster(poster);
  };
}

/* ================= COLOR EXTRACTION ================= */
function applyAccentFromPoster(img) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  let r = 0, g = 0, b = 0, count = 0;

  for (let i = 0; i < data.length; i += 40) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }

  r = Math.floor(r / count);
  g = Math.floor(g / count);
  b = Math.floor(b / count);

  document.documentElement.style.setProperty(
    "--accent",
    `rgb(${r}, ${g}, ${b})`
  );
}
