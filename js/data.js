'use strict';

(function () {
  var createObjectPicture = function (index) {
    var randomLikes = window.util.getRandomInteger(window.util.LIKES_MIN_VALUE, window.util.LIKES_MAX_VALUE);
    return {
      url: 'photos/' + index + '.jpg',
      description: 'Просто красивое фото',
      likes: randomLikes,
      comments: commentsArray
    };
  };

  var createObjectComment = function () {
    var randomAvatar = window.util.getRandomInteger(window.util.AVATAR_FIRST_URL_VALUE, window.util.AVATAR_LAST_URL_VALUE);
    return {
      avatar: 'img/avatar-' + randomAvatar + '.svg',
      message: 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      name: 'Вавилен'
    };
  };

  var commentsArray = [];

  var createArrayComments = function () {
    for (var i = 0; i < window.util.COMMENTS_MAX_QTY; i++) {
      commentsArray.push(createObjectComment());
    }
  };

  createArrayComments();

  var picturesArray = [];

  var createArrayPictures = function () {
    for (var i = 0; i < window.util.PICTURES_QTY; i++) {
      picturesArray.push(createObjectPicture(i + 1));
    }
  };

  createArrayPictures();

  window.data = {
    picturesArray: picturesArray,
    commentsArray: commentsArray,
  };
})();