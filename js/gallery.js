'use strict';

(function () {
  var onPopupPressEsc = function (evt) {
    window.util.isEscEvent(evt, closeImgEditor);
  };

  var imgUploadStartButton = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgEditorCancelButton = document.querySelector('#upload-cancel');

  var openImgEditor = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPopupPressEsc);
  };

  var closeImgEditor = function () {
    imgUploadOverlay.classList.add('hidden');
    imgUploadStartButton.value = '';
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupPressEsc);
  };

  imgUploadStartButton.addEventListener('change', function () {
    openImgEditor();
  });

  imgEditorCancelButton.addEventListener('click', function () {
    closeImgEditor();
  });

  var effectLevelInput = document.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');

  var getSaturationSize = function (pinPosition, lineWidth) {
    var saturationSize = Math.round(pinPosition * 100 / lineWidth);
    effectLevelInput.value = saturationSize;
  };

  effectLevelPin.addEventListener('mouseup', function () {
    getSaturationSize(effectLevelPin.offsetLeft, effectLevelLine.offsetWidth);
  });

  var effectTypeList = document.querySelector('.effects__list');

  effectTypeList.addEventListener('change', function () {
    effectLevelInput.value = 100;
  });

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
      if (re.test(hashtagsArray[i]) === true && hashtagsArray.length > window.util.HASHTAG_MAX_QTY) {
        textHashtagsInput.setCustomValidity('Нельзя указать больше ' + window.util.HASHTAG_MAX_QTY + ' хэш-тегов.');
      } else if (re.test(hashtagsArray[i]) === false && hashtagsArray[i].length < window.util.HASHTAG_MIN_LENGTH) {
        textHashtagsInput.setCustomValidity('Хэш-тег начинается с символа # (решётка) и состоит минимум из ' + (window.util.HASHTAG_MIN_LENGTH - 1) + ' символа после неё.');
      } else if (reMerged.test(hashtagsArray[i]) === true) {
        textHashtagsInput.setCustomValidity('Хэш-теги разделяются пробелами.');
      } else if (re.test(hashtagsArray[i]) === false) {
        textHashtagsInput.setCustomValidity('Хэш-тег начинается с символа # (решётка), строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
      } else if (re.test(hashtagsArray[i]) === true && hashtagsArray[i].length > window.util.HASHTAG_MAX_LENGTH) {
        textHashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега ' + window.util.HASHTAG_MAX_LENGTH + ' символов, включая решётку.');
      } else {
        textHashtagsInput.setCustomValidity('');
      }
    }
    getEqualHashtags(hashtagsArray);
  });
})();