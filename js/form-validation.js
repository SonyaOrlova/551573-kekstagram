'use strict';

// валидация формы

(function () {

  //  Хэш-теги

  var descriptionForm = document.querySelector('.img-upload__text');

  // *если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения
  descriptionForm.addEventListener('keydown', function (evt) {
    if (window.util.isEscEvent(evt)) {
      evt.stopPropagation();
    }
  });

  // *проверка формы хеш-тегов
  var hashtagsInput = document.querySelector('.text__hashtags');

  var onHashtagsValidationInput = function (evt) {

    var hashtags = evt.target.value.toLowerCase().split(' ');
    var errorMessage = '';

    for (var i = 0; i < hashtags.length; i++) {
      if (!hashtags[i].startsWith('#')) {
        errorMessage = 'хэш-тег должен начинаться с символа # (решётка)';
      } else if (hashtags[i] === '#') {
        errorMessage = 'хеш-тег не может состоять только из одной # (решётки)';
      } else if (hashtags[i].length > 20) {
        errorMessage = 'максимальная длина одного хэш-тега 20 символов';
      } else if (hashtags[i].lastIndexOf('#') > 0) {
        errorMessage = 'разделите слово на 2 хеш-тега или уберите # (решётку)';
      } else if (hashtags.lastIndexOf(hashtags[i]) !== i) {
        errorMessage = 'один и тот же хэш-тег не может быть использован дважды';
      } else if (hashtags.length > 5) {
        errorMessage = 'нельзя указать больше 5 хэш-тегов';
      } if (errorMessage) {
        evt.target.setCustomValidity(errorMessage);
        break;
      } else {
        evt.target.setCustomValidity('');
      }
    }
  };

  // *событие валидации формы
  hashtagsInput.addEventListener('input', onHashtagsValidationInput);
  descriptionForm.addEventListener('submit', onHashtagsValidationInput);
})();
