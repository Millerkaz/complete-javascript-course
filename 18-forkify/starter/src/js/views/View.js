import icons from "url:../../img/icons.svg";

export class View {
  _hash = window.location.hash;

  clear() {
    this._textEl.textContent = "";
  }

  renderMessage(type) {
    let text;
    let thisView = this;

    this.clear();

    switch (type) {
      case `message`: {
        //Start by searching for a recipe or an ingredient. Have fun! (recipe view)
        //No bookmarks yet. Find a nice recipe and bookmark it :)  (bookmark)
        return function (mes) {
          text = `
                    <div class="message">
                      <div>
                        <svg>
                          <use href="${icons}#icon-smile"></use>
                        </svg>
                      </div>
                      <p>${mes}</p>
                    </div>
                  `;
          thisView._textEl.insertAdjacentHTML("beforeend", text);
        };
      }
      case `error`: {
        return function (mes, long = false) {
          text = `
                    <div ${
                      long ? `style = max-width:1000px ;` : `a`
                    } class="error">
                        <div>
                          <svg>
                            <use href="${icons}#icon-alert-triangle"></use>
                          </svg>
                        </div>
                        <p>${mes}</p>
                    </div>
                  `;
          thisView._textEl.insertAdjacentHTML("beforeend", text);
        };
      }
      case `spin`: {
        text = `
                    <div class="spinner">
                      <svg>
                        <use href="${icons}#icon-loader"></use>
                      </svg>
                    </div>
                  `;
        thisView._textEl.insertAdjacentHTML("beforeend", text);
        break;
      }
    }
  }

  activeHashTarget(id) {
    [...document.querySelectorAll(".preview__link")].forEach(div => {
      div.classList.remove("preview__link--active");
    });
    [...document.querySelectorAll(".preview__link")].forEach(div => {
      if (div.getAttribute(`href`) === `#${id}`) {
        div.classList.add("preview__link--active");
      }
    });
  }
}
