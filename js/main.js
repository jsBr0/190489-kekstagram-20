'use strict';

window.main = (function () {
  var URL_GET = 'https://javascript.pages.academy/kekstagram/data';
  var URL_POST = 'https://javascript.pages.academy/kekstagram';
  var MAX_COMMENTS_COUNT = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MIN_LENGTH = 2;
  var HASHTAG_MAX_QTY = 5;
  var EFFECT_DEFAULT_VALUE = 100;
  var SCALE_STEP_VALUE = 25;
  var SCALE_MAX_VALUE = 100;
  var SCALE_MIN_VALUE = 25;

  return {
    URL_GET: URL_GET,
    URL_POST: URL_POST,
    MAX_COMMENTS_COUNT: MAX_COMMENTS_COUNT,
    HASHTAG_MAX_LENGTH: HASHTAG_MAX_LENGTH,
    HASHTAG_MIN_LENGTH: HASHTAG_MIN_LENGTH,
    HASHTAG_MAX_QTY: HASHTAG_MAX_QTY,
    EFFECT_DEFAULT_VALUE: EFFECT_DEFAULT_VALUE,
    SCALE_STEP_VALUE: SCALE_STEP_VALUE,
    SCALE_MAX_VALUE: SCALE_MAX_VALUE,
    SCALE_MIN_VALUE: SCALE_MIN_VALUE,

    isEscEvent: function (evt, action) {
      var textHashtagsInput = document.querySelector('.text__hashtags');
      var textDescriptionInput = document.querySelector('.text__description');
      if (evt.key === 'Escape' && textHashtagsInput !== document.activeElement && textDescriptionInput !== document.activeElement) {
        evt.preventDefault();
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    }
  };
})();
