'use strict';

var random = function (min, max) {
  return Math.round(Math.random(min, max) * (max - min) + min);
};

// создает массив фотографий

var pictures = [];

var createPictures = function (picturesNumber) {
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
};

createPictures(25);

// создает DOM-элементы на базе шаблона

var pictureTemplate = document.querySelector('#picture').content;

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

  return pictureElement;
};

// отрисовывает DOM-элементы во фрагмент, далее в блок .pictures

var picturesFragment = document.createDocumentFragment();

for (var i = 0; i < pictures.length; i++) {
  picturesFragment.appendChild(renderPicture(pictures[i]));
}

document.querySelector('.pictures').appendChild(picturesFragment);

// показывает элемент .big-picture и заполняет данными

document.querySelector('.big-picture').classList.remove('hidden');
document.querySelector('.big-picture__img').src = pictures[0].url;
document.querySelector('.likes-count').textContent = pictures[0].likes;
document.querySelector('.comments-count').textContent = pictures[0].comments.length;

// показывает список комментариев под .big-picture

var makeElement = function (tagName, className) {
  var element = document.createElement(tagName);
  element.className = className;
  return element;
};

var createComment = function (comment) {
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

var commentsFragment = document.createDocumentFragment();

for (i = 0; i < pictures[0].comments.length; i++) {
  commentsFragment.appendChild(createComment(pictures[0].comments[i]));
}

document.querySelector('.social__comments').appendChild(commentsFragment);

// прячет счетчик и загрузку комментариев

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
