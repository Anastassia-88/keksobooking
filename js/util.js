'use strict';

(function () {

  var KeyCode = {
    ESC: 27,
    ENTER: 13,
  };

  // The maximum is inclusive and the minimum is inclusive
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomItemFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Getting a random length array
  function getRandomArray(array) {
    var arrayLength = getRandomIntInclusive(0, array.length);
    return array.slice(0, arrayLength);
  }

  function getSelectedOptionValue(select) {
    return select.options[select.selectedIndex].value;
  }

  function isEscEvent(evt, action) {
    if (evt.keyCode === KeyCode.ESC) {
      action();
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.keyCode === KeyCode.ENTER) {
      action();
    }
  }

  function switchFormElement(form, isDisabled) {
    var elems = form.elements;
    for (var i = 0; i < elems.length; i++) {
      elems[i].disabled = isDisabled;
    }
  }

  function removeNodeContent(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function isArrayInclude(where, what) {
    var isInclude = true;
    for (var i = 0; i < what.length; i++) {
      if (!(where.includes(what[i]))) {
        isInclude = false;
      }
    }
    return isInclude;
  }

  window.util = {
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomItemFromArray: getRandomItemFromArray,
    getRandomArray: getRandomArray,
    getSelectedOptionValue: getSelectedOptionValue,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    switchFormElement: switchFormElement,
    removeNodeContent: removeNodeContent,
    isArrayInclude: isArrayInclude,
  };

})();
