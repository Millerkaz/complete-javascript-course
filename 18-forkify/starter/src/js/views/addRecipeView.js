import { View } from "./View.js";

class addRecipeView extends View {
  _addRecipeBtnEl = document.querySelector(".nav__btn--add-recipe");
  _overlayEl = document.querySelector(".overlay");
  _parentEl = document.querySelector(".add-recipe-window");
  _textEl = document.querySelector(".alert");
  _formEl = this._parentEl.querySelector(".upload");
  _closeBtnEl = this._parentEl.querySelector(".btn--close-modal");
  _uploadBtnEl = this._parentEl.querySelector(".upload__btn");

  constructor() {
    super();
    this._closeBtnEl.addEventListener("click", this.addHidden.bind(this));
    this._overlayEl.addEventListener("click", this.addHidden.bind(this));
    this._formEl.addEventListener("click", function (e) {
      e.preventDefault();
    });
  }

  addHandler(controlAddRecipeBtnClick, controlAddRecipeFormUpload) {
    this._addRecipeBtnEl.addEventListener("click", controlAddRecipeBtnClick);
    this._uploadBtnEl.addEventListener("click", controlAddRecipeFormUpload);
  }

  addHidden() {
    this._parentEl.classList.add("hidden");
    this._overlayEl.classList.add("hidden");
    this._textEl.classList.add("hidden");
  }

  removeHidden() {
    this._parentEl.classList.remove("hidden");
    this._overlayEl.classList.remove("hidden");
  }

  renderAlert() {
    this._parentEl.classList.add("hidden");
    this._textEl.classList.remove("hidden");
    this.renderMessage("spin");
  }

  formUpload() {
    const dataArr = [...new FormData(document.querySelector(".upload"))];
    const data = Object.fromEntries(dataArr);

    return data;
  }
}

export default new addRecipeView();
