'use strict';
(function () {
  var imgFilter = document.querySelector('.img-filters');
  var imgFilterButtons = imgFilter.querySelectorAll('.img-filters__button');
  var activeButtonClass = 'img-filters__button--active';

  imgFilter.classList.remove('img-filters--inactive');

  var changeActiveButton = function () {
    imgFilterButtons.forEach(function (item) {
      if (item.classList.contains(activeButtonClass)) {
        item.classList.remove(activeButtonClass);
      }
    });

    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (item) {
      item.remove();
    });
  };

  var renderFilteredData = function (arr) {

    var filterDefault = document.querySelector('#filter-default');
    var filterRandom = document.querySelector('#filter-random');
    var filterDiscussed = document.querySelector('#filter-discussed');

    var filteredArr = [];

    if (filterRandom.classList.contains(activeButtonClass)) {
      filteredArr = arr.slice().sort(function () {
        return 0.5 - Math.random();
      }).splice(0, 10);
    } else if (filterDiscussed.classList.contains(activeButtonClass)) {
      filteredArr = arr.slice().sort(function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        }
        if (a.comments.length > b.comments.length) {
          return -1;
        }
        return 0;
      });
    } else if (filterDefault.classList.contains(activeButtonClass)) {
      filteredArr = arr;
    }

    window.render(filteredArr);
  };

  var clickFilterButton = function () {
    imgFilterButtons.forEach(function (item) {
      item.addEventListener('click', window.debounce(function (evt) {
        evt.preventDefault();
        changeActiveButton();
        item.classList.add(activeButtonClass);
        renderFilteredData(window.loadData);
      }));
    });
  };

  clickFilterButton();

  var successHandler = function (data) {
    window.render(data);
    window.loadData = data;
  };

  window.load(successHandler);
})();
