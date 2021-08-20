// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"f5b2e98ff1d0093ff85e60fa692c60be":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "afa9a926299ee1a847cffaa748240fa0";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"e92452c3da7039e1625e3e27adb6109d":[function(require,module,exports) {
require('./bundle-manifest').register(JSON.parse("{\"47cffaa748240fa0\":\"controller.afa9a926.js\",\"e9702d543a8b715d\":\"icons.bbce15e5.svg\"}"));
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ba8df6b71e73837c465d69bebde6e64d":[function(require,module,exports) {
"use strict";

var mapping = {};

function register(pairs) {
  var keys = Object.keys(pairs);

  for (var i = 0; i < keys.length; i++) {
    mapping[keys[i]] = pairs[keys[i]];
  }
}

function resolve(id) {
  var resolved = mapping[id];

  if (resolved == null) {
    throw new Error('Could not resolve bundle with id ' + id);
  }

  return resolved;
}

module.exports.register = register;
module.exports.resolve = resolve;
},{}],"175e469a7ea7db1c8c0744d04372621f":[function(require,module,exports) {
"use strict";

require("core-js/modules/web.immediate.js");

var model = _interopRequireWildcard(require("./model.js"));

var _recipeView = _interopRequireDefault(require("../js/views/recipeView.js"));

var _searchListView = _interopRequireDefault(require("../js/views/searchListView.js"));

var _bookmarksView = _interopRequireDefault(require("../js/views/bookmarksView.js"));

var _addRecipeView = _interopRequireDefault(require("../js/views/addRecipeView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// https://forkify-api.herokuapp.com/v2
function init() {
  _bookmarksView.default.renderBookmark(model.state.bookmark.localStorage);

  _searchListView.default.addHandler(controlSearchBtnClick, controlPageBtnClick);

  _recipeView.default.addHandler(controlRecipeContainerClick, controlRenderByHash);

  _bookmarksView.default.addHandler(controlBookmarkClick);

  _addRecipeView.default.addHandler(controlAddRecipeBtnClick, controlAddRecipeFormUpload);
}

init(); ////////////////////////////////////////////////////////////////
//* searchListView
//? search btn click

async function controlSearchBtnClick() {
  try {
    const input = _searchListView.default.getSearchInput();

    _searchListView.default.searchBarClear();

    _searchListView.default.pageBarHidden();

    _searchListView.default.renderMessage(`spin`); //view


    await model.searchRecipe(input); //Model

    _searchListView.default.renderRecipeList(model.state.listPage);
  } catch (err) {
    _searchListView.default.renderMessage("error")(err);
  }
} //? page click (Delegation)


function controlPageBtnClick(type) {
  if (type === "+") {
    model.changePage("+");

    _searchListView.default.renderRecipeList(model.state.listPage);
  }

  if (type === "-") {
    model.changePage("-");

    _searchListView.default.renderRecipeList(model.state.listPage);
  }
} //? recipes list click (Delegation)
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

    _bookmarksView.default.btnBookmarkSet(model.state.bookmark.toBtnBookmarkFilled);

    _bookmarksView.default.renderBookmark(model.state.bookmark.localStorage); // <use href="${icons}#icon-bookmark-fill"></use>

  } //increase people (btn--increase-servings)


  if (type === "+") {
    model.changePeopleServings("+");

    _recipeView.default.renderServings(model.state.servings);
  } //decrease people (btn--decrease-servings)


  if (type === "-") {
    model.changePeopleServings("-");

    _recipeView.default.renderServings(model.state.servings);
  }
}

async function controlRenderByHash(id) {
  try {
    _recipeView.default.renderMessage(`spin`);

    await model.getRecipe(id);

    _recipeView.default.renderRecipe(model.state.recipe);
  } catch (err) {
    _recipeView.default.renderMessage("error")(err);
  }
} ////////////////////////////////////////////////////////////////
//* bookmarkView
//? nav list click (Delegation)


function controlBookmarkClick() {
  _bookmarksView.default.renderBookmark(model.state.bookmark.localStorage);
} ////////////////////////////////////////////////////////////////
//* addRecipeView


function controlAddRecipeBtnClick() {
  _addRecipeView.default.removeHidden();
} //? add recipe window click (Delegation)


async function controlAddRecipeFormUpload() {
  try {
    const formData = _addRecipeView.default.formUpload();

    _addRecipeView.default.renderAlert();

    await model.postRecipe(formData);

    _addRecipeView.default.renderMessage("message")(`Your recipe has been uploaded !`, true);

    setTimeout(_addRecipeView.default.addHidden.bind(_addRecipeView.default), 1000);
    window.history.pushState(null, "", `#${model.state.recipe.id}`); // addRecipeView.addHidden();

    _recipeView.default.renderMessage(`spin`);

    _recipeView.default.renderRecipe(model.state.recipe);

    model.setBookmarks();

    _bookmarksView.default.btnBookmarkSet(model.state.bookmark.toBtnBookmarkFilled);

    _bookmarksView.default.renderBookmark(model.state.bookmark.localStorage);
  } catch (err) {
    _addRecipeView.default.renderMessage("error")(err, true);
  }
} /////////////////////////////////////////////////////////////////////////

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
},{"core-js/modules/web.immediate.js":"140df4f8e97a45c53c66fead1f5a9e92","./model.js":"aabf248f40f7693ef84a0cb99f385d1f","../js/views/recipeView.js":"bcae1aced0301b01ccacb3e6f7dfede8","../js/views/searchListView.js":"1ec0ee688cad9996109a8aeee196f198","../js/views/bookmarksView.js":"7ed9311e216aa789713f70ebeec3ed40","../js/views/addRecipeView.js":"4dd83c2a08c1751220d223c54dc70016"}],"140df4f8e97a45c53c66fead1f5a9e92":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global');

