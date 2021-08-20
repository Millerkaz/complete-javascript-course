import { View } from './View.js';
import icons from 'url:../../img/icons.svg';

class bookmarksView extends View {
  _iconEl;
  _textEl = document.querySelector('.bookmarks__list');

  addHandler(controlBookmarkClick) {
    window.addEventListener('hashchange', controlBookmarkClick);
  }

  btnBookmarkSet(check) {
    this._iconEl =
      document.querySelector('.btn--round').children[0].children[0];

    this._iconEl.setAttribute(
      'href',
      `${icons}#icon-bookmark${check ? '-fill' : ''}`
    );
  }

  renderBookmark(data) {
    if (!data || data.length === 0) {
      this.renderMessage('message')(
        `No bookmarks yet. Find a nice recipe and bookmark it :)`
      );
      return;
    }

    this.clear();
    data.forEach(obj => {
      let userIcon = `<div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
                `;
      let text = `
        <li class="preview">
          <a class="preview__link  ${
            obj.id === window.location.hash.slice(1)
              ? 'preview__link--active'
              : ''
          }" href="#${obj.id}">
            <figure class="preview__fig">
              <img src=${obj.imgUrl} alt="Test" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">
                ${obj.title}
              </h4>
              <p class="preview__publisher">${obj.publisher}</p>
            </div>
            ${obj.key ? userIcon : ''}
          </a>
        </li>
        `;
      this._textEl.insertAdjacentHTML('beforeend', text);
    });
  }
}

export default new bookmarksView();
