'use strict';

(function () {
  var accommodations = [];

  var map = window.data.map;
  var mainPin = map.querySelector('.map__pin--main');
  var mapPinsContainer = map.querySelector('.map__pins');

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT_INACTIVE = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 87;

  var METHOD_DOWNLOAD = 'GET';
  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';

  var ACCOMMODATIONS_AMOUNT = 5;

  var filterForm = window.form.filterForm;
  var typeFilter = filterForm.querySelector('#housing-type');
  var priceFilter = filterForm.querySelector('#housing-price');
  var roomsNumberFilter = filterForm.querySelector('#housing-rooms');
  var guestsNumberFilter = filterForm.querySelector('#housing-guests');

  var mainPinDefaultPosition = getMainPinDefaultPosition();

  setInactiveMode();

  onFilterChange(typeFilter);
  onFilterChange(priceFilter);
  onFilterChange(roomsNumberFilter);
  onFilterChange(guestsNumberFilter);


  // Moving the main pin
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    setActiveMode();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var endCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if ((endCoords.x >= window.data.X_MIN) && (endCoords.x <= window.data.X_MAX - MAIN_PIN_WIDTH)) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if ((endCoords.y >= window.data.Y_MIN - MAIN_PIN_HEIGHT_ACTIVE) && (endCoords.y <= window.data.Y_MAX - MAIN_PIN_HEIGHT_ACTIVE)) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      getAddress();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  function onFilterChange(select) {
    select.addEventListener('change', function () {
      updatePins(accommodations);
    });
  }


  function renderPins(newAccommodations) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ACCOMMODATIONS_AMOUNT && i < newAccommodations.length; i++) {
      fragment.appendChild(window.pin.createPin(newAccommodations[i]));
    }
    mapPinsContainer.appendChild(fragment);
  }

  function updatePins(newAccommodations) {
    window.util.removeNodeContent(mapPinsContainer);

    var filteredAccommodations = newAccommodations.filter(function (it) {

      var type = window.util.getSelectedOptionValue(typeFilter);
      var price = window.util.getSelectedOptionValue(priceFilter);
      var roomsNumber = window.util.getSelectedOptionValue(roomsNumberFilter);
      var guestsNumber = window.util.getSelectedOptionValue(guestsNumberFilter);

      var isTypeRequired = (type === 'any') ? true : (it.offer.type === type);
      var isPriceRequired = (price === 'any') ? true : (it.offer.price === price);
      var isRoomsNumberRequired = (roomsNumber === 'any') ? true : (it.offer.roomsNumber === parseInt(roomsNumber, 10));
      var isGuestsNumberRequired = (guestsNumber === 'any') ? true : (it.offer.guestsNumber === parseInt(guestsNumber, 10));

      return isTypeRequired && isPriceRequired && isRoomsNumberRequired && isGuestsNumberRequired;
    });
    renderPins(filteredAccommodations);
  }


  function deletePins() {
    var pins = mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  function getAddress() {
    var pinX = mainPin.style.left;
    var pinY = mainPin.style.top;
    var addressX = parseInt(pinX, 10) + MAIN_PIN_WIDTH / 2;
    var addressY;

    if (map.classList.contains('map--faded')) { // Inactive mode
      addressY = parseInt(pinY, 10) + MAIN_PIN_HEIGHT_INACTIVE / 2;
    } else { // Active mode
      addressY = parseInt(pinY, 10) + MAIN_PIN_HEIGHT_ACTIVE;
    }
    window.form.addressInput.value = Math.floor(addressX) + ', ' + Math.floor(addressY);
  }

  function getMainPinDefaultPosition() {
    return {
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop
    };
  }

  function setMainPinDefaultPosition() {
    mainPin.style.left = mainPinDefaultPosition.x + 'px';
    mainPin.style.top = mainPinDefaultPosition.y + 'px';
  }

  function setInactiveMode() {
    setMainPinDefaultPosition();
    window.form.filterForm.reset();
    window.form.adForm.reset();
    window.card.deleteCard();
    deletePins();
    window.util.switchFormElement(window.form.filterForm, true);
    window.util.switchFormElement(window.form.adForm, true);
    map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    getAddress();
  }

  function setActiveMode() {
    if (map.classList.contains('map--faded')) {
      window.util.switchFormElement(window.form.filterForm, false);
      window.util.switchFormElement(window.form.adForm, false);
      map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      window.backend.ajax(onSuccess, window.error.showErrorMessage, METHOD_DOWNLOAD, URL_DOWNLOAD);
    }
  }

  function onSuccess(data) {
    accommodations = data;
    updatePins(accommodations);
  }

  window.map = {
    setInactiveMode: setInactiveMode,
  };

})();
