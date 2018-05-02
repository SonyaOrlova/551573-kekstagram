'use strict';

// фильтрация фотографий

(function () {

  var photoSortingBtns = document.querySelectorAll('.img-filters__button');

  window.initPhotoSorting = function () {

    var recomendedPhotoSortingBtn = document.querySelector('#filter-recomended');
    var popularPhotoSortingBtn = document.querySelector('#filter-popular');
    var discussedPhotoSortingBtn = document.querySelector('#filter-discussed');
    var randomPhotoSortingBtn = document.querySelector('#filter-random');

    var sortRecomendedPhotos = function () {
      window.filteredPictures = window.pictures;
      return window.filteredPictures;
    };

    var sortPopularPhotos = function () {
      window.filteredPictures = window.pictures.slice().sort(function (first, second) {
        return second.likes - first.likes;
      });
    };

    var sortDiscussedPhotos = function () {
      window.filteredPictures = window.pictures.slice().sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });
    };

    var sortRandomPhotos = function () {
      window.filteredPictures = window.pictures.slice().sort(window.util.random);
    };

    if (recomendedPhotoSortingBtn.classList.contains('img-filters__button--active')) {
      sortRecomendedPhotos();
    }
    if (popularPhotoSortingBtn.classList.contains('img-filters__button--active')) {
      sortPopularPhotos();
    }
    if (discussedPhotoSortingBtn.classList.contains('img-filters__button--active')) {
      sortDiscussedPhotos();
    }
    if (randomPhotoSortingBtn.classList.contains('img-filters__button--active')) {
      sortRandomPhotos();
    }

    //* запускает отрисовку галерии
    window.insertPictures(window.filteredPictures);
  };

  window.changePhotoSorting = function () {

    for (var i = 0; i < photoSortingBtns.length; i++) {
      photoSortingBtns[i].addEventListener('click', function (evt) {

        //* очищает галереию
        document.querySelectorAll('.picture__link').forEach(function (link) {
          link.remove();
        });

        //* добавляет класс кнопке сортировки
        photoSortingBtns.forEach(function (photoSortingBtn) {
          photoSortingBtn.classList.remove('img-filters__button--active');
        });

        var checkedphotoSortingBtn = evt.target;
        checkedphotoSortingBtn.classList.add('img-filters__button--active');

        //* запускает сортировку

        window.util.isDebounce(window.initPhotoSorting);
      });
    }
  };
})();
