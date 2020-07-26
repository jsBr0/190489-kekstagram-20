'use strict';

(function () {
  var textHashtagsInput = document.querySelector('.text__hashtags');

  textHashtagsInput.addEventListener('input', function () {
    var hashtagsArray = textHashtagsInput.value.split(' ');
    var re = /^#{1}[a-zа-яA-ZА-Я\d]{1,}$/;
    var reNoWhitespace = /^#{1}[a-zа-яA-ZА-Я\d]{1,}#{1}[a-zа-яA-ZА-Я\d]{1,}$/;

    var equalsIgnoreCase = function (string1, string2) {
      return string1.toUpperCase() === string2.toUpperCase();
    };

    var getEqualHashtags = function (hashtags) {
      for (var i = 0; i < hashtags.length; i++) {
        for (var j = 0; j < hashtags.length; j++) {
          if (i !== j && equalsIgnoreCase(hashtags[i], hashtags[j])) {
            textHashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
          }
        }
      }
    };

    var colorInvalidInput = function () {
      if (textHashtagsInput.validity.valid === false) {
        textHashtagsInput.style.border = '3px solid red';
      } else {
        textHashtagsInput.style.border = '';
      }
    };

    for (var i = 0; i < hashtagsArray.length; i++) {
      if (!re.test(hashtagsArray[i])) {
        if (!hashtagsArray[i].startsWith('#') && !hashtagsArray[i] === '') {
          textHashtagsInput.setCustomValidity('Хэш-тег начинается с символа # (решётка).');
        } else if (reNoWhitespace.test(hashtagsArray[i]) || hashtagsArray[i] === '') {
          textHashtagsInput.setCustomValidity('Хэш-теги разделяются одним пробелом.');
        } else if (hashtagsArray[i].startsWith('#') && hashtagsArray[i].length > 1) {
          textHashtagsInput.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
        } else if (hashtagsArray[i].startsWith('#') && hashtagsArray[i].length === 1) {
          textHashtagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки.');
        }
        break;
      } else if (re.test(hashtagsArray[i]) && hashtagsArray[i].length > window.main.HASHTAG_MAX_LENGTH) {
        textHashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега ' + window.main.HASHTAG_MAX_LENGTH + ' символов, включая решётку.');
      } else if (re.test(hashtagsArray[i]) && hashtagsArray.length > window.main.HASHTAG_MAX_QTY) {
        textHashtagsInput.setCustomValidity('Нельзя указать больше ' + window.main.HASHTAG_MAX_QTY + ' хэш-тегов.');
      } else {
        textHashtagsInput.setCustomValidity('');
      }
    }
    getEqualHashtags(hashtagsArray);
    colorInvalidInput();
  });
})();
