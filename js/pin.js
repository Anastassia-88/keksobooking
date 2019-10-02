'use strict';

// Inactive (start) mode
switchFormElement(filterForm, true);
switchFormElement(adForm, true);
getAddress();

// Active mode
var setActiveMode = function () {
  if (map.classList.contains('map--faded')) {
    switchFormElement(filterForm, false);
    switchFormElement(adForm, false);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    renderPins(accommodations);
  }
};


// Переводим страницу Кексобукинга в активный режим
mapPinMain.addEventListener('mousedown', function () {
  setActiveMode();
  getAddress();
});


var renderPin = function (accommodation) {
  var mapPin = pinTemplate.cloneNode(true);
  mapPin.querySelector('img').src = accommodation.author.avatar;
  mapPin.querySelector('img').alt = accommodation.offer.description;
  mapPin.style.left = (accommodation.location.x - PIN_WIDTH / 2) + 'px';
  mapPin.style.top = (accommodation.location.y - PIN_HEIGHT) + 'px';

  mapPin.addEventListener('mousedown', function () {
    deleteCard();
    renderCard(accommodation);
    document.addEventListener('keydown', onPopupEscPress);
  });

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      deleteCard();
      renderCard(accommodation);
      document.addEventListener('keydown', onPopupEscPress);
    }
  });

  return mapPin;
};

// Функция заполнения блока DOM-элементами на основе массива JS-объектов
// Метки на карте
var renderPins = function (accommodations) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < accommodations.length; i++) {
    fragment.appendChild(renderPin(accommodations[i]));
  }
  mapPinsContainer.appendChild(fragment);
};
