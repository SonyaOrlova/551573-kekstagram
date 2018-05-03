'use strict';

// фильтрация фотографий

(function () {

  var photoSortingBtns = document.querySelectorAll('.img-filters__button');

  // отрисовка галереи фото

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
    var randomPictures = window.pictures.slice();
    for (var i = randomPictures.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = randomPictures[i];
      randomPictures[i] = randomPictures[j];
      randomPictures[j] = temp;
    }
    window.filteredPictures = randomPictures;
    return window.filteredPictures;
  };

  window.renderPhotoGallery = function () {

    var recomendedPhotoSortingBtn = document.querySelector('#filter-recomended');
    var popularPhotoSortingBtn = document.querySelector('#filter-popular');
    var discussedPhotoSortingBtn = document.querySelector('#filter-discussed');
    var randomPhotoSortingBtn = document.querySelector('#filter-random');

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

    //* запускает отрисовку галерии и открытие превью фото
    window.insertPictures(window.filteredPictures);
    window.previewPhoto();
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

        //* запускает сортировку и отрисовку галереи
        window.util.debounce(window.renderPhotoGallery);
      });
    }
  };
})();
