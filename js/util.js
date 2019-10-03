'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;


  // Getting a random integer between two values
  // The maximum is inclusive and the minimum is inclusive
  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Getting a random item from array
  var getRandomItemFromArray = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Getting a random length array
  var getRandomArray = function (array) {
    var arrayLength = getRandomIntInclusive(0, array.length);
    return array.slice(0, arrayLength);
  };

  // Getting the value of the selected option
  var getSelectedOption = function (select) {
    return select.options[select.selectedIndex].value;
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  // Disable/enable a form element
  var switchFormElement = function (form, isDisabled) {
    var elems = form.elements;
    for (var i = 0; i < elems.length; i++) {
      elems[i].disabled = isDisabled;
    }
  };


  window.util = {
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomItemFromArray: getRandomItemFromArray,
    getRandomArray: getRandomArray,
    getSelectedOption: getSelectedOption,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    switchFormElement: switchFormElement,
  };
})();
