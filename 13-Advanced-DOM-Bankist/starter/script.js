'use strict';

///////////////////////////////////////
// Modal window

function getEl(element) {
  return document.querySelector(element);
}

function getEls(elements) {
  //NodeList
  return document.querySelectorAll(elements);
}

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////////

//* 浮動導航列

getEl('.btu_nav--leave').addEventListener('mouseenter', function () {
  getEl('.nav--leave').classList.remove('hidden');
});
getEl('#nav--leave').addEventListener('mouseleave', function (e) {
  if (!e.target.closest('#nav--leave')) return;
  getEl('.nav--leave').classList.add('hidden');
});

//* 浮動導航列顯示
let navObs = new IntersectionObserver(
  function (entries) {
    let [entry] = entries;
    if (!entry.isIntersecting) {
      getEl('#nav--leave').classList.remove('display_none');
    } else {
      getEl('#nav--leave').classList.add('display_none');
    }
  },
  {
    threshold: 0,
    root: null,
  }
);
navObs.observe(getEl('.nav'));
//////////////////////////////////////////////////////////////////////

//* 點擊移動到指定位置
getEl('.btn--text').addEventListener('click', function () {
  window.scrollTo(0, window.pageYOffset + section1.getBoundingClientRect().top);
});

//////////////////////////////////////////////////////////////////////

//* LAZY IMG LOADING
const imgOb = new IntersectionObserver(
  function (entries, obs) {
    let [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () =>
      entry.target.classList.remove('lazy-img')
    );
    obs.unobserve(entry.target);
  },
  {
    root: null,
    threshold: [0, 0.5, 1],
    rootMargin: '100px 0px 100px 0px',
  }
);

getEls('.features__img').forEach(function (v) {
  imgOb.observe(v);
});

//////////////////////////////////////////////////////////////////////

//* 點擊標籤切換內容 (click event Delegation)
getEl('.operations__tab-container').addEventListener('click', function (e) {
  //善用closest確保選到目標子元素也能執行程式
  let id = e.target.closest('.operations__tab');

  //常用 非條件下執行 return 來保持 code dry
  if (!id) return;

  //去除所有顯示內容的 class
  getEls('.operations__content').forEach(v => {
    v.classList.remove('operations__content--active');
  });

  getEls('.operations__tab').forEach(v => {
    v.classList.remove('operations__tab--active');
  });

  //NodeList -> Array
  // [...getEls('.operations__content')]
  //   .find(v => v.classList.contains('operations__content--active'))
  //   .classList.remove('operations__content--active');

  //增加顯示的 class 到指定 id
  getEl(`.operations__content--${id.dataset.tab}`).classList.add(
    'operations__content--active'
  );
  id.classList.add('operations__tab--active');
});

//////////////////////////////////////////////////////////////////////

//* NAV BAR hover 凸顯目標效果 (mouse event Delegation)
// mouseover <-> mouseout (bubbling)//
// mouseenter <-> mouseleave //

const navHandler = function (e) {
  if (!e.target.classList.contains('nav__link')) return;

  let target = e.target;
  let linkSibling = target.closest('.nav').querySelectorAll('.nav__link');
  let logo = getEl('.nav__logo');

  linkSibling.forEach(v => {
    v.style.opacity = v !== target ? this : 1;
  });
  logo.style.opacity = this;
};

//! 將變數代入監聽器 -> bind 綁 this (多變數則 this 代入 array)
getEl('.nav').addEventListener('mouseover', navHandler.bind(0.5));
// getEl('.nav').addEventListener('mouseover', e=>{navHandler(e,0.5)};
getEl('.nav').addEventListener('mouseout', navHandler.bind(1));

//////////////////////////////////////////////////////////////////////

//*slider
let currentSlide = 1;

function slideShow(currentSlide) {
  getEls('.slide').forEach(function (v, i) {
    v.style.transform = `translateX(${100 * (i + 1 - currentSlide)}%)`;

    [...getEl('.dots').children].forEach(v =>
      v.classList.remove(`dots__dot--active`)
    );
    getEl(`.dots__dot--${currentSlide}`).classList.add(`dots__dot--active`);
  });
}

getEl('.slider__btn--right').addEventListener('click', function () {
  if (currentSlide === 3) {
    currentSlide = 1;
  } else {
    currentSlide++;
  }
  slideShow(currentSlide);
});
getEl('.slider__btn--left').addEventListener('click', function () {
  if (currentSlide === 1) {
    currentSlide = 3;
  } else {
    currentSlide--;
  }
  slideShow(currentSlide);
});

//* slider btn
getEls('.slide').forEach(function (v, i) {
  let text = `<button class="dots__dot dots__dot--${i + 1}" data-dot="${
    i + 1
  }"></button>`;
  getEl('.dots').insertAdjacentHTML('beforeend', text);
});

getEl('.dots').addEventListener('click', function (e) {
  let target = e.target;
  if (!target.classList.contains('dots__dot')) return;
  currentSlide = Number(target.dataset.dot);
  slideShow(currentSlide);
});

//////////////////////////////////////////////////////////////////////
function init() {
  slideShow(1);
}
init();
