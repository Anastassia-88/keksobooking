'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinsContainer = map.querySelector('.map__pins');

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT_INACTIVE = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 87;


  // Render pins
  var renderPins = function (accommodations) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < accommodations.length; i++) {
      fragment.appendChild(window.pin.renderPin(accommodations[i]));
    }
    mapPinsContainer.appendChild(fragment);
  };


  // Getting address
  var getAddress = function () {
    var pinX = mapPinMain.style.left;
    var pinY = mapPinMain.style.top;
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
      renderPins(window.data.accommodations);
    }
  };


  // Starting active mode
  mapPinMain.addEventListener('mousedown', function () {
    setActiveMode();
    getAddress();
  });


  window.map = {
    map: map,
  };
})();
