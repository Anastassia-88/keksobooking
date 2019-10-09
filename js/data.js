'use strict';

(function () {

  window.data = {
    ACCOMMODATION_TYPE_NAME: {
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
    },

    ACCOMMODATION_FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],

    map: document.querySelector('.map'),

    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630,
  };
})();
