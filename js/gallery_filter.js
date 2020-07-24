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

  var renderFilteredPicture = function (arr) {
    var filterDefault = document.querySelector('#filter-default');
    var filterRandom = document.querySelector('#filter-random');
    var filterDiscussed = document.querySelector('#filter-discussed');

    if (filterRandom.classList.contains(filterActiveButtonClass)) {
      window.filteredData = arr.slice().sort(function () {
        return 0.5 - Math.random();
      }).splice(0, 10);
    } else if (filterDiscussed.classList.contains(filterActiveButtonClass)) {
      window.filteredData = arr.slice().sort(function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        }
        if (a.comments.length > b.comments.length) {
          return -1;
        }
        return 0;
      });
    } else if (filterDefault.classList.contains(filterActiveButtonClass)) {
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
