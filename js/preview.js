'use strict';

// показ увеличенного изображения

(function () {
  // отрисовывает комментарии под увеличенным изображением
  var makeElement = function (tagName, className) {
    var element = document.createElement(tagName);
    element.className = className;
    return element;
  };

  var renderComments = function (comment) {
    var listItem = makeElement('li', 'social__comment social__comment--text');

    var picture = makeElement('img', 'social__picture');
    picture.src = 'img/avatar-' + window.util.random(1, 6) + '.svg';
    picture.alt = 'Аватар комментатора фотографии';
    picture.width = '35';
    picture.height = '35';
    listItem.appendChild(picture);

    var text = document.createTextNode(comment);
    listItem.appendChild(text);

    return listItem;
  };

  // показывает увеличенное изображение
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloser = document.querySelector('.big-picture__cancel');
  var bigPictureOverlay = document.querySelector('.big-picture.overlay');

  // var onBigPictureEscPress = function (evt) {
  //   window.util.isEscEvent(evt, closeBigPicture);
  // };

  var onBigPictureEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeBigPicture();
    }
  };

  // открывает фото
  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  // закрывает фото
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  // отрисовка фото
  var photos = document.querySelectorAll('.picture__link');
  var renderBigPhoto = function (photo) {
    openBigPicture();

    //  *подстановка комментариев
    // ** берет атрибут по номеру картинки
    var photoNumber = photo.dataset.number;

    // **очищает комментарии, если они есть
    var commentsInner = document.querySelector('.social__comments');
    while (commentsInner.firstChild) {
      commentsInner.removeChild(commentsInner.firstChild);
    }
    // **добавляет комментарии
    var commentsFragment = document.createDocumentFragment();
    for (var j = 0; j < window.pictures[photoNumber].comments.length; j++) {
      commentsFragment.appendChild(renderComments(window.pictures[photoNumber].comments[j]));
    }
    commentsInner.appendChild(commentsFragment);

    // *подстановка прочих значений миниатюры
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = window.pictures[photoNumber].url;
    bigPicture.querySelector('.likes-count').textContent = window.pictures[photoNumber].likes;
    bigPicture.querySelector('.comments-count').textContent = window.pictures[photoNumber].comments.length;
  };

  // открытие фото (событие)

  var onPhotoClick = function (evt) {
    renderBigPhoto(evt.target.parentNode);
  };

  for (var i = 0; i < photos.length; i++) {
    photos[i].addEventListener('click', onPhotoClick);
  }

  // закрытие фото (событие)
  bigPictureCloser.addEventListener('click', closeBigPicture);
  bigPictureOverlay.addEventListener('click', closeBigPicture);
})();