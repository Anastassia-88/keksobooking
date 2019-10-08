'use strict';

(function () {

  function showErrorMessage(error) {
    var nodeTemplate = document.querySelector('#error').content.querySelector('.error');
    var node = nodeTemplate.cloneNode(true);
    var errorMessage = node.querySelector('.error__message');
    errorMessage.textContent = error;

    var errorMessageClose = node.querySelector('.error__button');
    errorMessageClose.addEventListener('click', closeErrorMessage);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', closeErrorMessage);

    var main = document.querySelector('main');
    main.insertAdjacentElement('afterbegin', node);
  }

  function closeErrorMessage() {
    var errorMessage = document.querySelector('.error');
    errorMessage.remove();
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', closeErrorMessage);
  }

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, closeErrorMessage);
  }

  window.error = {
    showErrorMessage: showErrorMessage,
  };

})();