var task = require('../internals/task');

var FORCED = !global.setImmediate || !global.clearImmediate; // http://w3c.github.io/setImmediate/

$({
  global: true,
  bind: true,
  enumerable: true,
  forced: FORCED
}, {
  // `setImmediate` method
  // http://w3c.github.io/setImmediate/#si-setImmediate
  setImmediate: task.set,
  // `clearImmediate` method
  // http://w3c.github.io/setImmediate/#si-clearImmediate
  clearImmediate: task.clear
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/task":"dd47ece3e1296f193ccefcf3056d1754"}],"10044f24ecae4059b4af184e71d3fba2":[function(require,module,exports) {
var global = require('../internals/global');

var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var redefine = require('../internals/redefine');

var setGlobal = require('../internals/set-global');

var copyConstructorProperties = require('../internals/copy-constructor-properties');

var isForced = require('../internals/is-forced');
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/set-global":"7e47fd3b4d01808069dad42c38d45146","../internals/copy-constructor-properties":"df952df9fa85293fe01bbdf9f7116b1b","../internals/is-forced":"700278f8e2cb4c21784f4e50866ce0e4"}],"7e78823454e7f795898745d93279f917":[function(require,module,exports) {
var global = arguments[3];

var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();
},{}],"5e181b7e7dcb1bb2de0a726b7af1e93d":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPropertyKey = require('../internals/to-property-key');
var has = require('../internals/has');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-property-is-enumerable":"6d666488e852af6845747bbd2705cc05","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-property-key":"df2b61336906907f777029fe90c882a8","../internals/has":"ce850695ec64cefd211ef6863461b802","../internals/ie8-dom-define":"e03ae13f7b17b2e21331d728bd059d1a"}],"7e006cebe93fc4773e87d3146a8fa81b":[function(require,module,exports) {
var fails = require('../internals/fails');

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"e16fc2ec92bf0d6254ffef14ea12ad77":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],"6d666488e852af6845747bbd2705cc05":[function(require,module,exports) {
'use strict';
var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

},{}],"8c5551ce5a79ddcd7162c3e3c8f33c9a":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"debf68affb1e9f1283fa252d49c32ceb":[function(require,module,exports) {
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":"35ae890303b620d792cd5faa73776178","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37"}],"35ae890303b620d792cd5faa73776178":[function(require,module,exports) {
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/classof-raw":"901e5a25291bac244011feea921975b2"}],"901e5a25291bac244011feea921975b2":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"5617d8f084e26c58afcbde9a0982cf37":[function(require,module,exports) {
// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

},{}],"df2b61336906907f777029fe90c882a8":[function(require,module,exports) {
var toPrimitive = require('../internals/to-primitive');
var isSymbol = require('../internals/is-symbol');

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : String(key);
};

},{"../internals/to-primitive":"2a7f05f0f9119d3b88a770acfa30cc7b","../internals/is-symbol":"7500e07108c47e5d25bda62049b8b4ba"}],"2a7f05f0f9119d3b88a770acfa30cc7b":[function(require,module,exports) {
var isObject = require('../internals/is-object');
var isSymbol = require('../internals/is-symbol');
var ordinaryToPrimitive = require('../internals/ordinary-to-primitive');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = input[TO_PRIMITIVE];
  var result;
  if (exoticToPrim !== undefined) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

},{"../internals/is-object":"03244e745134af366d66b74456891052","../internals/is-symbol":"7500e07108c47e5d25bda62049b8b4ba","../internals/ordinary-to-primitive":"beb7e03593f40bc8230218c946b07a98","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"03244e745134af366d66b74456891052":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"7500e07108c47e5d25bda62049b8b4ba":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return typeof $Symbol == 'function' && Object(it) instanceof $Symbol;
};

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/use-symbol-as-uid":"ea1988735f852716e8c2b0bf1a7f981c"}],"a8e7e15d3af5a0a555019aebcf7ed164":[function(require,module,exports) {
var global = require('../internals/global');

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"ea1988735f852716e8c2b0bf1a7f981c":[function(require,module,exports) {
/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = require('../internals/native-symbol');

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

},{"../internals/native-symbol":"f4c6561c5780f812466dd472171f0916"}],"f4c6561c5780f812466dd472171f0916":[function(require,module,exports) {
/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = require('../internals/engine-v8-version');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

},{"../internals/engine-v8-version":"e23493e3b068d06b425cfae337547b80","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"e23493e3b068d06b425cfae337547b80":[function(require,module,exports) {
var global = require('../internals/global');

var userAgent = require('../internals/engine-user-agent');

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"143c26fec04440461ecc4dae3ad13828":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164"}],"beb7e03593f40bc8230218c946b07a98":[function(require,module,exports) {
var isObject = require('../internals/is-object');

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (pref !== 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"../internals/is-object":"03244e745134af366d66b74456891052"}],"df9ad61e8404f948b528f2ef2becebe4":[function(require,module,exports) {
var global = require('../internals/global');

var shared = require('../internals/shared');

var has = require('../internals/has');

var uid = require('../internals/uid');

var NATIVE_SYMBOL = require('../internals/native-symbol');

var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  }

  return WellKnownSymbolsStore[name];
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/shared":"1950ed6cf8f0dece2a998d60590e9098","../internals/has":"ce850695ec64cefd211ef6863461b802","../internals/uid":"d5b7e7679d9dac163ab327cbf9508501","../internals/native-symbol":"f4c6561c5780f812466dd472171f0916","../internals/use-symbol-as-uid":"ea1988735f852716e8c2b0bf1a7f981c"}],"1950ed6cf8f0dece2a998d60590e9098":[function(require,module,exports) {
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.16.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/shared-store":"050f18cf9a95404c13e77ce244078f47"}],"f767c4b71b5cfe3ee6c1a7e54bdcafa0":[function(require,module,exports) {
module.exports = false;

},{}],"050f18cf9a95404c13e77ce244078f47":[function(require,module,exports) {
var global = require('../internals/global');

var setGlobal = require('../internals/set-global');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/set-global":"7e47fd3b4d01808069dad42c38d45146"}],"7e47fd3b4d01808069dad42c38d45146":[function(require,module,exports) {
var global = require('../internals/global');

module.exports = function (key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }

  return value;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"ce850695ec64cefd211ef6863461b802":[function(require,module,exports) {
var toObject = require('../internals/to-object');

var hasOwnProperty = {}.hasOwnProperty;

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};

},{"../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba"}],"2633fa4da95065e00ff87cc7cbdd56ba":[function(require,module,exports) {
var requireObjectCoercible = require('../internals/require-object-coercible');

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37"}],"d5b7e7679d9dac163ab327cbf9508501":[function(require,module,exports) {
var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

},{}],"e03ae13f7b17b2e21331d728bd059d1a":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/document-create-element":"cbe47a0c6cb67b97db834ad53049114a"}],"cbe47a0c6cb67b97db834ad53049114a":[function(require,module,exports) {
var global = require('../internals/global');

var isObject = require('../internals/is-object');

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-object":"03244e745134af366d66b74456891052"}],"b52adb17d2cebacfac251681882f0a33":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a"}],"645ef963c1e312a12b44589911036a7f":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var anObject = require('../internals/an-object');
var toPropertyKey = require('../internals/to-property-key');

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/ie8-dom-define":"e03ae13f7b17b2e21331d728bd059d1a","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-property-key":"df2b61336906907f777029fe90c882a8"}],"4f20fc1a2160760f9e7961d272520cbd":[function(require,module,exports) {
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

},{"../internals/is-object":"03244e745134af366d66b74456891052"}],"b8f156ba0e16ecf7371c0d9dbd0a7d60":[function(require,module,exports) {
var global = require('../internals/global');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var has = require('../internals/has');

var setGlobal = require('../internals/set-global');

var inspectSource = require('../internals/inspect-source');

var InternalStateModule = require('../internals/internal-state');

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;

  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }

    state = enforceInternalState(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }

  if (O === global) {
    if (simple) O[key] = value;else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/has":"ce850695ec64cefd211ef6863461b802","../internals/set-global":"7e47fd3b4d01808069dad42c38d45146","../internals/inspect-source":"2632e39e653b5d5a3bae68e9954b90e4","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1"}],"2632e39e653b5d5a3bae68e9954b90e4":[function(require,module,exports) {
var store = require('../internals/shared-store');

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/shared-store":"050f18cf9a95404c13e77ce244078f47"}],"8b9f5ed7c6f8b05b4cd6ee1eefa801c1":[function(require,module,exports) {
var NATIVE_WEAK_MAP = require('../internals/native-weak-map');

var global = require('../internals/global');

var isObject = require('../internals/is-object');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var objectHas = require('../internals/has');

var shared = require('../internals/shared-store');

var sharedKey = require('../internals/shared-key');

var hiddenKeys = require('../internals/hidden-keys');

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;

  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store, it) || {};
  };

  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };

  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};
},{"../internals/native-weak-map":"3633a06fd667b2a3966200ce5e2edda9","../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-object":"03244e745134af366d66b74456891052","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/has":"ce850695ec64cefd211ef6863461b802","../internals/shared-store":"050f18cf9a95404c13e77ce244078f47","../internals/shared-key":"18fb64363b0383efc58d7addc88469cd","../internals/hidden-keys":"7cf9eee6c00d9cc7018f7817cf84e3d6"}],"3633a06fd667b2a3966200ce5e2edda9":[function(require,module,exports) {
var global = require('../internals/global');

var inspectSource = require('../internals/inspect-source');

var WeakMap = global.WeakMap;
module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/inspect-source":"2632e39e653b5d5a3bae68e9954b90e4"}],"18fb64363b0383efc58d7addc88469cd":[function(require,module,exports) {
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":"1950ed6cf8f0dece2a998d60590e9098","../internals/uid":"d5b7e7679d9dac163ab327cbf9508501"}],"7cf9eee6c00d9cc7018f7817cf84e3d6":[function(require,module,exports) {
module.exports = {};

},{}],"df952df9fa85293fe01bbdf9f7116b1b":[function(require,module,exports) {
var has = require('../internals/has');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

},{"../internals/has":"ce850695ec64cefd211ef6863461b802","../internals/own-keys":"a99313addb30af59e8e5785ab390671c","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f"}],"a99313addb30af59e8e5785ab390671c":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/object-get-own-property-names":"b422be4dea2e1243d9a0803066cc2d3d","../internals/object-get-own-property-symbols":"f759fc76793903b9cadc1e3a84780ff9","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"b422be4dea2e1243d9a0803066cc2d3d":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/object-keys-internal":"87cfa515865c83e03f632cbb3fb5fffb","../internals/enum-bug-keys":"f973a6d08ba70476eedabcaf4b58c5fb"}],"87cfa515865c83e03f632cbb3fb5fffb":[function(require,module,exports) {
var has = require('../internals/has');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

},{"../internals/has":"ce850695ec64cefd211ef6863461b802","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/array-includes":"8d0989f06759b3b2c526a5860656b2fc","../internals/hidden-keys":"7cf9eee6c00d9cc7018f7817cf84e3d6"}],"8d0989f06759b3b2c526a5860656b2fc":[function(require,module,exports) {
var toIndexedObject = require('../internals/to-indexed-object');
var toLength = require('../internals/to-length');
var toAbsoluteIndex = require('../internals/to-absolute-index');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460"}],"68c0420762f5f4704115d4fb34e0ae7f":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer":"c0972d049bc20bd69592e8a28601d5ad"}],"c0972d049bc20bd69592e8a28601d5ad":[function(require,module,exports) {
var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

},{}],"ff996ac5a229620b351a78c404035460":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer":"c0972d049bc20bd69592e8a28601d5ad"}],"f973a6d08ba70476eedabcaf4b58c5fb":[function(require,module,exports) {
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],"f759fc76793903b9cadc1e3a84780ff9":[function(require,module,exports) {
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],"700278f8e2cb4c21784f4e50866ce0e4":[function(require,module,exports) {
var fails = require('../internals/fails');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"dd47ece3e1296f193ccefcf3056d1754":[function(require,module,exports) {
var global = require('../internals/global');

var fails = require('../internals/fails');

var bind = require('../internals/function-bind-context');

var html = require('../internals/html');

var createElement = require('../internals/document-create-element');

var IS_IOS = require('../internals/engine-is-ios');

var IS_NODE = require('../internals/engine-is-node');

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) {
  /* empty */
}

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var argumentsLength = arguments.length;
    var i = 1;

    while (argumentsLength > i) args.push(arguments[i++]);

    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };

    defer(counter);
    return counter;
  };

  clear = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    }; // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624

  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && location && location.protocol !== 'file:' && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    }; // Rest old browsers

  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/html":"1918dab06b404ee3e52f081d798c1688","../internals/document-create-element":"cbe47a0c6cb67b97db834ad53049114a","../internals/engine-is-ios":"3156eb661c8c8e66a6d95c3b2d979fb4","../internals/engine-is-node":"42c67226e3ca045b9c35647f16133bfa"}],"f9e6dc73b4a152f549e8299150ac260e":[function(require,module,exports) {
