'use strict';

var Object = function (url, description, likes, comment) {
  this.url = url;
  this.description = description;
  this.likes = likes;
  this.comments = comment;
};

var comments = [
  {
    avatar: '',
    message: '',
    name: ''
  }
];

var getRandomInteger = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

for (var i = 1; i <= 25; i++) {
  var object = new Object('photos/' + i + '.jpg', '', getRandomInteger(15, 200), comments);
}

