'use strict';

(function () {
  var effectLevelFieldset = document.querySelector('.effect-level');
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
    effectLevelFieldset.classList.add('visually-hidden');
    textHashtagsInput.value = '';
    textDescriptionInput.value = '';
    setPinSettings(window.main.EFFECT_DEFAULT_VALUE);
  };

  var onPopupPressEsc = function (evt) {
    if (textHashtagsInput !== document.activeElement && textDescriptionInput !== document.activeElement) {
      window.main.isEscEvent(evt, closeImgEditor);
    }
  };

  var openImgEditor = function () {
    document.querySelector('body').classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    setDefaultForm();
    document.addEventListener('keydown', onPopupPressEsc);
  };

  var closeImgEditor = function () {
    document.querySelector('body').classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    imgUploadStartButton.value = '';
    setDefaultForm();
    document.removeEventListener('keydown', onPopupPressEsc);
  };

  imgUploadStartButton.addEventListener('change', openImgEditor);

  imgEditorCancelButton.addEventListener('click', closeImgEditor);

  var changeImgScale = function (evt) {
    evt.preventDefault();
    var targetClassList = evt.target.classList;
    var classBigger = 'scale__control--bigger';
    var classSmaller = 'scale__control--smaller';
    var scaleValueNumber = parseInt(scaleControlValue.value, 10);
    if (targetClassList.contains(classBigger)) {
      if (scaleValueNumber < window.main.SCALE_MAX_VALUE) {
        scaleValueNumber += window.main.SCALE_STEP_VALUE;
      }
    } else if (targetClassList.contains(classSmaller)) {
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

      var currentPosition = Math.round((effectLevelPin.offsetLeft - shift.x) * 100 / effectLevelLine.offsetWidth);

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

  var calculateEffectValue = function (position) {
    if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
      imgUploadPreview.style.filter = 'grayscale(' + position / window.main.EFFECT_DEFAULT_VALUE + ')';
    } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
      imgUploadPreview.style.filter = 'sepia(' + position / window.main.EFFECT_DEFAULT_VALUE + ')';
    } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
      imgUploadPreview.style.filter = 'invert(' + position + '%)';
    } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
      imgUploadPreview.style.filter = 'blur(' + position * 3 / window.main.EFFECT_DEFAULT_VALUE + 'px)';
    } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
      imgUploadPreview.style.filter = 'brightness(' + (position * 2 / window.main.EFFECT_DEFAULT_VALUE + 1) + ')';
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
        effectLevelFieldset.classList.add('visually-hidden');
      } else {
        effectLevelFieldset.classList.remove('visually-hidden');
      }
    }
  };
  effectsList.addEventListener('change', changePreviewEffect);

  window.formEdit = {
    openImgEditor: openImgEditor,
    closeImgEditor: closeImgEditor
  };
})();
