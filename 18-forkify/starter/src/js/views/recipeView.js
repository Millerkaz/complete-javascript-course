import { View } from './View.js';
import icons from 'url:../../img/icons.svg';

class RecipeView extends View {
  _textEl = document.querySelector('.recipe');
  _data;

  addHandler(controlRecipeContainerClick, controlRenderByHash) {
    this._textEl.addEventListener('click', function (e) {
      //add favor (btn--round)
      if (e.target.closest('.btn--round')) {
        controlRecipeContainerClick('bookmark click');
      }
      //increase people (btn--increase-servings)
      if (e.target.closest('.btn--increase-servings')) {
        controlRecipeContainerClick('+');
      }
      //decrease people (btn--decrease-servings)
      if (e.target.closest('.btn--decrease-servings')) {
        controlRecipeContainerClick('-');
      }
    });

    ['load', 'hashchange'].forEach(ev => {
      function temp() {
        let id = window.location.hash?.slice(1);
        if (!id) return;
        this.activeHashTarget(id);
        controlRenderByHash(id);
      }
      window.addEventListener(ev, temp.bind(this));
    });
  }

  _createHTMLText() {
    return `        
    <figure class="recipe__fig">
        <img src=${this._data.imgUrl} alt=${
      this._data.title
    } class="recipe__img" />
        <h1 class="recipe__title">
        <span>${this._data.title}</span>
        </h1>
    </figure>

    <div class="recipe__details">
        <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
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

        ${
          this._data.key
            ? `
        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>`
            : ''
        }
        <button class="btn--round">
        <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.isBookmark ? '-fill' : ''
    }"></use>
        </svg>
        </button>
    </div>

    <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients
          .map(obj => {
            return `
              <li class="recipe__ingredient">
              <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                obj.quantity ? obj.quantity : ''
              }</div>
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
        <span class="recipe__publisher">${this._data.publisher}</span>. Please
        check out directions at their website.
        </p>
        <a
        class="btn--small recipe__btn"
        href=${this._data.sourceUrl}
        target="_blank"
        >
        <span>Directions</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </a>
    </div>
    </div>
  `;
  }

  renderRecipe(data) {
    this.clear();
    this._data = data;
    this._textEl.insertAdjacentHTML('beforeend', this._createHTMLText());
  }

  renderServings(servings) {
    let quantityArr = Array.from(
      this._textEl.querySelectorAll('.recipe__quantity')
    );

    quantityArr.forEach((v, i) => {
      if (!servings.ingredientsForPerson[i]) return;
      v.innerHTML = servings.ingredientsForPerson[i] * servings.number;
    });

    this._textEl.querySelector('.recipe__info-data--people').textContent =
      servings.number;
  }
}

export default new RecipeView();
