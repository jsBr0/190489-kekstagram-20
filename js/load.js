'use strict';

(function () {
  var URL_GET = 'https://javascript.pages.academy/kekstagram/data';

  var StatusCode = {
    OK: 200
  };

  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.open('GET', URL_GET);
    xhr.send();
  };

})();
