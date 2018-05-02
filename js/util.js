'use strict';

window.util = (function () {
  return {
    getRandomNum: function (min, max) {
      return Math.round(Math.random(min, max) * (max - min) + min);
    },
    isEscEvent: function (evt) {
      var ESC_KEYCODE = 27;
      return evt.keyCode === ESC_KEYCODE;
    },
    debounce: function (fun) {
      var DEBOUNCE_INTERVAL = 300;
      var lastTimeout;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    }
  };
})();
