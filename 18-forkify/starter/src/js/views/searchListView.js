import { View } from './View.js';
import icons from 'url:../../img/icons.svg';

class SearchList extends View {
  _searchEl = document.querySelector('.search');
  _textEl = document.querySelector('.results');
  _searchBarEl = document.querySelector('.search__field');
  _paginationEl = document.querySelector('.pagination');

  constructor() {
    super();
    this.searchBarClear();
    // this._textEl.addEventListener('click', function (e) {
    //   [...this.children].forEach(div =>
    //     div.classList.remove('preview__link--active')
    //   );

    //   e.target.closest('.preview').classList.add('preview__link--active');
    // });
  }

  addHandler(controlSearchBtnClick, controlPageBtnClick) {
    function han1(e) {
      e.preventDefault();

      if (!e.target.closest('.search__btn')) return;
      controlSearchBtnClick();
    }

    this._searchEl.addEventListener('click', han1.bind(this));

    this._paginationEl.addEventListener('click', function (e) {
      if (e.target.closest('.pagination__btn--next')) {
        controlPageBtnClick('+');
      }
      if (e.target.closest('.pagination__btn--prev')) {
        controlPageBtnClick('-');
      }
    });
  }

  getSearchInput() {
    return this._searchBarEl.value;
  }

  searchBarClear() {
    this._searchBarEl.value = '';
  }

  renderRecipeList(data) {
    this.clear();
    if (data.pageArr.length === 0) return;

    data.pageArr[data.currentPage - 1]
      .map(recipe => {
        let userIcon = `<div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
                `;

        return `
                <li class="preview ">
                  <a class="preview__link ${
                    recipe.id === document.location.hash.slice(1)
                      ? 'preview__link--active'
                      : ''
                  }" href="#${recipe.id}">
                    <figure class="preview__fig">
                      <img src=${recipe.image_url} alt="Test" />
                    </figure>
                    <div class="preview__data">
                      <h4 class="preview__title">${recipe.title}</h4>
                      <p class="preview__publisher">${recipe.publisher}</p>
                      ${recipe.key ? userIcon : ''}
                    </div>
                  </a>
                </li>
                `;
      })
      .forEach(v => {
        this._textEl.insertAdjacentHTML('beforeend', v);
      });

    this.renderPageBar(data);
  }

  pageBarHidden() {
    this._paginationEl.classList.add('hidden');
    this._paginationEl
      .querySelector('.pagination__btn--prev')
      .classList.add('hidden');
    this._paginationEl
      .querySelector('.pagination__btn--next')
      .classList.add('hidden');
  }

  renderPageBar(data) {
    const btnPagePre = document.querySelector('.pagination__btn--prev');
    const btnPageNext = document.querySelector('.pagination__btn--next');

    this.pageBarHidden();

    if (data.pageArr.length <= 1) return;

    btnPagePre.children[1].textContent = `Page ${data.currentPage - 1}`;
    btnPageNext.children[0].textContent = `Page ${data.currentPage + 1}`;
    this._paginationEl.classList.remove('hidden');

    if (data.currentPage === 1) {
      btnPagePre.children[1].textContent = `Page ${data.pageArr.length}`;
      btnPageNext.classList.remove('hidden');
      return;
    }

    if (data.currentPage === data.pageArr.length) {
      btnPageNext.children[0].textContent = `Page 1`;
      btnPagePre.classList.remove('hidden');
      return;
    }

    btnPageNext.classList.remove('hidden');
    btnPagePre.classList.remove('hidden');
  }
}

export default new SearchList();
