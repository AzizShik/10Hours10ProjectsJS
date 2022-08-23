const formSearch = document.querySelector('.header__form');
const searchLabel = document.querySelector('.header__form-label');
const searchInput = document.querySelector('.header__form-seach');
const faSearch = document.querySelector('.fa-search');
const movies = document.querySelector('.movies');

const API_KEY = '975c44a3-e5de-473f-8fbd-c4fb9998fca2';
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";



function toggleSearch(act, el, classEl) {
  if (act === 'add') {
    el.classList.add(classEl);
  } else if (act === 'remove') {
    el.classList.remove(classEl);
  }
}

const configApi = {
  method: 'GET',
  headers: {
    'X-API-KEY': '975c44a3-e5de-473f-8fbd-c4fb9998fca2',
    'Content-Type': 'application/json',
  },
};

async function getApi(url) {
  try {
    const res = await fetch(url, configApi);
    const data = await res.json();
    const moviesArr = data.films;
    movies.innerHTML = '';
    createMovie(moviesArr);
  } catch (e) {
    console.error(e);
  }
}


function createMovie(obj) {
  obj.forEach(item => {
    movies.innerHTML += `<div class="movie">
                  <img class="movie__img"
                    src="${item.posterUrl}"
                    alt="Movie poster">
                  <div class="movie__info">
                    <div class="movie__info-block">
                      <h3 class="movie__info-title">${item.nameOriginal || item.nameEn || item.nameRu}</h3>
                      <div class="movie__info-year">${item.year}</div>
                    </div>
                    <span class="movie__info-span ${parseFloat(item.rating) >= 8 ? 'green' : parseFloat(item.rating) >= 5 ? 'yellow' : 'red'}">${item.rating}</span>
                  </div>
                  <div class="movie__overview">
                    <h3 class="movie__overview-title">Overview</h3>
                    <p class="movie__overview-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat a
                      quaerat, accusantium corrupti laudantium quasi non in sapiente quos quo beatae dolore temporibus
                      esse
                      impedit magnam perferendis deserunt quod assumenda commodi. </p>
                  </div>
                </div>`;
  });
}
getApi(API_URL_POPULAR);



formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = searchInput.value;
  if(value && value !== '') {
    getApi(API_URL_SEARCH + value);
    searchInput.value = '';
    toggleSearch('remove', searchLabel, 'search--active');
  }
});

searchInput.addEventListener('click', () => {
  toggleSearch('add', searchLabel, 'search--active');
});



