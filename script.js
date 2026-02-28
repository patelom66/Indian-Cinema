const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&primary_release_date.gte=2025-01-01&with_original_language=hi&api_key=5011cc885c47b3a12b33af73bfcc299f&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?api_key=5011cc885c47b3a12b33af73bfcc299f&query=";
const main = document.getElementById("section");
const detailSection = document.getElementById("detail-section");

const form = document.getElementById("form");
const search = document.getElementById("query");
const homeTab = document.getElementById("home-tab");
const detailTab = document.getElementById("detail-tab");

let currentMovies = [];

returnMovie(APILINK);

function returnMovie(url) {
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data.results);
      currentMovies = data.results;
      renderMovies(data.results);
    });
}

function renderMovies(movies) {
  main.innerHTML = "";
  movies.forEach((element) => {
    const div_row = document.createElement("div");
    div_row.setAttribute("class", "row");

    const div_column = document.createElement("div");
    div_column.setAttribute("class", "column");

    const div_card = document.createElement("div");
    div_card.setAttribute("class", "card");
    div_card.onclick = () => showDetails(element);

    const image = document.createElement("img");
    image.setAttribute("class", "thumbnail");
    image.src = IMG_PATH + element.poster_path;

    const title = document.createElement("h3");
    title.innerHTML = `${element.title}`;

    const center = document.createElement("center");
    center.appendChild(image);
    div_card.appendChild(center);
    div_card.appendChild(title);
    div_column.appendChild(div_card);
    div_row.appendChild(div_column);

    main.appendChild(div_row);
  });
}




function showDetails(movie) {
  main.style.display = "none";
  detailSection.style.display = "flex";
  detailTab.style.display = "block";

  homeTab.classList.remove("active");
  detailTab.classList.add("active");

  detailSection.innerHTML = `
        <div class="detail-container">
            <img src="${IMG_PATH + movie.poster_path}" class="detail-poster">
            <div class="detail-info">
                <h2>${movie.title}</h2>
                <p>${movie.overview}</p>
                <div class="detail-meta">
                    Release Date: ${movie.release_date} | Rating: ${movie.vote_average}/10
                </div>
            </div>
        </div>
    `;
  window.scrollTo(0, 0);
}

homeTab.addEventListener("click", (e) => {
  e.preventDefault();
  main.style.display = "block";
  detailSection.style.display = "none";
  homeTab.classList.add("active");
  detailTab.classList.remove("active");
});

detailTab.addEventListener("click", (e) => {
  e.preventDefault();
  if (detailSection.innerHTML !== "") {
    main.style.display = "none";
    detailSection.style.display = "flex";
    homeTab.classList.remove("active");
    detailTab.classList.add("active");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchItem = search.value;
  if (searchItem) {
    returnMovie(SEARCHAPI + searchItem);
    search.value = "";
    // Switch back to home view on search
    main.style.display = "block";
    detailSection.style.display = "none";
    homeTab.classList.add("active");
    detailTab.classList.remove("active");
  }
});