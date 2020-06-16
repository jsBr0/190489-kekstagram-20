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
    description: '',
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

var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = document.querySelector('.big-picture__img');
var bigPictureSocial = document.querySelector('.big-picture__social');

bigPicture.classList.remove('hidden');
bigPictureImg.querySelector('img').src = descriptionArray[0].url;
bigPictureSocial.querySelector('.likes-count').textContent = descriptionArray[0].likes;
bigPictureSocial.querySelector('.comments-count').textContent = commentsArray.length;

var socialComments = document.querySelector('.social__comments');
var nanana = socialComments.querySelectorAll('li');
console.log(nanana);
