'use strict';

var HASHTAG_MAX_LENGTH = 20;
var HASHTAG_MIN_LENGTH = 2;
var HASHTAG_MAX_QTY = 5;

var getRandomInteger = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

var createObjectComment = function () {
  var randomAvatar = getRandomInteger(1, 6);
  return {
    avatar: 'img/avatar-' + randomAvatar + '.svg',
    message: 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    name: 'Вавилен'
  };
};

var commentsArray = [];

var createArrayObjectsComment = function () {
  for (var i = 0; i < 3; i++) {
    commentsArray.push(createObjectComment());
  }
};

createArrayObjectsComment();

var createObjectDescription = function (index) {
  var randomLikes = getRandomInteger(15, 200);
  return {
    url: 'photos/' + index + '.jpg',
    description: 'Ну как вам?',
    likes: randomLikes,
    comments: commentsArray
  };
};

var descriptionArray = [];

var createArrayObjectsDescription = function () {
  for (var i = 0; i < 25; i++) {
    descriptionArray.push(createObjectDescription(i + 1));
  }
};

createArrayObjectsDescription();

var picTemplate = document.querySelector('#picture').content.querySelector('a');

var renderPicture = function (description) {
  var picture = picTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = description.url;
  picture.querySelector('.picture__likes').textContent = description.likes;
  picture.querySelector('.picture__comments').textContent = description.comments;
  return picture;
};

var createPictureElements = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < descriptionArray.length; i++) {
    fragment.appendChild(renderPicture(descriptionArray[i]));
  }
  return fragment;
};

var pictureElement = document.querySelector('.pictures');

pictureElement.appendChild(createPictureElements());

var bigPicture = document.querySelector('.big-picture');

var changePictureContent = function (description, commentsArrayLength) {
  var bigPictureImg = document.querySelector('.big-picture__img');
  var bigPictureSocial = document.querySelector('.big-picture__social');
  bigPicture.classList.remove('hidden');
  bigPictureImg.querySelector('img').src = description.url;
  bigPictureSocial.querySelector('.likes-count').textContent = description.likes;
  bigPictureSocial.querySelector('.comments-count').textContent = commentsArrayLength;
  bigPictureSocial.querySelector('.social__caption').textContent = description.description;
  bigPictureSocial.querySelector('.social__comment-count').classList.add('hidden');
};

changePictureContent(descriptionArray[0], commentsArray.length);

var createSocialImg = function (comment) {
  var socialImg = document.createElement('img');
  socialImg.className = 'social__picture';
  socialImg.src = comment.avatar;
  socialImg.alt = comment.name;
  socialImg.width = 35;
  socialImg.height = 35;

  return socialImg;
};

var createSocialText = function (comment) {
  var socialText = document.createElement('p');
  socialText.className = 'social__text';
  socialText.textContent = comment.message;

  return socialText;
};

var createNewComment = function (comment) {
  var newComment = document.createElement('li');
  newComment.className = 'social__comment';
  newComment.appendChild(createSocialImg(comment));
  newComment.appendChild(createSocialText(comment));

  return newComment;
};

var fragment = document.createDocumentFragment();

fragment.appendChild(createNewComment(commentsArray[0]));

var socialComments = document.querySelector('.social__comments');

socialComments.appendChild(fragment);

document.querySelector('.comments-loader').classList.add('hidden');

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
};

var cancelButton = document.querySelector('#picture-cancel');

cancelButton.addEventListener('click', closeBigPicture);

var imgUploadStartButton = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgEditorClose = document.querySelector('#upload-cancel');

var onPopupPressEsc = function (evt) {
  if (evt.key === 'Escape' && document.querySelector('.text__hashtags') !== document.activeElement) {
    evt.preventDefault();
    closeImgEditor();
  }
};

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

imgEditorClose.addEventListener('click', function () {
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
    if (re.test(hashtagsArray[i]) === true && hashtagsArray.length > HASHTAG_MAX_QTY) {
      textHashtagsInput.setCustomValidity('Нельзя указать больше ' + HASHTAG_MAX_QTY + ' хэш-тегов.');
    } else if (re.test(hashtagsArray[i]) === false && hashtagsArray[i].length < HASHTAG_MIN_LENGTH) {
      textHashtagsInput.setCustomValidity('Хэш-тег начинается с символа # (решётка) и состоит минимум из ' + (HASHTAG_MIN_LENGTH - 1) + ' символа после неё.');
    } else if (reMerged.test(hashtagsArray[i]) === true) {
      textHashtagsInput.setCustomValidity('Хэш-теги разделяются пробелами.');
    } else if (re.test(hashtagsArray[i]) === false) {
      textHashtagsInput.setCustomValidity('Хэш-тег начинается с символа # (решётка), строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
    } else if (re.test(hashtagsArray[i]) === true && hashtagsArray[i].length > HASHTAG_MAX_LENGTH) {
      textHashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега ' + HASHTAG_MAX_LENGTH + ' символов, включая решётку.');
    } else {
      textHashtagsInput.setCustomValidity('');
    }
  }
  getEqualHashtags(hashtagsArray);
});
