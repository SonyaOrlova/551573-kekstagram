'use strict';

// отрисовывает миниатюры изображений

(function () {
  // создает DOM-элементы на базе шаблона
  var pictureTemplate = document.querySelector('#picture').content;

  var renderPicture = function (picture, pictureNumber) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length - 1;
    // *добавляет аттрибут с указанием порядкового номера картинки
    pictureElement.querySelector('.picture__link').dataset.number = pictureNumber;
    return pictureElement;
  };

  window.insertPictures = function (pictures) {
    var picturesFragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      picturesFragment.appendChild(renderPicture(pictures[i], i));
    }
    document.querySelector('.pictures').appendChild(picturesFragment);
  };

})();

