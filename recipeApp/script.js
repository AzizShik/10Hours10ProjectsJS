window.addEventListener('load', () => {
  const bodyEl = document.querySelector('body');
  const mainEl = document.querySelector('.main');
  const mainInner = document.querySelector('.main__inner');
  const mealImgEl = document.querySelector('.meal__img');
  const mealTitleEl = document.querySelector('.meal__title');
  const categoryInner = document.querySelector('.menu__inner');
  const areasInner = document.querySelector('.areas__inner');
  const popupImgBlock = document.querySelector('.popup .img-block');
  const popupInfo = document.querySelector('.popup__info');
  const popupEl = document.querySelector('.popup');
  const areasEl = document.querySelector('.areas');
  const headerEl = document.querySelector('.header');
  const searchInput = document.querySelector('.header__search-input');
  const headerFormSearch = document.querySelector('.header__search');
  const mainTitleEl = document.querySelector('.main__tilte');
  const favMealCounter = document.querySelector('.header__fav-counter');
  const headerFavBtn = document.querySelector('.header__fav');

  let favoriveMealsId = [];

  if (localStorage.getItem('mealid')) {
    console.log(JSON.parse(localStorage.getItem('mealid')));
    favoriveMealsId = JSON.parse(localStorage.getItem('mealid'));
    favMealCounter.textContent = favoriveMealsId.length;
  }

  async function getRandomMeal() {
    const res = await fetch(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    );
    const data = await res.json();
    const mealData = data.meals[0];
    createMealItem(mealData);
  }

  function createMealItem(mealData) {
    const mealThumb = mealData.strMealThumb;
    const mealTitle = mealData.strMeal;
    const mealArea = mealData.strArea;
    const mealCategory = mealData.strCategory;
    const mealEl = document.createElement('div');
    mealEl.classList.add('meal');
    mealEl.setAttribute('data-meal', `${mealData.idMeal}`);
    mealEl.innerHTML = `
            <div class="meal__img-block"><img class="meal__img" src="${mealThumb}" alt="meal thumb"></div>
            <div class="meal__bottom">
              <div class="meal__info">
                <h2 class="meal__title">${mealTitle}</h2>
                <h2 class="meal__category">Category: ${mealCategory}</h2>
                <h2 class="meal__area">Area: ${mealArea}</h2>
              </div>
              <div class="meal__fav">
                <button class="meal__fav-btn btn">
                  <span class="material-symbols-outlined material-icons">
                    favorite
                  </span>
                </button>
              </div>
            </div>
    `;
    mainInner.append(mealEl);
  }

  async function getCategoryMeals() {
    const res = await fetch(
      'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    );
    const data = await res.json();
    createCategory(data);
  }

  function createCategory(data) {
    const mealData = data.meals;
    const categoryList = document.createElement('ul');
    categoryList.classList.add('menu-list');
    mealData.forEach((e) => {
      if (e.strCategory != 'Pork') {
        categoryList.innerHTML += `
          <li class="menu-item"><a class="menu-link category-link" href="#">${e.strCategory}</a></li>
        `;
      }
    });
    categoryInner.append(categoryList);
  }

  async function getAreaMeals() {
    const res = await fetch(
      'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
    );
    const data = await res.json();
    createAreaMeals(data);
  }

  function createAreaMeals(data) {
    const mealData = data.meals;
    const areasList = document.createElement('ul');
    areasList.classList.add('menu-list');
    mealData.forEach((e) => {
      if (e.strArea.toLowerCase() != 'unknown') {
        areasList.innerHTML += `
          <li class="menu-item"><a class="menu-link areas-link" href="#">${e.strArea}</a></li>
        `;
      }
    });
    areasInner.append(areasList);
  }

  async function getMealById(id) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    return data;
  }

  function createPopup(data) {
    const mealData = data.meals[0];
    const mealThumb = mealData.strMealThumb;
    const mealTitle = mealData.strMeal;
    const mealArea = mealData.strArea;
    const mealCategory = mealData.strCategory;
    const mealDescr = mealData.strInstructions;
    popupImgBlock.innerHTML = `
      <img class="popup__img" src="${mealThumb}" alt="MealThumb">
    `;
    popupInfo.innerHTML = `
                <h2 class="popup__title">${mealTitle}</h2>
          <h2 class="popup__category">Category: ${mealCategory}</h2>
          <h2 class="popup__area">Area: ${mealArea}</h2>
          <p class="popup__descr">${mealDescr}</p>
          <ul class="popup__list"></ul>
    `;

    const popupList = document.querySelector('.popup__list');

    for (let i = 1; i <= 20; i++) {
      let strIngredient = 'strIngredient' + '' + i;
      let strMeasure = 'strMeasure' + '' + i;
      if (mealData[strIngredient]) {
        popupList.innerHTML += `<li class="popup__item"> ${capitalizeFirstLetter(
          mealData[strIngredient]
        )} ${
          mealData[strMeasure] && mealData[strMeasure] != ' ' ? '/' : ''
        }  ${capitalizeFirstLetter(mealData[strMeasure])}</li>`;
      } else {
        break;
      }
    }

    popupOpen();
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function popupOpen() {
    popupEl.classList.add('popup--active');
    const lockPaddingValue =
      window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    if (bodyEl.offsetWidth >= 1200) {
      document.documentElement.style.overflow = 'hidden';
      bodyEl.style.paddingRight = lockPaddingValue;
      headerEl.style.paddingRight = lockPaddingValue;
    }
  }

  function popupClose() {
    popupEl.classList.remove('popup--active');
    if (bodyEl.offsetWidth >= 1200) {
      document.documentElement.style.overflow = 'auto';
      bodyEl.style.paddingRight = '0px';
      headerEl.style.paddingRight = '0px';
    }
  }

  async function searchByIng(value) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`
    );
    const data = await res.json();
    return data;
  }

  async function searchMeals(value) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
    const data = await res.json();
    mainInner.innerHTML = '';
    mainTitleEl.textContent = `Results for "${value}"...`;
    if (data.meals) {
      data.meals.forEach((e) => createMealItem(e));
    } else {
      (async function () {
        const meals = await searchByIng(value);
        if (meals.meals) {
          meals.meals.forEach(async function (e) {
            const meal = await getMealById(e.idMeal);
            createMealItem(meal.meals[0]);
          });
        } else {
          mainTitleEl.textContent = `Failed to find results for "${value}"...`;
        }
      })();
    }
  }

  headerFavBtn.addEventListener('click', () => {
    mainInner.innerHTML = '';
    mainTitleEl.textContent = `Your Favority Meals`;
    favoriveMealsId.forEach(async function (e) {
      const meal = await getMealById(e);
      createMealItem(meal.meals[0]);
    });
  });

  mainEl.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('meal')) {
      (async function () {
        const meal = await getMealById(el.dataset.meal);
        createPopup(meal);
      })();
    }

    if (el.classList.contains('category-link')) {
      e.preventDefault();
      const categoryLinks = document.querySelectorAll('.menu-link');
      categoryLinks.forEach((e) => e.classList.remove('menu-link--active'));
      el.classList.add('menu-link--active');
      getMealByCategory(el.textContent);
      mainTitleEl.textContent = `Results for "${el.textContent}"...`;
    }

    if (el.classList.contains('areas-link')) {
      e.preventDefault();
      const categoryLinks = document.querySelectorAll('.menu-link');
      categoryLinks.forEach((e) => e.classList.remove('menu-link--active'));
      el.classList.add('menu-link--active');
      getMealByArea(el.textContent);
      mainTitleEl.textContent = `Results for "${el.textContent}"...`;
    }

    if (el.classList.contains('meal__fav-btn')) {
      el.classList.add('meal__fav-btn--active');
      const meal = el.closest('.meal');
      favoriveMealsId.push(meal.dataset.meal);
      favoriveMealsId = makeUniqArr(favoriveMealsId);
      console.log(favoriveMealsId);
      localStorage.setItem('mealid', JSON.stringify(favoriveMealsId));
      favMealCounter.textContent = favoriveMealsId.length;
    }
  });

  function makeUniqArr(arr) {
    const uniqSet = new Set(arr);
    return [...uniqSet];
  }

  async function getMealByCategory(value) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`
    );
    const data = await res.json();
    mainInner.innerHTML = '';

    data.meals.map(async function (e) {
      const meal = await getMealById(e.idMeal);
      createMealItem(meal.meals[0]);
    });
  }

  async function getMealByArea(value) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`
    );
    const data = await res.json();
    mainInner.innerHTML = '';

    data.meals.map(async function (e) {
      const meal = await getMealById(e.idMeal);
      createMealItem(meal.meals[0]);
    });
  }

  popupEl.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('popup__close')) {
      popupClose();
    }
    if (el.classList.contains('popup__body')) {
      popupClose();
    }
  });

  headerFormSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = searchInput.value;
    if (value) {
      searchMeals(value);
      searchInput.value = '';
      const menuLinks = document.querySelectorAll('.menu-link');
      menuLinks.forEach((e) => e.classList.remove('menu-link--active'));
    }
  });

  getRandomMeal();
  getRandomMeal();
  getRandomMeal();
  getRandomMeal();
  getRandomMeal();
  getRandomMeal();

  getCategoryMeals();
  getAreaMeals();
});
