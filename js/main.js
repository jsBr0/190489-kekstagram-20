'use strict';

window.main = (function () {
  var PICTURES_QTY = 25;
  var LIKES_MIN_VALUE = 15;
  var LIKES_MAX_VALUE = 200;
  var AVATAR_FIRST_URL_VALUE = 1;
  var AVATAR_LAST_URL_VALUE = 6;
  var COMMENTS_MAX_QTY = 3;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MIN_LENGTH = 2;
  var HASHTAG_MAX_QTY = 5;
  var EFFECT_DEFAULT_VALUE = 100;

  return {
    PICTURES_QTY: PICTURES_QTY,
    LIKES_MIN_VALUE: LIKES_MIN_VALUE,
    LIKES_MAX_VALUE: LIKES_MAX_VALUE,
    AVATAR_FIRST_URL_VALUE: AVATAR_FIRST_URL_VALUE,
    AVATAR_LAST_URL_VALUE: AVATAR_LAST_URL_VALUE,
    COMMENTS_MAX_QTY: COMMENTS_MAX_QTY,
    HASHTAG_MAX_LENGTH: HASHTAG_MAX_LENGTH,
    HASHTAG_MIN_LENGTH: HASHTAG_MIN_LENGTH,
    HASHTAG_MAX_QTY: HASHTAG_MAX_QTY,
    EFFECT_DEFAULT_VALUE: EFFECT_DEFAULT_VALUE,

    getRandomInteger: function (min, max) {
      var random = min + Math.random() * (max + 1 - min);
      return Math.floor(random);
    },

    isEscEvent: function (evt, action) {
      var textHashtagsInput = document.querySelector('.text__hashtags');
      var textDescriptionInput = document.querySelector('.text__description');
      if (evt.key === 'Escape' && textHashtagsInput !== document.activeElement && textDescriptionInput !== document.activeElement) {
        evt.preventDefault();
        action();
      }
    }
  };
})();
