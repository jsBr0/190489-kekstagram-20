'use strict';
(function () {


  var successHandler = function (data) {
    window.render(data);
  };

  window.load(successHandler);
})();
