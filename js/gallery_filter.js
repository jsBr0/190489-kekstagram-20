'use strict';

(function () {
  var filterSection = document.querySelector('.img-filters');
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var filterActiveButtonClass = 'img-filters__button--active';
  var filterInactiveSectionClass = 'img-filters--inactive';

  var successHandler = function (data) {
    window.render(data);
    filterSection.classList.remove(filterInactiveSectionClass);
    window.uploadedData = data;
    window.filteredData = data;
  };

  window.load(successHandler);

  var sortByComments = function (arr) {
    return arr.slice().sort(function (a, b) {
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      return 0;
    });
  };

  var sortRandom = function (arr) {
    return arr.slice().sort(function () {
      return 0.5 - Math.random();
    }).splice(0, window.main.RANDOM_GALLERY_COUNT);
  };

  var renderFilteredPicture = function (arr) {
    var filterDefault = document.querySelector('#filter-default').classList;
    var filterRandom = document.querySelector('#filter-random').classList;
    var filterDiscussed = document.querySelector('#filter-discussed').classList;

    if (filterRandom.contains(filterActiveButtonClass)) {
      window.filteredData = sortRandom(arr);
    } else if (filterDiscussed.contains(filterActiveButtonClass)) {
      window.filteredData = sortByComments(arr);
    } else if (filterDefault.contains(filterActiveButtonClass)) {
      window.filteredData = arr;
    }
    window.render(window.filteredData);
  };

  var changeGalleryFilter = window.debounce(function (evt) {
    var target = evt.target;

    if (target.type === 'button') {
      filterButtons.forEach(function (item) {
        item.classList.remove(filterActiveButtonClass);
      });

      target.classList.add(filterActiveButtonClass);

      var pictures = document.querySelectorAll('.picture');
      pictures.forEach(function (item) {
        item.remove();
      });

      renderFilteredPicture(window.uploadedData);
    }
  });
  filterSection.addEventListener('click', changeGalleryFilter);
})();