var aFunction = require('../internals/a-function');

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-function":"89591e5698008ce996ea07a1e38aa687"}],"89591e5698008ce996ea07a1e38aa687":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

},{}],"1918dab06b404ee3e52f081d798c1688":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164"}],"3156eb661c8c8e66a6d95c3b2d979fb4":[function(require,module,exports) {
var userAgent = require('../internals/engine-user-agent');

module.exports = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent);

},{"../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"42c67226e3ca045b9c35647f16133bfa":[function(require,module,exports) {
var classof = require('../internals/classof-raw');

var global = require('../internals/global');

module.exports = classof(global.process) == 'process';
},{"../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/global":"7e78823454e7f795898745d93279f917"}],"aabf248f40f7693ef84a0cb99f385d1f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchRecipe = searchRecipe;
exports.getRecipe = getRecipe;
exports.postRecipe = postRecipe;
exports.changePage = changePage;
exports.changePeopleServings = changePeopleServings;
exports.setBookmarks = setBookmarks;
exports.state = void 0;

var _config = require("./config.js");

var _helper = require("./helper.js");

// import { RECIPE_PER_PAGE } from './config.js';
let state = {
  recipe: {},
  listPage: {
    pageArr: [],
    currentPage: 1
  },
  servings: {
    number: "",
    ingredientsForPerson: []
  },
  bookmark: {
    localStorage: window.localStorage.getItem("bookmarks") ? JSON.parse(window.localStorage.getItem("bookmarks")) : [],
    toBtnBookmarkFilled: ""
  }
};
exports.state = state;

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

