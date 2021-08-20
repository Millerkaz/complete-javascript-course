'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

function renderCountry(country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(res => {
      if (!res.ok)
        throw new Error(
          `An error happens in renderCountry Function. (${res.status})`
        );
      return res.json();
    })
    .then(data => {
      data = data[0];
      let text = `
    <article class="country">
      <img class="country__img" src=${data.flag} />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${data.population}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].code}</p>
      </div>
    </article>`;
      countriesContainer.insertAdjacentHTML('beforeend', text);
      countriesContainer.style.opacity = 1;
      return;
    })
    .catch(err => console.error(err));
}

function getJSON(lat, lng) {
  return fetch(`https://geocode.xyz/${lat},${lng}?geoit=JSON`).then(res => {
    if (!res.ok)
      throw new Error(`An error happens in getJSON Function. (${res.status})`);
    return res.json();
  });
}

/*
function showOne(lat, lng) {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1000, getJSON(lat, lng));
  });
}
showOne(52.508, 13.381)
  .then(data => {
    renderCountry(data.country);
    console.log(`You are in ${data.city}, ${data.country}`);
    return showOne(19.037, 72.873);
  })
  .then(data => {
    renderCountry(data.country);
    console.log(`You are in ${data.city}, ${data.country}`);
    return showOne(-33.933, 18.474);
  })
  .then(data => {
    renderCountry(data.country);
    console.log(`You are in ${data.city}, ${data.country}`);
  })
  .catch(err => console.error(err));
*/

let imagesEl = document.querySelector('.images');

//* async + await v.s promise + then
//? 1.
async function loadPause_1() {
  try {
    let img = await createImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-3.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
}

function loadPause_2() {
  createImage('img/img-1.jpg')
    .then(() => {
      return wait(2);
    })
    .then(() => {
      img.style.display = 'none';
      return createImage('img/img-2.jpg');
    })
    .then(() => {
      return wait(2);
    })
    .then(() => {
      img.style.display = 'none';
      return createImage('img/img-3.jpg');
    })
    .then(() => {
      return wait(2);
    })
    .then(() => {
      img.style.display = 'none';
    })
    .catch(err => console.error(err));
}

/////////////////////////////////////////////////////////////////////////
//? 2.
let imgArr = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];
async function loadAll_1(imgArr) {
  try {
    const imgs = imgArr.map(async v => await createImage(v));
    const imgEls = await Promise.all(imgs);
    imgEls.forEach(v => {
      v.classList.add('parallel');
    });
  } catch (err) {
    console.error(err);
  }
  return '1';
}

function loadAll_2(imgArr) {
  let imgs = imgArr.map(v => createImage(v));
  Promise.all(imgs)
    .then(imgELs => {
      imgELs.forEach(imgEL => {
        imgEL.classList.add('parallel');
      });
    })
    .catch(err => console.error(err));
}

/////////////////////////////////////////////////////////////////////////
//* Promisify (為了可以進行串接)
//? 1.類 fetch function

function getData(country) {
  return new Promise(function (resolve, reject) {
    let qes = new XMLHttpRequest();
    qes.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    qes.send();
    qes.addEventListener('load', resolve);
    qes.addEventListener('error', reject);
  });
}

getData('taiwan').then(req => {
  let data = JSON.parse(req.target.response);
  renderCountry(data[0].name);
  console.log(data[0]);
});

/////////////////////////////////////////////////////////////////////////
//? 2.IMG loading

function createImage(imgPath) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imagesEl.appendChild(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error(`Image not found`));
    });
  });
}
/////////////////////////////////////////////////////////////////////////
//? 3.SetTimeout

function wait(seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
}
