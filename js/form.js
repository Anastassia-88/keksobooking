'use strict';

// Добавляет или удаляет аттрибут disabled у элементов формы
var switchFormElement = function (form, isDisabled) {
  var elems = form.elements;
  for (var i = 0; i < elems.length; i++) {
    elems[i].disabled = isDisabled;
  }
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
  addressInput.value = Math.floor(addressX) + ', ' + Math.floor(addressY);
};

// Checking capacity
var checkCapacity = function () {
  var guestsNumberOptions = guestsNumberSelect.querySelectorAll('option');
  var roomsNumber = parseInt(getSelectedOption(roomsNumberSelect));

  for (var i = 0; i < guestsNumberOptions.length; i++) {
    var guestsNumber = guestsNumberOptions[i];

    if (roomsNumber >= parseInt(guestsNumber.value) && (roomsNumber !== 100) && parseInt(guestsNumber.value) !== 0) {
      guestsNumber.disabled = false;
    } else if (roomsNumber === 100 && parseInt(guestsNumber.value) === 0) {
      guestsNumber.disabled = false;
      guestsNumber.selected = true;
    } else {
      guestsNumber.disabled = true;
      guestsNumber.selected = false;
    }
  }
};

roomsNumberSelect.addEventListener('change', function () {
  checkCapacity();
});

guestsNumberSelect.addEventListener('change', function () {
  checkCapacity();
});


// Connecting accomodation type and min price
typeSelect.addEventListener('change', function () {
  var key = getSelectedOption(typeSelect);
  priceInput.min = ACCOMMODATION_TYPE_NAME[key].minPrice;
  priceInput.placeholder = ACCOMMODATION_TYPE_NAME[key].minPrice;
});


// Connecting time-in and time-out
timeInSelect.addEventListener('change', function () {
  timeOutSelect.value = timeInSelect.value;
});

timeOutSelect.addEventListener('change', function () {
  timeInSelect.value = timeOutSelect.value;
});
