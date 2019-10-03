'use strict';

(function () {

  var ACCOMMODATION_CHECKIN = ['12:00', '13:00', '14:00'];

  var ACCOMMODATION_CHECKOUT = ['12:00', '13:00', '14:00'];

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
          type: window.util.getRandomItemFromArray(Object.keys(ACCOMMODATION_TYPE_NAME)),
          rooms: i,
          guests: i,
          checkin: window.util.getRandomItemFromArray(ACCOMMODATION_CHECKIN),
          checkout: window.util.getRandomItemFromArray(ACCOMMODATION_CHECKOUT),
          features: window.util.getRandomArray(ACCOMMODATION_FEATURES),
          description: 'description',
          photos: window.util.getRandomArray(ACCOMMODATION_PHOTOS)
        },

        'location': {
          x: window.util.getRandomIntInclusive(ACCOMMODATION_X_MIN, ACCOMMODATION_X_MAX),
          y: window.util.getRandomIntInclusive(ACCOMMODATION_Y_MIN, ACCOMMODATION_Y_MAX)
        }
      };
      accommodation.offer.address = accommodation.location.x + ', ' + accommodation.location.y;
      accommodationsArray.push(accommodation);
    }
    return accommodationsArray;
  };

  // Mocks (accommodations)
  var accommodations = createAccommodationsArray(ACCOMMODATIONS_AMOUNT);


  window.data = {
    accommodations: accommodations,
    ACCOMMODATION_TYPE_NAME: ACCOMMODATION_TYPE_NAME,
    ACCOMMODATION_FEATURES: ACCOMMODATION_FEATURES,
  };
})();
