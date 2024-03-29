'use strict';

(function () {

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var map = window.data.map;


  function deleteCard() {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  }


  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, deleteCard);
  }


  function renderCard(accommodation) {
    var newCard = cardTemplate.cloneNode(true);

    function getFeatures(features) {
      var featuresContainer = newCard.querySelector('.popup__features');
      var featuresCollection = newCard.querySelectorAll('.popup__feature');

      for (var i = 0; i < window.data.ACCOMMODATION_FEATURES.length; i++) {
        if (!features.includes(window.data.ACCOMMODATION_FEATURES[i])) {
          featuresContainer.removeChild(featuresCollection[i]);
        }
      }
    }

    function getPhotos(photos) {
      var photoContainer = newCard.querySelector('.popup__photos');
      var photoTemplate = newCard.querySelector('.popup__photo');
      photoContainer.removeChild(photoTemplate);
      for (var i = 0; i < photos.length; i++) {
        var photo = photoTemplate.cloneNode(true);
        photo.src = photos[i];
        photoContainer.appendChild(photo);
      }
    }


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


    var cardClose = newCard.querySelector('.popup__close');
    cardClose.addEventListener('click', deleteCard);
    document.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, deleteCard);
    });


    map.insertBefore(newCard, map.querySelector('.map__filters-container'));
  }


  window.card = {
    renderCard: renderCard,
    onPopupEscPress: onPopupEscPress,
    deleteCard: deleteCard,
  };
})();
