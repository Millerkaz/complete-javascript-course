"use strict";

import * as model from "./model.js";
import recipeView from "../js/views/recipeView.js";
import searchListView from "../js/views/searchListView.js";
import bookmarksView from "../js/views/bookmarksView.js";
import addRecipeView from "../js/views/addRecipeView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

function init() {
  bookmarksView.renderBookmark(model.state.bookmark.localStorage);

  searchListView.addHandler(controlSearchBtnClick, controlPageBtnClick);
  recipeView.addHandler(controlRecipeContainerClick, controlRenderByHash);
  bookmarksView.addHandler(controlBookmarkClick);
  addRecipeView.addHandler(
    controlAddRecipeBtnClick,
    controlAddRecipeFormUpload
  );
}

init();

////////////////////////////////////////////////////////////////
//* searchListView

//? search btn click
async function controlSearchBtnClick() {
  try {
    const input = searchListView.getSearchInput();

    searchListView.searchBarClear();
    searchListView.pageBarHidden();

    searchListView.renderMessage(`spin`); //view

    await model.searchRecipe(input); //Model

    searchListView.renderRecipeList(model.state.listPage);
  } catch (err) {
    searchListView.renderMessage("error")(err);
  }
}

//? page click (Delegation)
function controlPageBtnClick(type) {
  if (type === "+") {
    model.changePage("+");
    searchListView.renderRecipeList(model.state.listPage);
  }
  if (type === "-") {
    model.changePage("-");
    searchListView.renderRecipeList(model.state.listPage);
  }
}

//? recipes list click (Delegation)
// function controlRecipeListClick(id) {
//     let id = win
// }

////////////////////////////////////////////////////////////////
//* recipeView

//? container click (Delegation)
function controlRecipeContainerClick(type) {
  //add favor (btn--round)
  if (type === "bookmark click") {
    model.setBookmarks();
    bookmarksView.btnBookmarkSet(model.state.bookmark.toBtnBookmarkFilled);
    bookmarksView.renderBookmark(model.state.bookmark.localStorage);
    // <use href="${icons}#icon-bookmark-fill"></use>
  }
  //increase people (btn--increase-servings)
  if (type === "+") {
    model.changePeopleServings("+");
    recipeView.renderServings(model.state.servings);
  }
  //decrease people (btn--decrease-servings)
  if (type === "-") {
    model.changePeopleServings("-");
    recipeView.renderServings(model.state.servings);
  }
}

async function controlRenderByHash(id) {
  try {
    recipeView.renderMessage(`spin`);
    await model.getRecipe(id);

    recipeView.renderRecipe(model.state.recipe);
  } catch (err) {
    recipeView.renderMessage("error")(err);
  }
}

////////////////////////////////////////////////////////////////
//* bookmarkView

//? nav list click (Delegation)
function controlBookmarkClick() {
  bookmarksView.renderBookmark(model.state.bookmark.localStorage);
}

////////////////////////////////////////////////////////////////
//* addRecipeView

function controlAddRecipeBtnClick() {
  addRecipeView.removeHidden();
}

//? add recipe window click (Delegation)
async function controlAddRecipeFormUpload() {
  try {
    const formData = addRecipeView.formUpload();
    addRecipeView.renderAlert();
    await model.postRecipe(formData);

    addRecipeView.renderMessage("message")(
      `Your recipe has been uploaded !`,
      true
    );

    setTimeout(addRecipeView.addHidden.bind(addRecipeView), 1000);

    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // addRecipeView.addHidden();
    recipeView.renderMessage(`spin`);

    recipeView.renderRecipe(model.state.recipe);
    model.setBookmarks();
    bookmarksView.btnBookmarkSet(model.state.bookmark.toBtnBookmarkFilled);
    bookmarksView.renderBookmark(model.state.bookmark.localStorage);
  } catch (err) {
    addRecipeView.renderMessage("error")(err, true);
  }
}

/////////////////////////////////////////////////////////////////////////

/*
window.addEventListener("hashchange",function(
  window.location.hash
))
*/

