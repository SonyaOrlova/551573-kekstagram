'use strict';

var random = function (min, max) {
  return Math.round(Math.random(min, max) * (max - min) + min);
};

// создает массив фотографий

var createPictures = function (picturesNumber) {
  var pictures = [];
  var descriptionArr = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var phrasesArr = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  for (var i = 0; i <= picturesNumber - 1; i++) {
    pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: random(15, 200),
      comments:
      (function () {
        var commentsArr = [];
        for (var j = 0; j < random(1, 2); j++) {
          commentsArr[j] = phrasesArr [random(0, phrasesArr.length - 1)];
        }
        return commentsArr;
      })(),
      description: descriptionArr[random(0, descriptionArr.length - 1)]
    };
  }
  return pictures;
};

var pictures = createPictures(25);

// создает DOM-элементы на базе шаблона

var pictureTemplate = document.querySelector('#picture').content;

var renderPicture = function (picture, pictureNumber) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
  // *добавляет аттрибут с указанием порядкового номера картинки
  pictureElement.querySelector('.picture__link').setAttribute('dataset-number', pictureNumber);

  return pictureElement;
};

// отрисовывает DOM-элементы во фрагмент, далее в блок .pictures

var picturesFragment = document.createDocumentFragment();

for (var i = 0; i < pictures.length; i++) {
  picturesFragment.appendChild(renderPicture(pictures[i], i));
}

document.querySelector('.pictures').appendChild(picturesFragment);

// ********* Задание 15 - module4-task1 *********

var ESC_KEYCODE = 27;

var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');

// Загрузка изображения и показ формы редактирования

var selectFile = document.querySelector('#upload-file');
var editor = document.querySelector('.img-upload__overlay');
var editorCloser = document.querySelector('.img-upload__cancel');
// var uploadOverlay = document.querySelector('.img-upload__overlay');

var onEditorEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeEditor();
  }
};

// сбрасывает значения выбора
var cleanSelect = function () {
  selectFile.value = ('');

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

};

// закрывает редактор
var closeEditor = function () {
  editor.classList.add('hidden');
  document.removeEventListener('keydown', onEditorEscPress);
  cleanSelect();
};

// загружает фото из папки проекта photos
var loadPicture = function () {
  var fileName = selectFile.files[0].name;
  // *меняет превью изображения
  imagePreview.src = 'photos/' + fileName;

  // *меняет изображение в превью эффектов
  var effectsPreview = document.querySelectorAll('.effects__preview');
  for (i = 0; i < effectsPreview.length; i++) {
    effectsPreview[i].style.backgroundImage = 'url(photos/' + fileName + ')';
  }
};

// выбор файла (событие)
selectFile.addEventListener('change', function () {
  openEditor();
  loadPicture();
  cleanSelect();
});

// закрытие редактора (событие)
editorCloser.addEventListener('click', closeEditor);
// uploadOverlay.addEventListener('click', closeEditor);

// Масштабирование изображения

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

// 2.2 Наложение эффекта на изображение

// выбор типа эффекта

var effects = document.querySelectorAll('.effects__radio');
var checkedEffect = 'none';
var defaultEffect = 'none';
var defaultEffectValue = 1;

var selectEffect = function () {
  for (i = 0; i < effects.length; i++) {
    if (effects[i].checked) {
      checkedEffect = effects[i].value;
    }
  }
  return checkedEffect;
};

// событие выбора типа эффекта

for (i = 0; i < effects.length; i++) {
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
  var mouseFix = evt;
  renderEffectIntension(calculateEffectIntension(mouseFix));
});

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

// 4.3 + 4.4 Просмотр загруженных изображений

// отрисовывает комментарии под увеличенным изображением

var makeElement = function (tagName, className) {
  var element = document.createElement(tagName);
  element.className = className;
  return element;
};

var renderComments = function (comment) {
  var listItem = makeElement('li', 'social__comment social__comment--text');

  var picture = makeElement('img', 'social__picture');
  picture.src = 'img/avatar-' + random(1, 6) + '.svg';
  picture.alt = 'Аватар комментатора фотографии';
  picture.width = '35';
  picture.height = '35';
  listItem.appendChild(picture);

  var text = document.createTextNode(comment);
  listItem.appendChild(text);

  return listItem;
};

// показ увелиенного изображения

var bigPicture = document.querySelector('.big-picture');
var bigPictureCloser = document.querySelector('.big-picture__cancel');
var bigPictureOverlay = document.querySelector('.big-picture.overlay');

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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

// закрытие фото (событие)
bigPictureCloser.addEventListener('click', closeBigPicture);
bigPictureOverlay.addEventListener('click', closeBigPicture);

// открытие фото (событие)
var photos = document.querySelectorAll('.picture__link');

for (i = 0; i < photos.length; i++) {
  photos[i].addEventListener('click', function (evt) {
    var picture = evt.target.parentNode;
    openBigPicture();

    //  *подстановка комментариев
    // ** берет атрибут по номеру картинки
    var photoNumber = picture.getAttribute('dataset-number');
    // var photoNumber = picture.dataset.number; - не работает

    // **очищает комментарии, если они есть
    var commentsInner = document.querySelector('.social__comments');
    while (commentsInner.firstChild) {
      commentsInner.removeChild(commentsInner.firstChild);
    }
    // **добавляет комментарии
    var commentsFragment = document.createDocumentFragment();
    for (var j = 0; j < pictures[photoNumber].comments.length; j++) {
      commentsFragment.appendChild(renderComments(pictures[photoNumber].comments[j]));
    }
    commentsInner.appendChild(commentsFragment);

    // *подстановка прочих значений миниатюры
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictures[photoNumber].url;
    bigPicture.querySelector('.likes-count').textContent = pictures[photoNumber].likes;
    bigPicture.querySelector('.comments-count').textContent = pictures[photoNumber].comments.length;
  });
}
