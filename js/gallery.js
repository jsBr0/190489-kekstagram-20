'use strict';

(function () {
  var renderPicture = function (pic, i) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').setAttribute('data-img', i);
    picture.querySelector('.picture__img').src = pic.url;
    picture.querySelector('.picture__likes').textContent = pic.likes;
    picture.querySelector('.picture__comments').textContent = pic.comments;
    return picture;
  };

  window.render = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPicture(data[i], i));
    }
    var pictureContainer = document.querySelector('.pictures');
    pictureContainer.appendChild(fragment);
  };
})();

//   var successHandler = function (pictures) {
//     var fragment = document.createDocumentFragment();
//     for (var i = 0; i < pictures.length; i++) {
//       fragment.appendChild(renderPicture(pictures[i], i));
//     }
//     var pictureContainer = document.querySelector('.pictures');
//     pictureContainer.appendChild(fragment);
//     window.loadData = pictures;
//   };

//   window.load(successHandler);
// })();
