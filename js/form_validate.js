'use strict';

(function () {
  var textHashtagsInput = document.querySelector('.text__hashtags');

  var equalsIgnoreCase = function (string1, string2) {
    return string1.toUpperCase() === string2.toUpperCase();
  };

  textHashtagsInput.addEventListener('input', function () {
    var hashtagsArray = textHashtagsInput.value.split(' ');
    var re = /^#[a-zа-яA-ZА-Я0-9]{1,}$/;
    var reMerged = /^#[a-zа-яA-ZА-Я0-9]{1,}#[a-zа-яA-ZА-Я0-9]{1,}$/;
    var getEqualHashtags = function (hashtags) {
      for (var i = 0; i < hashtags.length; i++) {
        for (var j = 0; j < hashtags.length; j++) {
          if (i !== j && equalsIgnoreCase(hashtags[i], hashtags[j])) {
            textHashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
          }
        }
      }
    };

    for (var i = 0; i < hashtagsArray.length; i++) {
      if (re.test(hashtagsArray[i]) === true && hashtagsArray.length > window.main.HASHTAG_MAX_QTY) {
        textHashtagsInput.setCustomValidity('Нельзя указать больше ' + window.main.HASHTAG_MAX_QTY + ' хэш-тегов.');
      } else if (re.test(hashtagsArray[i]) === false && hashtagsArray[i].length < window.main.HASHTAG_MIN_LENGTH) {
        textHashtagsInput.setCustomValidity('Хэш-тег начинается с символа # (решётка) и состоит минимум из ' + (window.main.HASHTAG_MIN_LENGTH - 1) + ' символа после неё.');
      } else if (reMerged.test(hashtagsArray[i]) === true) {
        textHashtagsInput.setCustomValidity('Хэш-теги разделяются пробелами.');
      } else if (re.test(hashtagsArray[i]) === false) {
        textHashtagsInput.setCustomValidity('Хэш-тег начинается с символа # (решётка), строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
      } else if (re.test(hashtagsArray[i]) === true && hashtagsArray[i].length > window.main.HASHTAG_MAX_LENGTH) {
        textHashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега ' + window.main.HASHTAG_MAX_LENGTH + ' символов, включая решётку.');
      } else {
        textHashtagsInput.setCustomValidity('');
      }
    }
    getEqualHashtags(hashtagsArray);
  });
})();
