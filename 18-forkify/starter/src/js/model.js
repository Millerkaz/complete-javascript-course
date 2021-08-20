import { API_KEY, RECIPE_PER_PAGE, REQ_WAIT_SEC } from "./config.js";
import { getJSON, postJSON } from "./helper.js";
// import { RECIPE_PER_PAGE } from './config.js';

export let state = {
  recipe: {},

  listPage: {
    pageArr: [],
    currentPage: 1,
  },

  servings: {
    number: "",
    ingredientsForPerson: [],
  },

  bookmark: {
    localStorage: window.localStorage.getItem("bookmarks")
      ? JSON.parse(window.localStorage.getItem("bookmarks"))
      : [],
    toBtnBookmarkFilled: "",
  },
};

function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}

function checkIdInLocalData() {
  if (state.bookmark.localStorage.length === 0) return false;

  return state.bookmark.localStorage.some(obj => obj.id === state.recipe.id);
}

export async function searchRecipe(input) {
  try {
    // initState();

    const data = await Promise.race([
      getJSON(
        `https://forkify-api.herokuapp.com/api/v2/recipes/?search=${input}&key=${API_KEY}`
      ),
      timeout(REQ_WAIT_SEC),
    ]);

    if (data.data.recipes.length === 0) {
      throw new Error(`No recipes found for your query. Please try again!`);
    }

    //? 10 recipes per page in Array
    state.listPage.pageArr = new Array(
      Math.ceil(data.results / RECIPE_PER_PAGE)
    )
      .fill("")
      .map((_, i) =>
        data.data.recipes.slice(
          i * RECIPE_PER_PAGE,
          i * RECIPE_PER_PAGE + RECIPE_PER_PAGE
        )
      );
  } catch (err) {
    throw err;
  }
}

export async function getRecipe(id) {
  try {
    let data = await Promise.race([
      getJSON(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${API_KEY}`
      ),
      timeout(REQ_WAIT_SEC),
    ]);

    data = data.data.recipe;

    state.recipe = {
      id: data.id,
      imgUrl: data.image_url,
      ingredients: data.ingredients,
      servings: data.servings,
      title: data.title,
      sourceUrl: data.source_url,
      publisher: data.publisher,
      cookingTime: data.cooking_time,
      key: data.key,
    };

    if (window.localStorage.getItem("bookmarks")) {
      state.recipe.isBookmark = checkIdInLocalData();
    }

    state.servings.ingredientsForPerson = state.recipe.ingredients.map(
      v => v.quantity / state.recipe.servings
    );
  } catch (err) {
    throw err;
  }
}

export async function postRecipe(data) {
  try {
    let ingredients = Object.entries(data)
      .filter(v => v[0].startsWith(`ingredient`) && v[1])
      .map(v => {
        let [quantity, unit, description] = v[1].split(",");
        quantity = Number(quantity);
        return { quantity, unit, description };
      });

    const userRecipe = {
      id: data.id,
      image_url: data.image,
      ingredients: ingredients,
      servings: data.servings,
      title: data.title,
      source_url: data.sourceUrl,
      publisher: data.publisher,
      cooking_time: data.cookingTime,
    };

    let req = await postJSON(
      `https://forkify-api.herokuapp.com/api/v2/recipes/?key=${API_KEY}`,
      userRecipe
    );

    req = req.data.recipe;

    state.recipe = {
      id: req.id,
      imgUrl: req.image_url,
      ingredients: req.ingredients,
      servings: req.servings,
      title: req.title,
      sourceUrl: req.source_url,
      publisher: req.publisher,
      cookingTime: req.cooking_time,
      key: req.key,
    };

    if (window.localStorage.getItem("bookmarks")) {
      state.recipe.isBookmark = checkIdInLocalData();
    }

    state.servings.ingredientsForPerson = state.recipe.ingredients.map(
      v => v.quantity / state.recipe.servings
    );
  } catch (err) {
    throw err;
  }
}

export function changePage(active) {
  switch (active) {
    case "+": {
      state.listPage.currentPage++;
      if (state.listPage.currentPage > state.listPage.pageArr.length) {
        state.listPage.currentPage = 1;
      }
      break;
    }
    case "-": {
      state.listPage.currentPage--;
      if (state.listPage.currentPage === 0) {
        state.listPage.currentPage = state.listPage.pageArr.length;
      }
      break;
    }
  }
}

export function changePeopleServings(action) {
  let servings = Number(
    document.querySelector(".recipe__info-data--people").textContent
  );
  state.servings.number = action === "+" ? servings + 1 : servings - 1;

  if (state.servings.number === 0) {
    state.servings.number = 1;
  }
}

export function setBookmarks() {
  if (!checkIdInLocalData()) {
    state.bookmark.toBtnBookmarkFilled = true;
    state.bookmark.localStorage.push({
      id: state.recipe.id,
      imgUrl: state.recipe.imgUrl,
      title: state.recipe.title,
      publisher: state.recipe.publisher,
      key: state.recipe.key,
    });
  } else {
    let index = state.bookmark.localStorage.findIndex(
      v => v.id === state.recipe.id
    );
    state.bookmark.localStorage.splice(index, 1);
    state.bookmark.toBtnBookmarkFilled = false;
  }

  window.localStorage.setItem(
    "bookmarks",
    JSON.stringify(state.bookmark.localStorage)
  );
}
