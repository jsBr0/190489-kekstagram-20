'use strict';

(function () {
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var imgUploadPreviewForm = document.querySelector('.img-upload__preview');
  var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
  var imgUploadStartButton = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgEditorCancelButton = document.querySelector('#upload-cancel');
  var effectsList = document.querySelector('.effects__list');
  var effectsListRadio = document.querySelectorAll('.effects__radio');
  var textHashtagsInput = document.querySelector('.text__hashtags');
  var textDescriptionInput = document.querySelector('.text__description');
  var scaleImgButton = document.querySelector('.img-upload__scale');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var setPinSettings = function (position) {
    effectLevelPin.style.left = position + '%';
    effectLevelDepth.style.width = position + '%';
    effectLevelValue.value = position;
  };

  var setDefaultForm = function () {
    effectsListRadio[0].checked = true;
    scaleControlValue.value = window.main.SCALE_MAX_VALUE + '%';
    imgUploadPreviewForm.style.transform = 'scale(' + window.main.SCALE_MAX_VALUE / window.main.SCALE_MAX_VALUE + ')';
    imgUploadPreview.className = '';
    imgUploadPreview.style = '';
    imgUploadPreview.classList.add('effects__preview--none');
    effectLevelPin.classList.add('hidden');
    textHashtagsInput.value = '';
    textDescriptionInput.value = '';
    setPinSettings(window.main.EFFECT_DEFAULT_VALUE);
  };

  var onPopupPressEsc = function (evt) {
    window.main.isEscEvent(evt, window.closeImgEditor);
  };

  window.openImgEditor = function () {
    document.querySelector('body').classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    setDefaultForm();
    document.addEventListener('keydown', onPopupPressEsc);
  };

  window.closeImgEditor = function () {
    document.querySelector('body').classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    imgUploadStartButton.value = '';
    setDefaultForm();
    document.removeEventListener('keydown', onPopupPressEsc);
  };

  imgUploadStartButton.addEventListener('change', window.openImgEditor);

  imgEditorCancelButton.addEventListener('click', window.closeImgEditor);

  var changeImgScale = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    var classBigger = 'scale__control--bigger';
    var classSmaller = 'scale__control--smaller';
    var scaleValueNumber = parseInt(scaleControlValue.value, 10);
    if (target.classList.contains(classBigger)) {
      if (scaleValueNumber < window.main.SCALE_MAX_VALUE) {
        scaleValueNumber += window.main.SCALE_STEP_VALUE;
      }
    } else if (target.classList.contains(classSmaller)) {
      if (scaleValueNumber > window.main.SCALE_MIN_VALUE) {
        scaleValueNumber -= window.main.SCALE_STEP_VALUE;
      }
    }
    scaleControlValue.value = scaleValueNumber + '%';
    imgUploadPreviewForm.style.transform = 'scale(' + scaleValueNumber / window.main.SCALE_MAX_VALUE + ')';
  };

  scaleImgButton.addEventListener('click', changeImgScale);

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var currentPosition = ((effectLevelPin.offsetLeft - shift.x) * 100 / effectLevelLine.offsetWidth);

      if (currentPosition < 0) {
        currentPosition = 0;
      } else if (currentPosition > 100) {
        currentPosition = 100;
      }

      setPinSettings(currentPosition);
      calculateEffectValue(currentPosition);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var setBooleanPinPosition = function (position) {
    if (position > 5 && position < 10) {
      setPinSettings(100);
    } else if (position < 95 && position > 90) {
      setPinSettings(0);
    }

    var effectValue;
    if (position === 100) {
      effectValue = 1;
    } else if (position === 0) {
      effectValue = 0;
    }

    return effectValue;
  };

  var calculateEffectValue = function (position) {
    if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
      imgUploadPreview.style.filter = 'grayscale(' + setBooleanPinPosition(position) + ')';
    } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
      imgUploadPreview.style.filter = 'sepia(' + setBooleanPinPosition(position) + ')';
    } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
      imgUploadPreview.style.filter = 'invert(' + position + '%)';
    } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
      imgUploadPreview.style.filter = 'blur(' + (Math.ceil(position / (window.main.EFFECT_DEFAULT_VALUE / 4) - 1)) + 'px)';
    } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
      if (position === 0) {
        imgUploadPreview.style.filter = 'brightness(1)';
      } else {
        imgUploadPreview.style.filter = 'brightness(' + (Math.ceil(position / Math.floor(window.main.EFFECT_DEFAULT_VALUE / 3))) + ')';
      }
    }
  };

  var changePreviewEffect = function (evt) {
    evt.preventDefault();
    var target = evt.target;

    setPinSettings(window.main.EFFECT_DEFAULT_VALUE);
    imgUploadPreview.style = '';

    var radioButtonClass = 'effects__radio';
    if (target.classList.contains(radioButtonClass)) {
      for (var i = 0; i < effectsList.children.length; i++) {
        var effectClassName = effectsList.querySelectorAll('span')[i].classList[1];
        if (effectsList.querySelectorAll('input')[i].checked) {
          imgUploadPreview.className = '';
          imgUploadPreview.classList.add(effectClassName);
        }
      }

      if (imgUploadPreview.classList.contains('effects__preview--none')) {
        effectLevelPin.classList.add('hidden');
      } else {
        effectLevelPin.classList.remove('hidden');
      }
    }
  };

  effectsList.addEventListener('change', changePreviewEffect);

  // var equalsIgnoreCase = function (string1, string2) {
  //   return string1.toUpperCase() === string2.toUpperCase();
  // };

  // textHashtagsInput.addEventListener('input', function () {
  //   var hashtagsArray = textHashtagsInput.value.split(' ');
  //   var re = /^#[a-zа-яA-ZА-Я0-9]{1,}$/;
  //   var reMerged = /^#[a-zа-яA-ZА-Я0-9]{1,}#[a-zа-яA-ZА-Я0-9]{1,}$/;
  //   var getEqualHashtags = function (hashtags) {
  //     for (var i = 0; i < hashtags.length; i++) {
  //       for (var j = 0; j < hashtags.length; j++) {
  //         if (i !== j && equalsIgnoreCase(hashtags[i], hashtags[j])) {
  //           textHashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
  //         }
  //       }
  //     }
  //   };

  //   for (var i = 0; i < hashtagsArray.length; i++) {
  //     if (re.test(hashtagsArray[i]) === true && hashtagsArray.length > window.main.HASHTAG_MAX_QTY) {
  //       textHashtagsInput.setCustomValidity('Нельзя указать больше ' + window.main.HASHTAG_MAX_QTY + ' хэш-тегов.');
  //     } else if (re.test(hashtagsArray[i]) === false && hashtagsArray[i].length < window.main.HASHTAG_MIN_LENGTH) {
  //       textHashtagsInput.setCustomValidity('Хэш-тег начинается с символа # (решётка) и состоит минимум из ' + (window.main.HASHTAG_MIN_LENGTH - 1) + ' символа после неё.');
  //     } else if (reMerged.test(hashtagsArray[i]) === true) {
  //       textHashtagsInput.setCustomValidity('Хэш-теги разделяются пробелами.');
  //     } else if (re.test(hashtagsArray[i]) === false) {
  //       textHashtagsInput.setCustomValidity('Хэш-тег начинается с символа # (решётка), строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
  //     } else if (re.test(hashtagsArray[i]) === true && hashtagsArray[i].length > window.main.HASHTAG_MAX_LENGTH) {
  //       textHashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега ' + window.main.HASHTAG_MAX_LENGTH + ' символов, включая решётку.');
  //     } else {
  //       textHashtagsInput.setCustomValidity('');
  //     }
  //   }
  //   getEqualHashtags(hashtagsArray);
  // });
})();