//* View
/////////////////////////////////////////////////////////////////////////
/*
function renderRecipe(data, ingredients) {
  let text = `        
  <figure class="recipe__fig">
  <img src=${data.data.recipe.image_url} alt="${
    data.data.recipe.title
  }" class="recipe__img" />
  <h1 class="recipe__title">
  <span>${data.data.recipe.title}</span>
  </h1>
  </figure>
  
  <div class="recipe__details">
  <div class="recipe__info">
  <svg class="recipe__info-icon">
  <use href="${icons}#icon-clock"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--minutes">${
    data.data.recipe.cooking_time
  }</span>
  <span class="recipe__info-text">minutes</span>
  </div>
  <div class="recipe__info">
  <svg class="recipe__info-icon">
  <use href="${icons}#icon-users"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--people">${
    data.data.recipe.servings
  }</span>
  <span class="recipe__info-text">servings</span>
  
  <div class="recipe__info-buttons">
  <button class="btn--tiny btn--decrease-servings">
  <svg>
  <use href="${icons}#icon-minus-circle"></use>
  </svg>
  </button>
  <button class="btn--tiny btn--increase-servings">
  <svg>
  <use href="${icons}#icon-plus-circle"></use>
  </svg>
  </button>
  </div>
  </div>
  
  <div class="recipe__user-generated">          
  </div>
  <button class="btn--round">
  <svg class="">
  <use href="${icons}#icon-bookmark-fill"></use>
  </svg>
  </button>
  </div>
  
  <div class="recipe__ingredients">
  <h2 class="heading--2">Recipe ingredients</h2>
  <ul class="recipe__ingredient-list">
  ${ingredients
    .map(obj => {
      return `
      <li class="recipe__ingredient">
      <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${obj.quantity ? obj.quantity : ''}</div>
      <div class="recipe__description">
      <span class="recipe__unit">${obj.unit ? obj.unit : ''}</span>
      ${obj.description}
      </div>
      </li>`;
    })
    .join('')}
    </ul>
    </div>
    
    <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
    This recipe was carefully designed and tested by
    <span class="recipe__publisher">${
      data.data.recipe.publisher
    }</span>. Please check out
    directions at their website.
    </p>
    <a
    class="btn--small recipe__btn"
    href=${data.data.recipe.source_url}
    target="_blank"
    >
    <span>Directions</span>
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
    </svg>
    </a>
    </div>
    `;

  recipeContainer.textContent = '';
  recipeContainer.insertAdjacentHTML('beforeend', text);
}

function renderMessage(mes) {
  let text;
  recipeContainer.textContent = '';

  switch (mes) {
    case `message`: {
      text = `
              <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>Start by searching for a recipe or an ingredient. Have fun!</p>
              </div>
            `;
      recipeContainer.insertAdjacentHTML('beforeend', text);
      break;
    }
    case `error`: {
      resultEl.textContent = '';
      text = `
              <div class="error">
                  <div>
                    <svg>
                      <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                  </div>
                  <p>No recipes found for your query. Please try again!</p>
              </div>
            `;
      recipeContainer.insertAdjacentHTML('beforeend', text);
      break;
    }
    case `spin`: {
      text = `
              <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
            `;
      recipeContainer.insertAdjacentHTML('beforeend', text);
      break;
    }
  }
}

function renderRecipeList(data, curPage = 1) {
  resultEl.textContent = '';
  data[curPage - 1]
    .map(
      recipe => `
          <li class="preview">
            <a class="preview__link preview__link--active" href="#${recipe.id}">
              <figure class="preview__fig">
                <img src=${recipe.image_url} alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
              </div>
            </a>
          </li>
          `
    )
    .forEach(v => {
      resultEl.insertAdjacentHTML('beforeend', v);
    });

  renderPageBar(data, curPage);
}

function renderPageBar(data, page) {
  if (data.length === 1) return;
  paginationEl.classList.remove('hidden');
  btnPagePre.classList.remove('hidden');
  btnPageNext.classList.remove('hidden');
  btnPagePre.children[1].textContent = `Page ${page - 1}`;
  btnPageNext.children[0].textContent = `Page ${page + 1}`;

  if (page === 1) {
    btnPagePre.children[1].textContent = `Page ${data.length}`;
  }

  if (page === data.length) {
    btnPageNext.children[0].textContent = `Page 1`;
  }
}

function changePeopleServings(action) {
  let personNum = Number(
    document.querySelector('.recipe__info-data--people').textContent
  );

  personNum = action === '+' ? personNum + 1 : personNum - 1;

  if (personNum === 0) {
    personNum + 1;
    return;
  }

  document.querySelector('.recipe__ingredient-list').textContent = '';
  document.querySelector('.recipe__info-data--people').textContent = personNum;

  //DRY: 刪除變數curIngredients
  let text = curIngredients
    .map((v, i) => {
      if (!v.quantity) return v;

      let addOne = v;
      v.quantity =
        action === '+'
          ? v.quantity + originalQuant[i] * (1 / 4)
          : v.quantity - originalQuant[i] * (1 / 4);
      return addOne;
    })
    .map(obj => {
      return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
    <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${obj.quantity ? obj.quantity : ''}</div>
    <div class="recipe__description">
    <span class="recipe__unit">${obj.unit ? obj.unit : ''}</span>
    ${obj.description}
    </div>
    </li>`;
    })
    .join('');

  document
    .querySelector('.recipe__ingredient-list')
    .insertAdjacentHTML('beforeend', text);
}
*/
