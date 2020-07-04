'use strict';

(function () {
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
    for (var i = 0; i < window.data.picturesArray.length; i++) {
      fragment.appendChild(renderPicture(window.data.picturesArray[i], i));
    }
    return fragment;
  };

  var pictureContainer = document.querySelector('.pictures');

  pictureContainer.appendChild(createPictureElements());
})();
