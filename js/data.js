'use strict';

// создает массив фотографий

(function () {
  window.createPictures = function (picturesNumber) {
    var pictures = [];
    var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
    var phrases = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

    for (var i = 0; i <= picturesNumber - 1; i++) {
      pictures[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.util.random(15, 200),
        comments:
        (function () {
          var comments = [];
          for (var j = 0; j < window.util.random(1, 2); j++) {
            comments[j] = phrases[window.util.random(0, phrases.length - 1)];
          }
          return comments;
        })(),
        description: descriptions[window.util.random(0, descriptions.length - 1)]
      };
    }
    return pictures;
  };
})();
