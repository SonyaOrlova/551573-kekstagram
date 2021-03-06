'use strict';

// показ увеличенного изображения

(function () {

  var PIC_AVATAR_WIDTH = 35;
  var PIC_AVATAR_HEIGHT = 35;

  // отрисовывает комментарии под увеличенным изображением
  var makeElement = function (tagName, className) {
    var element = document.createElement(tagName);
    element.className = className;
    return element;
  };

  var renderComments = function (comment) {
    var listItem = makeElement('li', 'social__comment social__comment--text');

    var picture = makeElement('img', 'social__picture');
    picture.src = 'img/avatar-' + window.util.getRandomNum(1, 6) + '.svg';
    picture.alt = 'Аватар комментатора фотографии';
    picture.width = PIC_AVATAR_WIDTH;
    picture.height = PIC_AVATAR_HEIGHT;
    listItem.appendChild(picture);

    var text = document.createTextNode(comment);
    listItem.appendChild(text);

    return listItem;
  };

  // показывает увеличенное изображение
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloser = document.querySelector('.big-picture__cancel');

  var onBigPictureEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeBigPicture();
    }
  };

  // открывает фото
  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  // закрывает фото
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  // отрисовка фото
  var renderBigPhoto = function (photo) {
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
    for (var j = 1; j < window.filteredPictures[photoNumber].comments.length; j++) {
      commentsFragment.appendChild(renderComments(window.filteredPictures[photoNumber].comments[j]));
    }
    commentsInner.appendChild(commentsFragment);

    // *подстановка прочих значений миниатюры
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = window.filteredPictures[photoNumber].url;
    bigPicture.querySelector('.likes-count').textContent = window.filteredPictures[photoNumber].likes;
    bigPicture.querySelector('.comments-count').textContent = window.filteredPictures[photoNumber].comments.length - 1;
    bigPicture.querySelector('.social__caption').textContent = window.filteredPictures[photoNumber].comments[0];
  };

  // открытие фото (событие)

  var onPhotoClick = function (evt) {
    openBigPicture();
    renderBigPhoto(evt.currentTarget);
  };

  window.previewPhoto = function () {
    var photos = document.querySelectorAll('.picture__link');
    for (var i = 0; i < photos.length; i++) {
      photos[i].addEventListener('click', onPhotoClick);
    }
  };

  // закрытие фото (событие)
  bigPictureCloser.addEventListener('click', closeBigPicture);
})();
