'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 300;
  var lastTimeout;

  return {
    getRandomNum: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    debounce: function (fun) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    }
  };
})();
