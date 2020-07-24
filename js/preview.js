'use strict';

(function () {
  var createSocialPic = function (comment) {
    var socialImg = document.createElement('img');
    socialImg.className = 'social__picture';
    socialImg.src = comment.avatar;
    socialImg.alt = comment.name;
    socialImg.width = window.main.AVATAR_SIZE;
    socialImg.height = window.main.AVATAR_SIZE;
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

  var socialComments = document.querySelector('.social__comments');
  var commentsLoader = document.querySelector('.comments-loader');
  var firstCommentsCounter = document.querySelector('.social__comment-count');

  var moreCommentsHandler = function () {
    var index = document.querySelector('.big-picture__img').getAttribute('data-img');
    loadMoreComments(window.filteredData[index].comments);

    var updatedCommentsList = document.querySelectorAll('.social__comment');
    firstCommentsCounter.firstChild.textContent = updatedCommentsList.length + ' из ';
  };

  var loadMoreComments = function (commentsArray) {
    var initialCommentsList = document.querySelectorAll('.social__comment');
    var currentCount = initialCommentsList.length;
    var moreCount = currentCount + window.main.MAX_COMMENTS_COUNT;

    if (moreCount > commentsArray.length) {
      moreCount = commentsArray.length;
      commentsLoader.classList.add('hidden');
    }

    var fragment = document.createDocumentFragment();

    for (var i = currentCount; i < moreCount; i++) {
      fragment.appendChild(createCommentElement(commentsArray[i]));
    }
    socialComments.appendChild(fragment);
  };

  var renderComments = function (commentsArray) {
    socialComments.innerHTML = '';
    commentsLoader.classList.add('hidden');

    var commentsCount = commentsArray.length;

    if (commentsArray.length > window.main.MAX_COMMENTS_COUNT) {
      commentsCount = window.main.MAX_COMMENTS_COUNT;
      commentsLoader.classList.remove('hidden');
    }

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < commentsCount; i++) {
      fragment.appendChild(createCommentElement(commentsArray[i]));
    }
    socialComments.appendChild(fragment);

    commentsLoader.removeEventListener('click', moreCommentsHandler);
    commentsLoader.addEventListener('click', moreCommentsHandler);
  };

  var changeBigPictureContent = function (pic, commentsArray, index) {
    var bigPictureImg = document.querySelector('.big-picture__img');
    var bigPictureSocial = document.querySelector('.big-picture__social');

    bigPictureImg.querySelector('img').src = pic.url;
    bigPictureImg.setAttribute('data-img', index);
    bigPictureSocial.querySelector('.likes-count').textContent = pic.likes;
    firstCommentsCounter.firstChild.textContent = commentsArray.length + ' из ';

    if (commentsArray.length > window.main.MAX_COMMENTS_COUNT) {
      firstCommentsCounter.firstChild.textContent = window.main.MAX_COMMENTS_COUNT + ' из ';
    }

    bigPictureSocial.querySelector('.comments-count').textContent = commentsArray.length;
    bigPictureSocial.querySelector('.social__caption').textContent = pic.description;

    renderComments(commentsArray);
  };

  var onPopupPressEsc = function (evt) {
    window.main.isEscEvent(evt, closeBigPicture);
  };

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancelButton = document.querySelector('#picture-cancel');
  var pictureContainer = document.querySelector('.pictures');

  var openBigPicture = function (evt) {
    var targetClassName = evt.target.className;

    if (targetClassName === 'picture' || targetClassName === 'picture__img') {
      var index;
      if (evt.target.classList.contains('picture__img')) {
        index = evt.target.getAttribute('data-img');
      } else if (evt.target.classList.contains('picture')) {
        index = evt.target.firstElementChild.getAttribute('data-img');
      }

      changeBigPictureContent(window.filteredData[index], window.filteredData[index].comments, index);
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', onPopupPressEsc);
      pictureContainer.removeEventListener('click', openBigPicture);
    }
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPopupPressEsc);
    pictureContainer.addEventListener('click', openBigPicture);
  };

  pictureContainer.addEventListener('click', openBigPicture);
  bigPictureCancelButton.addEventListener('click', closeBigPicture);
})();