async function searchRecipe(input) {
  try {
    // initState();
    const data = await Promise.race([(0, _helper.getJSON)(`https://forkify-api.herokuapp.com/api/v2/recipes/?search=${input}&key=${_config.API_KEY}`), timeout(_config.REQ_WAIT_SEC)]);

    if (data.data.recipes.length === 0) {
      throw new Error(`No recipes found for your query. Please try again!`);
    } //? 10 recipes per page in Array


    state.listPage.pageArr = new Array(Math.ceil(data.results / _config.RECIPE_PER_PAGE)).fill("").map((_, i) => data.data.recipes.slice(i * _config.RECIPE_PER_PAGE, i * _config.RECIPE_PER_PAGE + _config.RECIPE_PER_PAGE));
  } catch (err) {
    throw err;
  }
}

async function getRecipe(id) {
  try {
    let data = await Promise.race([(0, _helper.getJSON)(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${_config.API_KEY}`), timeout(_config.REQ_WAIT_SEC)]);
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
      key: data.key
    };

    if (window.localStorage.getItem("bookmarks")) {
      state.recipe.isBookmark = checkIdInLocalData();
    }

    state.servings.ingredientsForPerson = state.recipe.ingredients.map(v => v.quantity / state.recipe.servings);
  } catch (err) {
    throw err;
  }
}

async function postRecipe(data) {
  try {
    let ingredients = Object.entries(data).filter(v => v[0].startsWith(`ingredient`) && v[1]).map(v => {
      let [quantity, unit, description] = v[1].split(",");
      quantity = Number(quantity);
      return {
        quantity,
        unit,
        description
      };
    });
    const userRecipe = {
      id: data.id,
      image_url: data.image,
      ingredients: ingredients,
      servings: data.servings,
      title: data.title,
      source_url: data.sourceUrl,
      publisher: data.publisher,
      cooking_time: data.cookingTime
    };
    let req = await (0, _helper.postJSON)(`https://forkify-api.herokuapp.com/api/v2/recipes/?key=${_config.API_KEY}`, userRecipe);
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
      key: req.key
    };

    if (window.localStorage.getItem("bookmarks")) {
      state.recipe.isBookmark = checkIdInLocalData();
    }

    state.servings.ingredientsForPerson = state.recipe.ingredients.map(v => v.quantity / state.recipe.servings);
  } catch (err) {
    throw err;
  }
}

function changePage(active) {
  switch (active) {
    case "+":
      {
        state.listPage.currentPage++;

        if (state.listPage.currentPage > state.listPage.pageArr.length) {
          state.listPage.currentPage = 1;
        }

        break;
      }

    case "-":
      {
        state.listPage.currentPage--;

        if (state.listPage.currentPage === 0) {
          state.listPage.currentPage = state.listPage.pageArr.length;
        }

        break;
      }
  }
}

function changePeopleServings(action) {
  let servings = Number(document.querySelector(".recipe__info-data--people").textContent);
  state.servings.number = action === "+" ? servings + 1 : servings - 1;

  if (state.servings.number === 0) {
    state.servings.number = 1;
  }
}

function setBookmarks() {
  if (!checkIdInLocalData()) {
    state.bookmark.toBtnBookmarkFilled = true;
    state.bookmark.localStorage.push({
      id: state.recipe.id,
      imgUrl: state.recipe.imgUrl,
      title: state.recipe.title,
      publisher: state.recipe.publisher,
      key: state.recipe.key
    });
  } else {
    let index = state.bookmark.localStorage.findIndex(v => v.id === state.recipe.id);
    state.bookmark.localStorage.splice(index, 1);
    state.bookmark.toBtnBookmarkFilled = false;
  }

  window.localStorage.setItem("bookmarks", JSON.stringify(state.bookmark.localStorage));
}
},{"./config.js":"09212d541c5c40ff2bd93475a904f8de","./helper.js":"ca5e72bede557533b2de19db21a2a688"}],"09212d541c5c40ff2bd93475a904f8de":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REQ_WAIT_SEC = exports.RECIPE_PER_PAGE = exports.API_KEY = void 0;
//configuration
const API_KEY = `447e84fc-0b6d-42a8-9145-42b5eca39a1a`;
exports.API_KEY = API_KEY;
const RECIPE_PER_PAGE = 10;
exports.RECIPE_PER_PAGE = RECIPE_PER_PAGE;
const REQ_WAIT_SEC = 5;
exports.REQ_WAIT_SEC = REQ_WAIT_SEC;
},{}],"ca5e72bede557533b2de19db21a2a688":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJSON = getJSON;
exports.postJSON = postJSON;

