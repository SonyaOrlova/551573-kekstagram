'use strict';

// загрузка нового изображения

(function () {
  var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');

  // ********** Показ формы редактирования и выбор изображения **********

  var selectFile = document.querySelector('#upload-file');
  var editor = document.querySelector('.img-upload__overlay');
  var editorCloser = document.querySelector('.img-upload__cancel');

  var onEditorEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeEditor();
    }
  };

  // сбрасывает значения выбора
  var resetPreviewChanges = function () {
    // *сброс размеров
    currentSize = defaultSize;
    renderImageSize(defaultSize);

    // *сброс типа эффекта
    renderImageEffect(defaultEffect);

    // *сброс глубины эффекта
    checkedEffect = defaultEffect;
    renderEffectIntension(defaultEffectValue);
  };

  // открывает редактор
  var openEditor = function () {
    editor.classList.remove('hidden');
    document.addEventListener('keydown', onEditorEscPress);
    resetPreviewChanges();
  };

  // закрывает редактор
  var closeEditor = function () {
    editor.classList.add('hidden');
    document.removeEventListener('keydown', onEditorEscPress);
    selectFile.value = '';
  };

  // загружает изображение
  var loadPicture = function (evt) {
    imagePreview.src = URL.createObjectURL(evt.target.files[0]);
    // *меняет изображение в превью эффектов
    var effectsPreview = document.querySelectorAll('.effects__preview');
    for (var i = 0; i < effectsPreview.length; i++) {
      effectsPreview[i].style.backgroundImage = 'url(' + URL.createObjectURL(evt.target.files[0]) + ')';
    }
  };

  // выбор файла (событие)
  selectFile.addEventListener('change', function (evt) {
    openEditor();
    loadPicture(evt);
  });

  // закрытие редактора (событие)
  editorCloser.addEventListener('click', closeEditor);

  // ********** Масштабирование изображения **********

  var defaultSize = 100;
  var currentSize = defaultSize;
  var sizeStep = 25;
  var decreaseBtn = document.querySelector('.resize__control--minus');
  var increaseBtn = document.querySelector('.resize__control--plus');

  // уменьшает изображение
  var decreaseImage = function () {
    if (currentSize > 25) {
      currentSize -= sizeStep;
    }
    renderImageSize(currentSize);
  };

  // увеличивает изображение
  var increaseImage = function () {
    if (currentSize < 100) {
      currentSize += sizeStep;
    }
    renderImageSize(currentSize);
  };

  // отрисовывает масштаб
  var renderImageSize = function (imageSize) {
    var sizeValue = document.querySelector('.resize__control--value');

    sizeValue.value = imageSize + '%';
    imagePreview.style.transform = 'scale(' + imageSize / 100 + ')';
  };

  // выбор масштаба (событие)
  decreaseBtn.addEventListener('click', decreaseImage);
  increaseBtn.addEventListener('click', increaseImage);

  // ********** Наложение эффекта на изображение **********

  // выбор типа эффекта

  var effects = document.querySelectorAll('.effects__radio');
  var checkedEffect = 'none';
  var defaultEffect = 'none';
  var defaultEffectValue = 1;

  var selectEffect = function () {
    for (var i = 0; i < effects.length; i++) {
      if (effects[i].checked) {
        checkedEffect = effects[i].value;
      }
    }
    return checkedEffect;
  };

  // событие выбора типа эффекта

  for (var i = 0; i < effects.length; i++) {
    effects[i].addEventListener('change', function () {
      selectEffect();
      renderImageEffect(checkedEffect);
    });
  }

  // отрисовка эффекта на дефолтных значениях

  var renderImageEffect = function (effectSelected) {
    // *добавляет класс эффекта после проверки
    for (i = 0; i < effects.length; i++) {
      if (imagePreview.classList.contains('effects__preview--' + effects[i].value + '')) {
        imagePreview.classList.remove('effects__preview--' + effects[i].value + '');
      }
    }
    imagePreview.classList.add('effects__preview--' + effectSelected + '');

    // *сбрасывает глубину эффекта до 100
    renderEffectIntension(defaultEffectValue);

    // *сбрасывает координаты ползунка до 100
    effectRunner.style.left = defaultEffectValue * 100 + '%';
    effectLevel.style.width = defaultEffectValue * 100 + '%';

    // *скрывает слайдер при выборе оригинального эффекта
    if (effectSelected === 'none') {
      effectBar.classList.add('hidden');
    } else if (effectBar.classList.contains('hidden')) {
      effectBar.classList.remove('hidden');
    }

    // *сброс размеров изображения
    currentSize = defaultSize;
    renderImageSize(defaultSize);
  };

  // выбор глубины эффекта

  var effectBar = document.querySelector('.scale');
  var effectLine = document.querySelector('.scale__line');
  var effectRunner = document.querySelector('.scale__pin');
  var effectLevel = document.querySelector('.scale__level');

  // (?) var effectValue = document.querySelector('.scale__value'); нужен?

  // расчет уровня глубины эффекта (координаты ползунка)

  var calculateEffectIntension = function (target) {
    var effectLineCoords = effectLine.getBoundingClientRect();

    var effectLineCoordsLeft = effectLineCoords.left;
    var effectRunnerCoordsLeft = target.clientX - effectLineCoordsLeft;

    // *выходит за левую границу - разместить по ней
    if (effectRunnerCoordsLeft < 0) {
      effectRunnerCoordsLeft = 0;
    }
    // *выходит за правую границу - разместить по ней
    if (effectRunnerCoordsLeft + effectRunner.clientWidth > effectLine.clientWidth) {
      effectRunnerCoordsLeft = effectLine.clientWidth;
    }

    var currentEffectValue = effectRunnerCoordsLeft / effectLine.clientWidth;

    effectRunner.style.left = currentEffectValue * 100 + '%';
    effectLevel.style.width = currentEffectValue * 100 + '%';

    return currentEffectValue;
  };

  // выбор глубины эффекта (событие)

  effectBar.addEventListener('mouseup', function (evt) {
    evt.preventDefault();
    renderEffectIntension(calculateEffectIntension(evt));
  });

  effectRunner.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onMouseMove = function (evt) {
    evt.preventDefault();
    renderEffectIntension(calculateEffectIntension(evt));
  };

  var onMouseUp = function (evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  // отрисовка глубины эффекта

  var renderEffectIntension = function (currentEffectValue) {
    if (checkedEffect === 'none') {
      imagePreview.style.filter = '';
    }
    if (checkedEffect === 'chrome') {
      imagePreview.style.filter = 'grayscale(' + currentEffectValue + ')';
    }
    if (checkedEffect === 'sepia') {
      imagePreview.style.filter = 'sepia(' + currentEffectValue + ')';
    }
    if (checkedEffect === 'marvin') {
      imagePreview.style.filter = 'invert(' + currentEffectValue * 100 + '%' + ')';
    }
    if (checkedEffect === 'phobos') {
      imagePreview.style.filter = 'blur(' + currentEffectValue * 3 + 'px' + ')';
    }
    if (checkedEffect === 'heat') {
      imagePreview.style.filter = 'brightness(' + currentEffectValue * 3 + ')';
    }
  };
})();
