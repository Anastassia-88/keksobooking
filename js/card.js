'use strict';

(function () {

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');


  var deleteCard = function () {
    var card = window.map.map.querySelector('.map__card');
    if (card) {
      card.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };


  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, deleteCard);
  };


  var renderCard = function (accommodation) {
    var newCard = cardTemplate.cloneNode(true);

    var getFeatures = function (features) {
      var featuresContainer = newCard.querySelector('.popup__features');
      var featuresCollection = newCard.querySelectorAll('.popup__feature');

      for (var i = 0; i < window.data.ACCOMMODATION_FEATURES.length; i++) {
        if (!features.includes(window.data.ACCOMMODATION_FEATURES[i])) {
          featuresContainer.removeChild(featuresCollection[i]);
        }
      }
    };

    var getPhotos = function (photos) {
      var photoContainer = newCard.querySelector('.popup__photos');
      var photoTemplate = newCard.querySelector('.popup__photo');
      photoContainer.removeChild(photoTemplate);
      for (var i = 0; i < photos.length; i++) {
        var photo = photoTemplate.cloneNode(true);
        photo.src = photos[i];
        photoContainer.appendChild(photo);
      }
    };


    // Fill card
    newCard.querySelector('.popup__title').textContent = accommodation.offer.title;
    newCard.querySelector('.popup__text--address').textContent = accommodation.offer.address;
    newCard.querySelector('.popup__text--price').textContent = accommodation.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = window.data.ACCOMMODATION_TYPE_NAME[accommodation.offer.type].text;
    newCard.querySelector('.popup__text--capacity').textContent = accommodation.offer.rooms + ' комнаты для ' +
      accommodation.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + accommodation.offer.checkin +
      ', выезд до ' + accommodation.offer.checkout;
    getFeatures(accommodation.offer.features);
    newCard.querySelector('.popup__description').textContent = accommodation.offer.description;
    getPhotos(accommodation.offer.photos);
    newCard.querySelector('.popup__avatar').src = accommodation.author.avatar;


    // Close card
    var cardClose = newCard.querySelector('.popup__close');

    cardClose.addEventListener('click', function () {
      deleteCard();
    });

    cardClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, deleteCard);
    });


    // Insert card
    window.map.map.insertBefore(newCard, window.map.map.querySelector('.map__filters-container'));
  };


  window.card = {
    renderCard: renderCard,
    onPopupEscPress: onPopupEscPress,
    deleteCard: deleteCard,
  };
})();