async function getJSON(url) {
  try {
    const req = await fetch(url);
    const data = await req.json();

    if (req.status === 400) {
      throw new Error(`This recipe doesn't exist ! (${req.status})`);
    }

    if (req.status >= 300 || req.status < 200) {
      throw new Error(`${data.message} (${req.status})`);
    }

    return data;
  } catch (err) {
    throw err;
  }
}

async function postJSON(url, userRecipe) {
  try {
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userRecipe)
    });
    const data = await req.json();

    if (req.status >= 300 || req.status < 200) {
      throw new Error(`${data.message} (${req.status})`);
    }

    return data;
  } catch (err) {
    throw err;
  }
}
},{}],"bcae1aced0301b01ccacb3e6f7dfede8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _View = require("./View.js");

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RecipeView extends _View.View {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_textEl", document.querySelector('.recipe'));

    _defineProperty(this, "_data", void 0);
  }

  addHandler(controlRecipeContainerClick, controlRenderByHash) {
    this._textEl.addEventListener('click', function (e) {
      //add favor (btn--round)
      if (e.target.closest('.btn--round')) {
        controlRecipeContainerClick('bookmark click');
      } //increase people (btn--increase-servings)


      if (e.target.closest('.btn--increase-servings')) {
        controlRecipeContainerClick('+');
      } //decrease people (btn--decrease-servings)


      if (e.target.closest('.btn--decrease-servings')) {
        controlRecipeContainerClick('-');
      }
    });

    ['load', 'hashchange'].forEach(ev => {
      function temp() {
        var _window$location$hash;

        let id = (_window$location$hash = window.location.hash) === null || _window$location$hash === void 0 ? void 0 : _window$location$hash.slice(1);
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
        <img src=${this._data.imgUrl} alt=${this._data.title} class="recipe__img" />
        <h1 class="recipe__title">
        <span>${this._data.title}</span>
        </h1>
    </figure>

    <div class="recipe__details">
        <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${_icons.default}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${_icons.default}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
            <button class="btn--tiny btn--decrease-servings">
            <svg>
                <use href="${_icons.default}#icon-minus-circle"></use>
            </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
            <svg>
                <use href="${_icons.default}#icon-plus-circle"></use>
            </svg>
            </button>
        </div>
        </div>

        ${this._data.key ? `
        <div class="recipe__user-generated">
          <svg>
            <use href="${_icons.default}#icon-user"></use>
          </svg>
        </div>` : ''}
        <button class="btn--round">
        <svg class="">
            <use href="${_icons.default}#icon-bookmark${this._data.isBookmark ? '-fill' : ''}"></use>
        </svg>
        </button>
    </div>

    <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(obj => {
      return `
              <li class="recipe__ingredient">
              <svg class="recipe__icon">
              <use href="${_icons.default}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${obj.quantity ? obj.quantity : ''}</div>
              <div class="recipe__description">
              <span class="recipe__unit">${obj.unit ? obj.unit : ''}</span>
              ${obj.description}
              </div>
              </li>`;
    }).join('')}
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
            <use href="${_icons.default}#icon-arrow-right"></use>
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
    let quantityArr = Array.from(this._textEl.querySelectorAll('.recipe__quantity'));
    quantityArr.forEach((v, i) => {
      if (!servings.ingredientsForPerson[i]) return;
      v.innerHTML = servings.ingredientsForPerson[i] * servings.number;
    });
    this._textEl.querySelector('.recipe__info-data--people').textContent = servings.number;
  }

}

var _default = new RecipeView();

exports.default = _default;
},{"url:../../img/icons.svg":"68942abc2f9a699f5f3e92c4301c818a","./View.js":"61b7a1b097e16436be3d54c2f1828c73"}],"68942abc2f9a699f5f3e92c4301c818a":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("47cffaa748240fa0", "e9702d543a8b715d");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"2146da1905b95151ed14d455c784e7b7":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"1b9943ef25c7bbdf0dd1b9fa91880a6c":[function(require,module,exports) {
"use strict";

var resolve = require('./bundle-manifest').resolve;

module.exports = function (fromId, toId) {
  return relative(dirname(resolve(fromId)), resolve(toId));
};

function dirname(_filePath) {
  if (_filePath === '') {
    return '.';
  }

  var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
  var slashIndex = filePath.lastIndexOf('/');
  return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
}

function relative(from, to) {
  if (from === to) {
    return '';
  }

  var fromParts = from.split('/');

  if (fromParts[0] === '.') {
    fromParts.shift();
  }

  var toParts = to.split('/');

  if (toParts[0] === '.') {
    toParts.shift();
  } // Find where path segments diverge.


  var i;
  var divergeIndex;

  for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
    if (fromParts[i] !== toParts[i]) {
      divergeIndex = i;
    }
  } // If there are segments from "from" beyond the point of divergence,
  // return back up the path to that point using "..".


  var parts = [];

  for (i = 0; i < fromParts.length - divergeIndex; i++) {
    parts.push('..');
  } // If there are segments from "to" beyond the point of divergence,
  // continue using the remaining segments.


  if (toParts.length > divergeIndex) {
    parts.push.apply(parts, toParts.slice(divergeIndex));
  }

  return parts.join('/');
}

module.exports._dirname = dirname;
module.exports._relative = relative;
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"61b7a1b097e16436be3d54c2f1828c73":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class View {
  constructor() {
    _defineProperty(this, "_hash", window.location.hash);
  }

  clear() {
    this._textEl.textContent = "";
  }

  renderMessage(type) {
    let text;
    let thisView = this;
    this.clear();

    switch (type) {
      case `message`:
        {
          //Start by searching for a recipe or an ingredient. Have fun! (recipe view)
          //No bookmarks yet. Find a nice recipe and bookmark it :)  (bookmark)
          return function (mes) {
            text = `
                    <div class="message">
                      <div>
                        <svg>
                          <use href="${_icons.default}#icon-smile"></use>
                        </svg>
                      </div>
                      <p>${mes}</p>
                    </div>
                  `;

            thisView._textEl.insertAdjacentHTML("beforeend", text);
          };
        }

      case `error`:
        {
          return function (mes, long = false) {
            text = `
                    <div ${long ? `style = max-width:1000px ;` : `a`} class="error">
                        <div>
                          <svg>
                            <use href="${_icons.default}#icon-alert-triangle"></use>
                          </svg>
                        </div>
                        <p>${mes}</p>
                    </div>
                  `;

            thisView._textEl.insertAdjacentHTML("beforeend", text);
          };
        }

      case `spin`:
        {
          text = `
                    <div class="spinner">
                      <svg>
                        <use href="${_icons.default}#icon-loader"></use>
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

exports.View = View;
},{"url:../../img/icons.svg":"68942abc2f9a699f5f3e92c4301c818a"}],"1ec0ee688cad9996109a8aeee196f198":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _View = require("./View.js");

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SearchList extends _View.View {
  constructor() {
    super();

    _defineProperty(this, "_searchEl", document.querySelector('.search'));

    _defineProperty(this, "_textEl", document.querySelector('.results'));

    _defineProperty(this, "_searchBarEl", document.querySelector('.search__field'));

    _defineProperty(this, "_paginationEl", document.querySelector('.pagination'));

    this.searchBarClear(); // this._textEl.addEventListener('click', function (e) {
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
    data.pageArr[data.currentPage - 1].map(recipe => {
      let userIcon = `<div class="preview__user-generated">
                  <svg>
                    <use href="${_icons.default}#icon-user"></use>
                  </svg>
                </div>
                `;
      return `
                <li class="preview ">
                  <a class="preview__link ${recipe.id === document.location.hash.slice(1) ? 'preview__link--active' : ''}" href="#${recipe.id}">
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
    }).forEach(v => {
      this._textEl.insertAdjacentHTML('beforeend', v);
    });
    this.renderPageBar(data);
  }

  pageBarHidden() {
    this._paginationEl.classList.add('hidden');

    this._paginationEl.querySelector('.pagination__btn--prev').classList.add('hidden');

    this._paginationEl.querySelector('.pagination__btn--next').classList.add('hidden');
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

var _default = new SearchList();

exports.default = _default;
},{"./View.js":"61b7a1b097e16436be3d54c2f1828c73","url:../../img/icons.svg":"68942abc2f9a699f5f3e92c4301c818a"}],"7ed9311e216aa789713f70ebeec3ed40":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _View = require("./View.js");

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class bookmarksView extends _View.View {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_iconEl", void 0);

    _defineProperty(this, "_textEl", document.querySelector('.bookmarks__list'));
  }

  addHandler(controlBookmarkClick) {
    window.addEventListener('hashchange', controlBookmarkClick);
  }

  btnBookmarkSet(check) {
    this._iconEl = document.querySelector('.btn--round').children[0].children[0];

    this._iconEl.setAttribute('href', `${_icons.default}#icon-bookmark${check ? '-fill' : ''}`);
  }

  renderBookmark(data) {
    if (!data || data.length === 0) {
      this.renderMessage('message')(`No bookmarks yet. Find a nice recipe and bookmark it :)`);
      return;
    }

    this.clear();
    data.forEach(obj => {
      let userIcon = `<div class="preview__user-generated">
                  <svg>
                    <use href="${_icons.default}#icon-user"></use>
                  </svg>
                </div>
                `;
      let text = `
        <li class="preview">
          <a class="preview__link  ${obj.id === window.location.hash.slice(1) ? 'preview__link--active' : ''}" href="#${obj.id}">
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

var _default = new bookmarksView();

exports.default = _default;
},{"url:../../img/icons.svg":"68942abc2f9a699f5f3e92c4301c818a","./View.js":"61b7a1b097e16436be3d54c2f1828c73"}],"4dd83c2a08c1751220d223c54dc70016":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _View = require("./View.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class addRecipeView extends _View.View {
  constructor() {
    super();

    _defineProperty(this, "_addRecipeBtnEl", document.querySelector(".nav__btn--add-recipe"));

    _defineProperty(this, "_overlayEl", document.querySelector(".overlay"));

    _defineProperty(this, "_parentEl", document.querySelector(".add-recipe-window"));

    _defineProperty(this, "_textEl", document.querySelector(".alert"));

    _defineProperty(this, "_formEl", this._parentEl.querySelector(".upload"));

    _defineProperty(this, "_closeBtnEl", this._parentEl.querySelector(".btn--close-modal"));

    _defineProperty(this, "_uploadBtnEl", this._parentEl.querySelector(".upload__btn"));

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

var _default = new addRecipeView();

exports.default = _default;
},{"./View.js":"61b7a1b097e16436be3d54c2f1828c73"}]},{},["f5b2e98ff1d0093ff85e60fa692c60be","e92452c3da7039e1625e3e27adb6109d","175e469a7ea7db1c8c0744d04372621f"], null)

//# sourceMappingURL=controller.afa9a926.js.map
