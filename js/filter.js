'use strict';

(function () {
  var Price = {
    LOW: 10000,
    HIGH: 50000,
  };

  var filterForm = window.form.filterForm;

  var typeFilter = filterForm.querySelector('#housing-type');
  var priceFilter = filterForm.querySelector('#housing-price');
  var roomsNumberFilter = filterForm.querySelector('#housing-rooms');
  var guestsNumberFilter = filterForm.querySelector('#housing-guests');
  var housingFeaturesFilter = filterForm.querySelector('#housing-features');


  function determinePrice(price) {
    var selectedPrice = window.util.getSelectedOptionValue(priceFilter);
    var isPriceRequired;

    switch (selectedPrice) {
      case 'middle':
        isPriceRequired = (price >= Price.LOW) && (price < Price.HIGH);
        break;
      case 'low':
        isPriceRequired = (price < Price.LOW);
        break;
      case 'high':
        isPriceRequired = (price >= Price.HIGH);
        break;
      default:
        isPriceRequired = true;
    }

    return isPriceRequired;
  }


  function determineFeatures(availableFeatures) {
    var selectedFeatures = housingFeaturesFilter.querySelectorAll('input:checked');
    var requiredFeatures = [];
    for (var i = 0; i < selectedFeatures.length; i++) {
      requiredFeatures.push(selectedFeatures[i].value);
    }
    return window.util.isArrayInclude(availableFeatures, requiredFeatures);
  }


  function updatePins(accommodations) {
    window.util.removeNodeContent(window.map.mapPinsContainer);
    window.card.deleteCard();

    var filteredPins = accommodations.filter(function (it) {
      var selectedType = window.util.getSelectedOptionValue(typeFilter);
      var selectedRoomsNumber = window.util.getSelectedOptionValue(roomsNumberFilter);
      var selectedGuestsNumber = window.util.getSelectedOptionValue(guestsNumberFilter);

      var isTypeRequired = (selectedType === 'any') ? true : (it.offer.type === selectedType);
      var isPriceRequired = determinePrice(it.offer.price);
      var isRoomsNumberRequired = (selectedRoomsNumber === 'any') ? true : (it.offer.rooms === parseInt(selectedRoomsNumber, 10));
      var isGuestsNumberRequired = (selectedGuestsNumber === 'any') ? true : (it.offer.guests === parseInt(selectedGuestsNumber, 10));
      var isFeaturesRequired = determineFeatures(it.offer.features);

      return isTypeRequired && isPriceRequired && isRoomsNumberRequired && isGuestsNumberRequired && isFeaturesRequired;
    });
    window.map.renderPins(filteredPins);
  }

  window.filter = {
    updatePins: updatePins,
  };

})();
