'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var ACCOMMODATION_CHECKIN = ['12:00', '13:00', '14:00'];
var ACCOMMODATION_CHECKOUT = ['12:00', '13:00', '14:00'];
var ACCOMMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ACCOMMODATION_TYPE_NAME = {
  'palace': {
    'text': 'Дворец',
    'minPrice': 10000,
  },
  'house': {
    'text': 'Дом',
    'minPrice': 5000,
  },
  'flat': {
    'text': 'Квартира',
    'minPrice': 1000,
  },
  'bungalo': {
    'text': 'Бунгало',
    'minPrice': 0,
  }
};
var ACCOMMODATION_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ACCOMMODATION_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var ACCOMMODATION_X_MIN = 0;
var ACCOMMODATION_X_MAX = 1200;
var ACCOMMODATION_Y_MIN = 130;
var ACCOMMODATION_Y_MAX = 630;
var ACCOMMODATIONS_AMOUNT = 8;


var filterForm = document.querySelector('.map__filters');

var adForm = document.querySelector('.ad-form');
var roomsNumberSelect = adForm.querySelector('#room_number');
var guestsNumberSelect = adForm.querySelector('#capacity');
var priceInput = adForm.querySelector('#price');
var typeSelect = adForm.querySelector('#type');
var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');
var addressInput = adForm.querySelector('input[name=address]');


var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');
var mapPinsContainer = map.querySelector('.map__pins');

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT_INACTIVE = 65;
var MAIN_PIN_HEIGHT_ACTIVE = 87;

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');


// Getting mocks (accommodations)
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
        photos: getRandomArray(ACCOMMODATION_PHOTOS)
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

// Mocks (accommodations)
var accommodations = createAccommodationsArray(ACCOMMODATIONS_AMOUNT);
