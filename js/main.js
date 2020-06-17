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

var renderPic = function (description) {
  var picture = picTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = description.url;
  picture.querySelector('.picture__likes').textContent = description.likes;
  picture.querySelector('.picture__comments').textContent = description.comments;
  return picture;
};

var createPictureElements = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < descriptionArray.length; i++) {
    fragment.appendChild(renderPic(descriptionArray[i]));
  }
  return fragment;
};

var picElement = document.querySelector('.pictures');

picElement.appendChild(createPictureElements());

var changePictureContent = function (description, commentsArrayLength) {
  var bigPicture = document.querySelector('.big-picture');
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

document.querySelector('body').classList.add('modal-open');
