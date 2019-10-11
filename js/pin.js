'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function createPin(accommodation) {
    var pin = pinTemplate.cloneNode(true);
    pin.querySelector('img').src = accommodation.author.avatar;
    pin.querySelector('img').alt = accommodation.offer.description;
    pin.style.left = (accommodation.location.x - PIN_WIDTH / 2) + 'px';
    pin.style.top = (accommodation.location.y - PIN_HEIGHT) + 'px';

    var changeCard = function () {
      window.card.deleteCard();
      window.card.renderCard(accommodation);
      document.addEventListener('keydown', window.card.onPopupEscPress);
    };

    pin.addEventListener('mousedown', function () {
      changeCard();
    });

    pin.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, changeCard);
    });
    return pin;
  }

  window.pin = {
    createPin: createPin,
  };

})();
