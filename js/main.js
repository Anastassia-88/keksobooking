'use strict';

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

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT_INACTIVE = 65;
var MAIN_PIN_HEIGHT_ACTIVE = 87;

var adForm = document.querySelector('.ad-form');
var filterForm = document.querySelector('.map__filters');
var addressInput = adForm.querySelector('input[name=address]');

var mapPinMain = document.querySelector('.map__pin--main');


var map = document.querySelector('.map');

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var mapCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var mapPins = map.querySelector('.map__pins');


// Добавляет или удаляет аттрибут disabled у элементов формы
var switchFormElement = function (form, isDisabled) {
  var elems = form.elements;
  for (var i = 0; i < elems.length; i++) {
    elems[i].disabled = isDisabled;
  }
};

// Начальный (не активный) режим страницы
switchFormElement(filterForm, true);
switchFormElement(adForm, true);


// Активный режим страницы
var setActiveMode = function () {
  if (map.classList.contains('map--faded')) {
    switchFormElement(filterForm, false);
    switchFormElement(adForm, false);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    renderMapPins(accommodations);
    renderCard(accommodations[0]);
  }
};

// 
var getAddress = function () {
  var pinX = mapPinMain.style.left;
  var pinY = mapPinMain.style.top;
  var addressX = +pinX.substr(0, pinX.length - 2) + MAIN_PIN_WIDTH / 2;

  if (map.classList.contains('map--faded')) { // inactive mode
    var addressY = +pinY.substr(0, pinY.length - 2) + MAIN_PIN_HEIGHT_INACTIVE / 2;
  } else { // active mode
    var addressY = +pinY.substr(0, pinY.length - 2) + MAIN_PIN_HEIGHT_ACTIVE;
  }
  addressInput.value = Math.floor(addressX) + ', ' + Math.floor(addressY);
};

// Заполняет поле формы с адресом
getAddress();

// Переводим страницу Кексобукинга в активный режим
mapPinMain.addEventListener('mousedown', function () {
  setActiveMode();
  getAddress();
});


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
var renderMapPins = function (accommodations) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < accommodations.length; i++) {
    fragment.appendChild(renderMapPin(accommodations[i]));
  }
  mapPins.appendChild(fragment);
};


// Массив с объявлениями
var accommodations = createAccommodationsArray(ACCOMMODATIONS_AMOUNT);


// Функция создания DOM-элемента карточки объявления на основе JS-объекта
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
  mapCardElement.querySelector('.popup__type').textContent = ACCOMMODATION_TYPE_NAME[accommodation.offer.type].text;
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


// Добавляет в разметку карточку объявления
var renderCard = function (accommodation) {
  map.insertBefore(renderMapCard(accommodation), map.querySelector('.map__filters-container'));
};

// Returns selected option value
var getSelectedOption = function (select) {
  return select.options[select.selectedIndex].value;
};

// Capacity validation
var checkCapacity = function () {
  var roomsNumberSelect = adForm.querySelector('#room_number');
  var guestsNumberSelect = adForm.querySelector('#capacity');

  var guestsNumberOptions = guestsNumberSelect.querySelectorAll('option');
  var roomsNumber = +getSelectedOption(roomsNumberSelect);

  for (var i = 0; i < guestsNumberOptions.length; i++) {
    var guestsNumber = guestsNumberOptions[i];

    if (roomsNumber >= +guestsNumber.value && +guestsNumber.value !== 0) {
      guestsNumber.disabled = false;
    } else if (roomsNumber === 100 && +guestsNumber.value === 0) {
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

// Валидация минимального значение поля «Цена за ночь» в зависимости от типа жилья
var priceInput = adForm.querySelector('#price');
var typeSelect = adForm.querySelector('#type');

typeSelect.addEventListener('change', function () {
  var key = getSelectedOption(typeSelect);
  priceInput.min = ACCOMMODATION_TYPE_NAME[key].minPrice;
  priceInput.placeholder = ACCOMMODATION_TYPE_NAME[key].minPrice;
});

// Capacity validation
var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');

timeInSelect.addEventListener('change', function () {
  timeOutSelect.value = timeInSelect.value;
});

timeOutSelect.addEventListener('change', function () {
  timeInSelect.value = timeOutSelect.value;
});
