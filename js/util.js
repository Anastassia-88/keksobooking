'use strict';

// Getting a random integer between two values
// The maximum is inclusive and the minimum is inclusive
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// Getting a random item from array
var getRandomItemFromArray = function (array) {
  var min = 0;
  var max = array.length;
  return array[Math.floor(Math.random() * (max - min)) + min];
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
