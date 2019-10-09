'use strict';

(function () {

  var map = window.data.map;
  var mainPin = map.querySelector('.map__pin--main');
  var mapPinsContainer = map.querySelector('.map__pins');

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT_INACTIVE = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 87;

  var METHOD_DOWNLOAD = 'GET';
  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';

  var ACCOMMODATIONS_AMOUNT = 5;


  var mainPinDefaultPosition = getMainPinDefaultPosition();
  setInactiveMode();

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

  function renderPins(accommodations) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ACCOMMODATIONS_AMOUNT; i++) {
      if (accommodations[i].offer) {
        fragment.appendChild(window.pin.createPin(accommodations[i]));
      }
    }
    mapPinsContainer.appendChild(fragment);
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
      window.backend.ajax(renderPins, window.error.showErrorMessage, METHOD_DOWNLOAD, URL_DOWNLOAD);
    }
  }

  window.map = {
    setInactiveMode: setInactiveMode,
  };

})();
