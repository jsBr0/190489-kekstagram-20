'use strict';

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
  if (evt.key === 'Escape') {
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

var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = document.querySelector('.effect-level__pin');

effectLevelPin.addEventListener('mouseup', function () {

});
