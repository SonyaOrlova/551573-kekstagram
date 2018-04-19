'use strict';

//

window.util = (function () {
  return {
    random: function (min, max) {
      return Math.round(Math.random(min, max) * (max - min) + min);
    },
    isEscEvent: function (evt) {
      var ESC_KEYCODE = 27;
      if (evt.keyCode === ESC_KEYCODE) {
        return;
      }
    }
  };
})();
