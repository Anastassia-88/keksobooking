'use strict';

var ACCOMMODATION_CHECKIN = ['12:00', '13:00', '14:00'];
var ACCOMMODATION_CHECKOUT = ['12:00', '13:00', '14:00'];
var ACCOMMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ACCOMMODATION_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ACCOMMODATION_FOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ACCOMMODATION_X_MIN = 0;
var ACCOMMODATION_X_MAX = 1200;
var ACCOMMODATION_Y_MIN = 130;
var ACCOMMODATION_Y_MAX = 630;
var ACCOMMODATIONS_AMOUNT = 8;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var mapPins = map.querySelector('.map__pins');

// Getting a random integer between two values, inclusive
// The maximum is inclusive and the minimum is inclusive
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// Функция получения случайного элемента массива
var getRandomItemFromArray = function (array) {
  var min = 0;
  var max = array.length;
  return array[Math.floor(Math.random() * (max - min)) + min];
};


// Функция генерации массива случайной длины
var getRandomArray = function (array) {
  var arrayLength = getRandomIntInclusive(0, array.length);
  return array.slice(0, arrayLength);
};


// Функция генерации случайных данных
var createAccommodationsArray = function (accommodationsAmount) {
  var accommodationsArray = [];

  for (var i = 1; i <= accommodationsAmount; i++) {
    var accommodation = {
      'author': {
        avatar: 'img/avatars/user0' + i + '.png',
      },

      'offer': {
        title: 'title',
        price: 1,
        type: getRandomItemFromArray(ACCOMMODATION_TYPE),
        rooms: i,
        guests: i,
        checkin: getRandomItemFromArray(ACCOMMODATION_CHECKIN),
        checkout: getRandomItemFromArray(ACCOMMODATION_CHECKOUT),
        features: getRandomArray(ACCOMMODATION_FEATURES),
        description: 'description',
        photos: getRandomArray(ACCOMMODATION_FOTOS)
      },

      'location': {
        x: getRandomIntInclusive(ACCOMMODATION_X_MIN, ACCOMMODATION_X_MAX),
        y: getRandomIntInclusive(ACCOMMODATION_Y_MIN, ACCOMMODATION_Y_MAX)
      }
    };
    accommodation.offer.address = accommodation.location.x + ', ' + accommodation.location.y;
    accommodationsArray.push(accommodation);
  }
  return accommodationsArray;
};


// Функция создания DOM-элемента на основе JS-объекта
var renderMapPin = function (accommodation) {
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.querySelector('img').src = accommodation.author.avatar;
  mapPinElement.querySelector('img').alt = accommodation.offer.description;
  mapPinElement.style.left = accommodation.location.x + 'px';
  mapPinElement.style.top = accommodation.location.y + 'px';
  return mapPinElement;
};


// Функция заполнения блока DOM-элементами на основе массива JS-объектов
var insertMapPins = function (accommodations) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < accommodations.length; i++) {
    fragment.appendChild(renderMapPin(accommodations[i]));
  }
  mapPins.appendChild(fragment);
};

var accommodations = createAccommodationsArray(ACCOMMODATIONS_AMOUNT);
insertMapPins(accommodations);
