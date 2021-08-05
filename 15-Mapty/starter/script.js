'use strict';

//* Global variable
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//* Class
////////////////////////////////////////////////////////////////////////////////////////////
class Workout {
  constructor({ id, distance, duration, coords }) {
    let now = new Date();
    this.date = `${months[now.getMonth()]} ${now.getDate()} (${now.getFullYear()})`;

    this.id = id;
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }
}

class Running extends Workout {
  //! 建構子參數用 OBJ 時，母 CLASS 和 super function 參數也必須統一用 OBJ
  constructor({ id, distance, duration, coords, cadence }) {
    super({ id, distance, duration, coords });
    this.type = 'Running';
    this.cadence = cadence;
  }
}

class Cycling extends Workout {
  constructor({ id, distance, duration, coords, elevation }) {
    super({ id, distance, duration, coords });
    this.type = 'Cycling';
    this.elevation = elevation;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////

class App {
  //! 此處的屬性綁定此 CLASS 建立的實體 (IE未實裝 )
  // #map;
  // #keyCheck = false;
  // #marker;
  // #workoutArr = [];

  constructor() {
    //private properties
    this._map = '';
    this._keyCheck = false;
    this._marker = '';
    this._workoutArr = [];

    //start
    this._getFirstMap();

    //load local data

    //add EventListener
    document.body.addEventListener('keydown', this._FormKeydownControl.bind(this));
    containerWorkouts.addEventListener('click', this._workoutsClick.bind(this));
    inputType.addEventListener('change', this._toggleFormClass);
  }

  //* 輔助功能 Function
  ////////////////////////////////////////////////////////////////////////////////////////////

  _cancelForm() {
    this._marker = undefined;
    form.classList.add('hidden');
    this._keyCheck = false;
  }

  _workoutToLocalStorage(data) {
    localStorage.setItem('workout', JSON.stringify(data));
  }
  ////////////////////////////////////////////////////////////////////////////////////////////

  _getFirstMap() {
    if (navigator.geolocation) {
      let positionCB = function (position) {
        let coords = [position.coords.latitude, position.coords.longitude];

        //* 初始化地圖
        this._map = L.map('map').setView(coords, 13);

        //*建立地圖磚
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this._map);

        //* 建立圖標到初始地點;
        L.marker(coords).addTo(this._map).bindPopup('You Are Here').openPopup();

        this._loadLocalData();
        this._map.on('click', this._mapClick.bind(this));
      };

      //! 此處 positionCB 為一般函式呼叫，不 bind 會使 this => undefined
      navigator.geolocation.getCurrentPosition(positionCB.bind(this), function () {
        alert(`Cannot get your position .`);
      });
    }
  }

  _loadLocalData() {
    if (!this._workoutArr) return;
    this._workoutArr = JSON.parse(localStorage.getItem('workout'));
    function i(v) {
      this._workoutOnList(v);
    }
    this._workoutArr.forEach(i.bind(this));
  }

  _mapClick(e) {
    if (!this._keyCheck) {
      this._marker = L.marker(e.latlng).addTo(this._map);
      this._toggleFormClass();
      inputDistance.focus();
      form.classList.remove('hidden');
      this._keyCheck = true;
      return;
    }

    inputDistance.focus();
  }

  _newWorkout(type) {
    let obj = {
      id: this._workoutArr.length + 1,
      distance: Number(inputDistance.value),
      duration: Number(inputDuration.value),
      cadence: Number(inputCadence.value),
      elevation: Number(inputElevation.value),
      coords: [this._marker.getLatLng().lat, this._marker.getLatLng().lng],
    };

    if (type === 'running') {
      return new Running(obj);
    }

    if (type === 'cycling') {
      return new Cycling(obj);
    }
  }

  _FormKeydownControl(e) {
    if (!this._keyCheck) return;

    if (e.code === 'Enter') {
      let formInputArr =
        inputType.value === 'running'
          ? [Number(inputDistance.value), Number(inputDuration.value), Number(inputCadence.value)]
          : [Number(inputDistance.value), Number(inputDuration.value), Number(inputElevation.value)];

      //全局 isFinite() 函數，會強制將參數轉換為數字。
      if (formInputArr.some(v => !isFinite(v) || v <= 0)) {
        alert(`Input wrong !`);
        return;
      }

      let currentListObj = this._newWorkout(inputType.value);

      this._workoutArr.push(currentListObj);

      this._workoutToLocalStorage(this._workoutArr);

      //視覺效果優化
      form.style.transition = 'none';
      setTimeout(() => (form.style.transition = ''), 100);

      this._workoutOnList(currentListObj);

      this._cancelForm();

      return;
    }

    if (e.code === 'Escape') {
      this._marker.remove();
      this._cancelForm();
      return;
    }
  }

  _workoutOnList(workout) {
    //? 加入 MARKER & POPUP
    let marker = this._marker ? this._marker : L.marker(workout.coords).addTo(this._map);

    marker
      .bindPopup(`${workout.date} : ${workout.type === 'Running' ? '🏃‍♂️' : '🚴‍♀️'}${workout.type}`, {
        autoClose: false,
        closeOnClick: false,
        closeOnEscapeKey: false,
        className: `${workout.type === 'Running' ? 'running' : 'cycling'}-popup`,
      })
      .openPopup();

    //? 加入LIST
    let list = `
    <li id="list--${workout.id}" class="workout workout--${workout.type}" data-id="${workout.id}"'>
      <h2 class="workout__title">${workout.type} on ${workout.date}</h2>
      <div class="workout__details">
        <span class="workout__icon">${workout.type === 'Running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.type === 'Running' ? workout.cadence : workout.elevation}</span>
        <span class="workout__unit">${workout.type === 'Running' ? 'min/km' : 'meters'}</span>
      </div>          
    </li>`;

    form.insertAdjacentHTML('afterend', list);
  }

  _workoutsClick(e) {
    e.preventDefault();
    if (!e.target.closest('.workout')) return;

    let coords = this._workoutArr.find(function (v) {
      return v.id === Number(e.target.closest('.workout').dataset.id);
    }).coords;

    this._map.flyTo(coords);
  }

  _toggleFormClass() {
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    switch (inputType.value) {
      case 'running':
        inputCadence.closest('.form__row').classList.remove('form__row--hidden');
        inputElevation.closest('.form__row').classList.add('form__row--hidden');
        break;
      case 'cycling':
        inputCadence.closest('.form__row').classList.add('form__row--hidden');
        inputElevation.closest('.form__row').classList.remove('form__row--hidden');
        break;
    }
  }
}

let app = new App();

/* Before Architecture
///////////////////////////////////////////////////////////////////////////////
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      let now = new Date();
      let date = `${
        months[now.getMonth()]
      } ${now.getDate()} (${now.getFullYear()})`;
      let keyCheck = false;
      let marker;
      let listNumber = 1;
      let coords = [position.coords.latitude, position.coords.longitude];

      //* 初始化地圖
      let map = L.map('map').setView(coords, 13);

      //*建立地圖磚
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //* 建立圖標到初始地點;
      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

      //////////////////////////////////////////////////

      function firstLetterUpper(word) {
        return `${word[0].toUpperCase()}${word.slice(1)}`;
      }

      //* MAP CLICK
      map.on('click', function (e) {
        if (!keyCheck) {
          marker = L.marker(e.latlng).addTo(map);
          form.classList.remove('hidden');
          keyCheck = true;
        } else {
          inputDistance.focus();
        }
      });

      //* Workouts CLICK MOVE
      containerWorkouts.addEventListener('click', function (e) {
        e.preventDefault();
        if (!e.target.closest('.workout')) return;

        let coords = [
          Number(e.target.closest('.workout').dataset.lat),
          Number(e.target.closest('.workout').dataset.lng),
        ];

        map.flyTo(coords);
      });

      // form.addEventListener('click', function (e) {
      //   e.preventDefault();
      //   console.log(e.target);
      // });

      //* Form Keydown Event
      document.body.addEventListener('keydown', function (e) {
        if (!keyCheck) return;

        let formInputArr = [
          Number(inputDistance.value),
          Number(inputDuration.value),
          Number(inputCadence.value),
        ];

        if (e.code === 'Enter') {
          console.log(formInputArr);
          //全局 isFinite() 函數，會強制將參數轉換為數字。
          if (formInputArr.some(v => !isFinite(v) || v <= 0)) {
            alert(`Input wrong !`);
            return;
          }

          //? 加入POPUP
          marker
            .bindPopup(
              `${date} : ${
                inputType.value === 'running' ? '🏃‍♂️' : '🚴‍♀️'
              }${firstLetterUpper(inputType.value)}`,
              {
                autoClose: false,
                closeOnClick: false,
                closeOnEscapeKey: false,
              }
            )
            .openPopup();

          let markerPosition = marker.getLatLng();

          //? 加入LIST
          let list = `
        <li id="list--${listNumber}" class="workout workout--running" data-id="${listNumber}" data-lat='${
            markerPosition.lat
          }' data-lng='${markerPosition.lng}'>
          <h2 class="workout__title">${firstLetterUpper(
            inputType.value
          )} on ${date}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              inputType.value === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${formInputArr[0]}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${formInputArr[1]}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${formInputArr[2]}</span>
            <span class="workout__unit">min/km</span>
          </div>          
        </li>`;

          containerWorkouts.insertAdjacentHTML('beforeend', list);
          form.classList.add('hidden');
          listNumber++;
          keyCheck = false;
        }

        if (e.code === 'Escape') {
          marker.remove();
          form.classList.add('hidden');
          keyCheck = false;
        }
      });
    },
    function () {
      console.log(`Cannot get your position .`);
    }
  );
}
*/
