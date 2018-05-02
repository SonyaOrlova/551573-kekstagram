'use strict';

// создает массив фотографий

(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';

  var onError = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: auto; width: 100vw; height: 100px; padding-top: 40px; text-align: center; background-color: black; opacity: 0.9';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = 0;
    node.style.bottom = 0;
    node.style.fontSize = '30px';
    node.style.fontColor = 'black';

    node.textContent = errorMessage;

    document.body.appendChild(node);
  };

  var onLoad = function (pictures) {
    window.pictures = pictures;

    window.renderPhotoGallery();

    window.changePhotoSorting();

    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  window.ajax(LOAD_URL, 'GET', onLoad, onError);
})();
