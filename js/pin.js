'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var map = window.data.map;
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


  var renderPin = function (accommodation) {
    var pin = pinTemplate.cloneNode(true);
    pin.querySelector('img').src = accommodation.author.avatar;
    pin.querySelector('img').alt = accommodation.offer.description;
    pin.style.left = (accommodation.location.x - PIN_WIDTH / 2) + 'px';
    pin.style.top = (accommodation.location.y - PIN_HEIGHT) + 'px';

    pin.addEventListener('mousedown', function () {
      deleteCard();
      renderCard(accommodation);
      document.addEventListener('keydown', onPopupEscPress);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        deleteCard();
        renderCard(accommodation);
        document.addEventListener('keydown', onPopupEscPress);
      }
    });
    return pin;
  };

  window.pin = {
    renderPin: renderPin,
  }


})();
