'use strict';

(function () {
  var onPopupPressEsc = function (evt) {
    window.util.isEscEvent(evt, closeBigPicture);
  };

  var onThumbnailPressEnter = function (evt) {
    if (evt.key === 'Enter' && evt.target.firstElementChild.classList.contains('picture__img')) {
      var item = evt.target.firstElementChild.getAttribute('data-img');
      changeBigPictureContent(window.data.picturesArray[item], window.data.picturesArray[item].comments.length);
      openBigPicture();
    }
  };

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
    fragment.appendChild(createCommentElement(window.data.commentsArray[0]));
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

  var pictureContainer = document.querySelector('.pictures');

  pictureContainer.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      var item = evt.target.getAttribute('data-img');
      changeBigPictureContent(window.data.picturesArray[item], window.data.picturesArray[item].comments.length);
      openBigPicture();
    }
  });

  document.addEventListener('keydown', onThumbnailPressEnter);

  bigPictureCancelButton.addEventListener('click', function () {
    closeBigPicture();
  });

})();
