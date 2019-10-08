'use strict';

(function () {

  function showSuccessMessage() {
    var nodeTemplate = document.querySelector('#success').content.querySelector('.success');
    var node = nodeTemplate.cloneNode(true);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', closeSuccessMessage);

    var main = document.querySelector('main');
    main.insertAdjacentElement('afterbegin', node);
  }

  function closeSuccessMessage() {
    var successMessage = document.querySelector('.success');
    successMessage.remove();
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', closeSuccessMessage);
  }

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, closeSuccessMessage);
  }

  window.success = {
    showSuccessMessage: showSuccessMessage,
  };

})();

