'use strict';

var PICTURES_QTY = 25;
var LIKES_MIN_VALUE = 15;
var LIKES_MAX_VALUE = 200;
var AVATAR_FIRST_URL_VALUE = 1;
var AVATAR_LAST_URL_VALUE = 6;
var COMMENTS_MAX_QTY = 3;
var HASHTAG_MAX_LENGTH = 20;
var HASHTAG_MIN_LENGTH = 2;
var HASHTAG_MAX_QTY = 5;

var getRandomInteger = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

var onPopupPressEsc = function (evt) {
  var hashtagField = document.querySelector('.text__hashtags');
  var textField = document.querySelector('.text__description');
  if (evt.key === 'Escape' && hashtagField !== document.activeElement && textField !== document.activeElement) {
    evt.preventDefault();
    closeBigPicture();
    closeImgEditor();
  }
};

var onThumbnailPressEnter = function (evt) {
  if (evt.key === 'Enter' && evt.target.firstElementChild.classList.contains('picture__img')) {
    var item = evt.target.firstElementChild.getAttribute('data-img');
    changeBigPictureContent(picturesArray[item], picturesArray[item].comments.length);
    openBigPicture();
  }
};

var createObjectPicture = function (index) {
  var randomLikes = getRandomInteger(LIKES_MIN_VALUE, LIKES_MAX_VALUE);
  return {
    url: 'photos/' + index + '.jpg',
    description: 'Просто красивое фото',
    likes: randomLikes,
    comments: commentsArray
  };
};

var createObjectComment = function () {
  var randomAvatar = getRandomInteger(AVATAR_FIRST_URL_VALUE, AVATAR_LAST_URL_VALUE);
  return {
    avatar: 'img/avatar-' + randomAvatar + '.svg',
    message: 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    name: 'Вавилен'
  };
};

var commentsArray = [];

var createArrayComments = function () {
  for (var i = 0; i < COMMENTS_MAX_QTY; i++) {
    commentsArray.push(createObjectComment());
  }
};

createArrayComments();

var picturesArray = [];

var createArrayPictures = function () {
  for (var i = 0; i < PICTURES_QTY; i++) {
    picturesArray.push(createObjectPicture(i + 1));
  }
};

createArrayPictures();

var pictureTemplate = document.querySelector('#picture').content.querySelector('a');

var renderPicture = function (pic, i) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').setAttribute('data-img', i);
  picture.querySelector('.picture__img').src = pic.url;
  picture.querySelector('.picture__likes').textContent = pic.likes;
  picture.querySelector('.picture__comments').textContent = pic.comments;
  return picture;
};

var createPictureElements = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < picturesArray.length; i++) {
    fragment.appendChild(renderPicture(picturesArray[i], i));
  }
  return fragment;
};

var pictureContainer = document.querySelector('.pictures');

pictureContainer.appendChild(createPictureElements());

var changeBigPictureContent = function (pic, commentsLength) {
  var bigPictureImg = document.querySelector('.big-picture__img');
  var bigPictureSocial = document.querySelector('.big-picture__social');
  bigPictureImg.querySelector('img').src = pic.url;
  bigPictureSocial.querySelector('.likes-count').textContent = pic.likes;
  bigPictureSocial.querySelector('.comments-count').textContent = commentsLength;
  bigPictureSocial.querySelector('.social__caption').textContent = pic.description;
  bigPictureSocial.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureSocial.querySelector('.comments-loader').classList.add('hidden');
};

var createSocialPic = function (comment) {
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

var createCommentElement = function (comment) {
  var newComment = document.createElement('li');
  newComment.className = 'social__comment';
  newComment.appendChild(createSocialPic(comment));
  newComment.appendChild(createSocialText(comment));
  return newComment;
};

var createNewComment = function () {
  var socialComments = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createCommentElement(commentsArray[0]));
  socialComments.appendChild(fragment);
};

createNewComment();

var bigPicture = document.querySelector('.big-picture');
var bigPictureCancelButton = document.querySelector('#picture-cancel');

var openBigPicture = function () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupPressEsc);
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupPressEsc);
};

pictureContainer.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('picture__img')) {
    var item = evt.target.getAttribute('data-img');
    changeBigPictureContent(picturesArray[item], picturesArray[item].comments.length);
    openBigPicture();
  }
});

document.addEventListener('keydown', onThumbnailPressEnter);


bigPictureCancelButton.addEventListener('click', function () {
  closeBigPicture();
});

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
