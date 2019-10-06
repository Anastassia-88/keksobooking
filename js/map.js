'use strict';

(function () {

  var map = window.data.map;
  var mainPin = map.querySelector('.map__pin--main');
  var mapPinsContainer = map.querySelector('.map__pins');

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT_INACTIVE = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 87;

  var METHOD_LOAD = 'GET';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';


  var renderPins = function (accommodations) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < accommodations.length; i++) {
      if (accommodations[i].offer) {
        fragment.appendChild(window.pin.createPin(accommodations[i]));
      }
    }
    mapPinsContainer.appendChild(fragment);
  };


  var getAddress = function () {
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
  };


  // Inactive (start) mode
  window.util.switchFormElement(window.form.filterForm, true);
  window.util.switchFormElement(window.form.adForm, true);
  getAddress();

  // Active mode
  var setActiveMode = function () {
    if (map.classList.contains('map--faded')) {
      window.util.switchFormElement(window.form.filterForm, false);
      window.util.switchFormElement(window.form.adForm, false);
      map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      window.backend.ajax(renderPins, window.backend.onError, METHOD_LOAD, URL_LOAD);
    }
  };


  // Moving the main pin
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    setActiveMode();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
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
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
