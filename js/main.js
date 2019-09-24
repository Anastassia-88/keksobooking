'use strict';

var ACCOMMODATION_CHECKIN = ['12:00', '13:00', '14:00'];
var ACCOMMODATION_CHECKOUT = ['12:00', '13:00', '14:00'];
var ACCOMMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ACCOMMODATION_TYPE_NAME = {
  palace: 'Дворец ',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
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

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;


var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var mapCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

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


// Функция создания DOM-элемента на основе JS-объекта
// Метка на карте
var renderMapPin = function (accommodation) {
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.querySelector('img').src = accommodation.author.avatar;
  mapPinElement.querySelector('img').alt = accommodation.offer.description;
  mapPinElement.style.left = (accommodation.location.x - PIN_WIDTH / 2) + 'px';
  mapPinElement.style.top = (accommodation.location.y - PIN_HEIGHT) + 'px';

  return mapPinElement;
};

// Функция заполнения блока DOM-элементами на основе массива JS-объектов
// Метки на карте
var insertMapPins = function (accommodations) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < accommodations.length; i++) {
    fragment.appendChild(renderMapPin(accommodations[i]));
  }
  mapPins.appendChild(fragment);
};


// Функция создания DOM-элемента карточки объявленияна основе JS-объекта
var renderMapCard = function (accommodation) {
  var mapCardElement = mapCardTemplate.cloneNode(true);

  var getFeatures = function (features) {
    var featuresContainer = mapCardElement.querySelector('.popup__features');
    var featuresCollection = mapCardElement.querySelectorAll('.popup__feature');

    for (var i = 0; i < ACCOMMODATION_FEATURES.length; i++) {
      if (!features.includes(ACCOMMODATION_FEATURES[i])) {
        featuresContainer.removeChild(featuresCollection[i]);
      }
    }
  };

  var getPhotos = function (photos) {
    var photoContainer = mapCardElement.querySelector('.popup__photos');
    var photoTemplate = mapCardElement.querySelector('.popup__photo');
    photoContainer.removeChild(photoTemplate);
    for (var i = 0; i < photos.length; i++) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = photos[i];
      photoContainer.appendChild(photo);
    }
  };

  mapCardElement.querySelector('.popup__title').textContent = accommodation.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = accommodation.offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = accommodation.offer.price + '₽/ночь';
  mapCardElement.querySelector('.popup__type').textContent = ACCOMMODATION_TYPE_NAME[accommodation.offer.type];
  mapCardElement.querySelector('.popup__text--capacity').textContent = accommodation.offer.rooms + ' комнаты для ' +
    accommodation.offer.guests + ' гостей';
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + accommodation.offer.checkin +
   ', выезд до ' + accommodation.offer.checkout;
  getFeatures(accommodation.offer.features);
  mapCardElement.querySelector('.popup__description').textContent = accommodation.offer.description;
  getPhotos(accommodation.offer.photos);
  mapCardElement.querySelector('.popup__avatar').src = accommodation.author.avatar;

  return mapCardElement;
};


var accommodations = createAccommodationsArray(ACCOMMODATIONS_AMOUNT);
insertMapPins(accommodations);


// Добавление в разметку карточки первого объявления
map.insertBefore(renderMapCard(accommodations[0]), map.querySelector('.map__filters-container'));
