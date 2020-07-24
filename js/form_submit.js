'use strict';
(function () {
  var main = document.querySelector('main');
  var form = document.querySelector('#upload-select-image');

  var renderSubmitPopup = function (statusType) {
    var statusTemplate = document.querySelector('#' + statusType).content.querySelector('section');
    var status = statusTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(status);
    main.appendChild(fragment);
  };

  var onSubmitPopupPressEsc = function (evt, statusType) {
    window.main.isEscEvent(evt, function () {
      return closeSubmitPopup(statusType);
    });
  };

  var showSubmitPopup = function (statusType) {
    window.formEdit.closeImgEditor();
    renderSubmitPopup(statusType);

    document.addEventListener('keydown', function (evt) {
      onSubmitPopupPressEsc(evt, statusType);
    });

    main.addEventListener('click', function () {
      closeSubmitPopup(statusType);
    });

    var popupButton = document.querySelector('.' + statusType + '__button');
    popupButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      closeSubmitPopup(statusType);
      if (statusType === 'error') {
        window.formEdit.openImgEditor();
      }
    });
  };

  var closeSubmitPopup = function (statusType) {
    document.removeEventListener('keydown', function (evt) {
      onSubmitPopupPressEsc(evt, statusType);
    });
    var selector = '.' + statusType;
    var popup = document.querySelector(selector);
    if (popup !== null) {
      popup.remove();
    }
  };

  var submitHandler = function (evt) {
    window.upload(new FormData(form), function () {
      showSubmitPopup('success');
    }, function () {
      showSubmitPopup('error');
    });
    evt.preventDefault();
  };
  form.addEventListener('submit', submitHandler);
})();

