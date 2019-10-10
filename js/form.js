'use strict';

(function () {

  var filterForm = document.querySelector('.map__filters');

  var adForm = document.querySelector('.ad-form');
  var roomsNumberSelect = adForm.querySelector('#room_number');
  var guestsNumberSelect = adForm.querySelector('#capacity');
  var priceInput = adForm.querySelector('#price');
  var typeSelect = adForm.querySelector('#type');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var addressInput = adForm.querySelector('input[name=address]');

  var METHOD_UPLOAD = 'POST';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';


  roomsNumberSelect.addEventListener('change', function () {
    checkCapacity();
  });

  guestsNumberSelect.addEventListener('change', function () {
    checkCapacity();
  });

  // Connecting accomodation type and min price
  typeSelect.addEventListener('change', function () {
    var key = window.util.getSelectedOptionValue(typeSelect);
    priceInput.min = window.data.ACCOMMODATION_TYPE_NAME[key].minPrice;
    priceInput.placeholder = window.data.ACCOMMODATION_TYPE_NAME[key].minPrice;
  });


  // Connecting time-in and time-out
  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });


  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.ajax(onSuccessfulFormSubmission, window.error.showErrorMessage, METHOD_UPLOAD, URL_UPLOAD, new FormData(adForm));
  });


  function checkCapacity() {
    var guestsNumberOptions = guestsNumberSelect.querySelectorAll('option');
    var roomsNumber = parseInt(window.util.getSelectedOptionValue(roomsNumberSelect), 10);

    for (var i = 0; i < guestsNumberOptions.length; i++) {
      var guestsNumber = guestsNumberOptions[i];

      if (roomsNumber >= parseInt(guestsNumber.value, 10) && (roomsNumber !== 100) && parseInt(guestsNumber.value, 10) !== 0) {
        guestsNumber.disabled = false;
      } else if (roomsNumber === 100 && parseInt(guestsNumber.value, 10) === 0) {
        guestsNumber.disabled = false;
        guestsNumber.selected = true;
      } else {
        guestsNumber.disabled = true;
        guestsNumber.selected = false;
      }
    }
  }

  function onSuccessfulFormSubmission() {
    window.map.setInactiveMode();
    window.success.showSuccessMessage();
  }


  window.form = {
    filterForm: filterForm,
    adForm: adForm,
    addressInput: addressInput,
  };
})();
