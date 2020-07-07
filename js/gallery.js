'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  var pictureContainer = document.querySelector('.pictures');

  var renderPicture = function (pic, i) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').setAttribute('data-img', i);
    picture.querySelector('.picture__img').src = pic.url;
    picture.querySelector('.picture__likes').textContent = pic.likes;
    picture.querySelector('.picture__comments').textContent = pic.comments;
    return picture;
  };

  var successHandler = function (pictures) {
    window.loadData = pictures;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i], i));
    }
    pictureContainer.appendChild(fragment);
  };
  window.load(successHandler);
})();
