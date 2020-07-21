'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancelButton = document.querySelector('#picture-cancel');
  var pictureContainer = document.querySelector('.pictures');

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

  var loadMoreComments = function (commentsArray) {
    var currentCount = window.main.MAX_COMMENTS_COUNT;
    var moreCount = currentCount + window.main.MAX_COMMENTS_COUNT;

    var fragment = document.createDocumentFragment();

    if (moreCount < commentsArray.length) {
      for (var i = currentCount; i < moreCount; i++) {
        fragment.appendChild(createCommentElement(commentsArray[i]));
        socialComments.appendChild(fragment);
        if (moreCount - i === 1) {
          currentCount += window.main.MAX_COMMENTS_COUNT;
        }
      }
    } else {
      for (var j = currentCount; j < commentsArray.length; j++) {
        fragment.appendChild(createCommentElement(commentsArray[j]));
        socialComments.appendChild(fragment);
      }
      commentsLoader.classList.add('hidden');
    }
  };


  var renderComments = function (commentsArray) {
    var socialCommentCount = document.querySelector('.social__comment-count');

    socialComments.innerHTML = '';
    commentsLoader.classList.add('hidden');

    var commentsCount;

    if (commentsArray.length <= window.main.MAX_COMMENTS_COUNT) {
      commentsCount = commentsArray.length;
    } else {
      commentsCount = window.main.MAX_COMMENTS_COUNT;
      commentsLoader.classList.remove('hidden');
    }

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < commentsCount; i++) {
      fragment.appendChild(createCommentElement(commentsArray[i]));
    }
    socialComments.appendChild(fragment);

    if (!socialComments.classList.contains('handler')) {
      var handle = function () {
        loadMoreComments(commentsArray);
      };
      commentsLoader.addEventListener('click', handle);
      socialComments.classList.add('handler');
    }
  };

  // var createComments = function (commentsArray) {
  //   var commentsLoader = document.querySelector('.comments-loader');
  //   var socialComments = document.querySelector('.social__comments');
  //   socialComments.innerHTML = '';

  //   var count;

  //   var fragment = document.createDocumentFragment();

  //   if (commentsArray.length < window.main.MAX_COMMENTS_COUNT) {
  //     count = commentsArray.length;
  //     commentsLoader.classList.add('hidden');
  //   } else {
  //     count = window.main.MAX_COMMENTS_COUNT;
  //     commentsLoader.classList.remove('hidden');
  //     commentsLoader.addEventListener('click', function () {
  //       var moreCommentsCount = count + window.main.MAX_COMMENTS_COUNT;
  //       if (moreCommentsCount < commentsArray.length) {
  //         for (var i = count; i < moreCommentsCount; i++) {
  //           fragment.appendChild(createCommentElement(commentsArray[i]));
  //           socialComments.appendChild(fragment);
  //           if (moreCommentsCount - i === 1) {
  //             count += window.main.MAX_COMMENTS_COUNT;
  //           }
  //         }
  //       } else {
  //         for (var j = count; j < commentsArray.length; j++) {
  //           fragment.appendChild(createCommentElement(commentsArray[j]));
  //           socialComments.appendChild(fragment);
  //         }
  //         commentsLoader.classList.add('hidden');
  //       }
  //     });
  //   }
  //   for (var i = 0; i < count; i++) {
  //     fragment.appendChild(createCommentElement(commentsArray[i]));
  //     socialComments.appendChild(fragment);
  //   }
  // };

  var changeBigPictureContent = function (pic, commentsArray) {
    var bigPictureImg = document.querySelector('.big-picture__img');
    var bigPictureSocial = document.querySelector('.big-picture__social');
    bigPictureImg.querySelector('img').src = pic.url;
    bigPictureSocial.querySelector('.likes-count').textContent = pic.likes;
    bigPictureSocial.querySelector('.comments-count').textContent = commentsArray.length;
    bigPictureSocial.querySelector('.social__caption').textContent = pic.description;
    renderComments(commentsArray);
  };

  var onPopupPressEsc = function (evt) {
    window.main.isEscEvent(evt, closeBigPicture);
  };

  var openBigPicture = function (evt) {
    var targetClassName = evt.target.className;
    if (targetClassName === 'picture' || targetClassName === 'picture__img') {
      var index;
      if (evt.target.classList.contains('picture__img')) {
        index = evt.target.getAttribute('data-img');
      } else if (evt.target.classList.contains('picture')) {
        index = evt.target.firstElementChild.getAttribute('data-img');
      }
      changeBigPictureContent(window.filteredData[index], window.filteredData[index].comments);
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
