import '../sass/main.scss';
import icons from '../images/sprite.svg';

('use strict');
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  // public interface
  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevation = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
  }
}

// application architecture
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const modal = document.querySelector('.js-modal');
const overlay = document.querySelector('.js-overlay');
const btnCloseModal = document.querySelector('.js-error-btn');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // get user position
    this._getPosition();

    // get local storage
    this._getLocalStorage();

    //Attach event handlers
    inputType.addEventListener('change', this._toggleElevationField);
    form.addEventListener('submit', this._newWorkout.bind(this));
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    btnCloseModal.addEventListener('click', this._closeErrorModal.bind(this));
    overlay.addEventListener('click', this._closeErrorModal.bind(this));
    document.addEventListener('keydown', this._closeModalWithEscKey.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Can not get your position!');
        }
      );
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => this._renderWorkoutMarker(work));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // inputFields
    inputDuration.value =
      inputCadence.value =
      inputDistance.value =
      inputElevation.value =
        '';

    // form
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid')), 1000;
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // if workout running create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;

      // check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return this._showErrorModal();

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // if workout cycling create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      // check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return this._showErrorModal();

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + clear input fields
    this._hideForm();

    // set local storage for all workouts
    this._setLocalStorage();
  }

  // Displaying marker
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍' : '🚴‍'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <div class="workout__title">
          <h2 class="workout__title">${workout.description}</h2>
          <svg class="workout--icon-menu js-menu-toggler">
          <use href="${icons}#3-horizontal-dots"></use>
          </svg>
          <div class="workout__menu js-menu">
            <div class="workout__menu--link">
             <svg class="workout--icon js-menu-toggler">
             <use href="${icons}#pencil"></use>
             </svg>
             Edit
            </div>
            <div class="workout__menu--link">
             <svg class="workout--icon js-menu-toggler">
             <use href="${icons}#trash-can"></use>
             </svg>
             Delete
            </div>
            <div class="workout__menu--link">
             <svg class="workout--icon js-menu-toggler">
             <use href="${icons}#trash-can"></use>
             </svg>
             Delete all
            </div>
            <div class="workout__menu--link">
             <svg class="workout--icon js-menu-toggler">
             <use href="${icons}#line-angle-down"></use>
             </svg>
             Sort
            </div>
          </div>
        </div>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍' : '🚴‍'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>`;

    if (workout.type === 'running')
      html += ` 
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>`;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed()}</span>
          <span class="workout__unit">km/h</span>
        </div>
       <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevation}</span>
          <span class="workout__unit">m</span>
      </div>
  </li>`;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // workout.click();
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => this._renderWorkout(work));
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }

  _addClass(element, className) {
    element.classList.add(className);
  }

  _removeClass(element, className) {
    element.classList.remove(className);
  }

  _showErrorModal() {
    if (!modal.classList.contains('hide')) return;
    this._removeClass(modal, 'hide');
    this._addClass(modal, 'centerPosition');

    if (!overlay.classList.contains('hide')) return;
    this._removeClass(overlay, 'hide');
  }

  _closeErrorModal() {
    if (modal.classList.contains('hide')) return;
    this._addClass(modal, 'hide');
    this._removeClass(modal, 'centerPosition');

    if (overlay.classList.contains('hide')) return;
    this._addClass(overlay, 'hide');
  }

  _closeModalWithEscKey(e) {
    if (e.key === 'Escape') {
      this._closeErrorModal();
    }
  }
}

const app = new App();

//TODO only for starting add it ti class with refactored code
// const menuToggle = document.querySelector('.js-menu-toggler');

// menuToggle.addEventListener('click', function (e) {
//   e.stopPropagation();
//   document.querySelector('.js-menu').style.display = 'block';
// });

// document.querySelector('.sidebar').addEventListener('click', function () {
//   document.querySelector('.js-menu').style.display = 'none';
// });
