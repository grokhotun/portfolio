"use strict";

/*
    Полифилы
*/
// Полифил на forEach
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

;

var preloader = function preloader() {
  var preloader = document.querySelector('.preloader');
  var preloaderBody = document.querySelector('.preloader__body');
  var body = document.querySelector('body');

  if (preloader) {
    body.classList.add('lock');
    new Promise(function (resolve) {
      setTimeout(resolve, 800);
    }).then(function () {
      preloaderBody.style.display = 'none';
      preloader.classList.add('is-loaded');
      body.classList.remove('lock');
    });
  }
};

var smoothScroll = function smoothScroll(duration) {
  var linksNav = document.querySelectorAll('.js-smoothscroll-btn');
  linksNav.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(e.target.getAttribute('href'));
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      var startPosition = window.pageYOffset;
      var distance = targetPosition - startPosition;
      var startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }, false);
  });
};

;

var autoTyping = function autoTyping() {
  var typeText = function typeText(text, elem) {
    var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
    return new Promise(function (resolve) {
      if (text.length > 0) {
        elem.classList.add('carret');
        elem.innerHTML += text[0];
        setTimeout(function () {
          return resolve(typeText(text.slice(1), elem, delay));
        }, delay);
      } else {
        elem.classList.remove('carret');
        resolve();
      }
    });
  };

  var element = document.querySelector('.fullscreen__title');
  var leftButton = document.querySelector('.btn--left');
  var rightButton = document.querySelector('.btn--right');
  var targetPosition = {
    top: window.pageYOffset + element.getBoundingClientRect().top,
    left: window.pageYOffset + element.getBoundingClientRect().left,
    right: window.pageYOffset + element.getBoundingClientRect().right,
    bottom: window.pageYOffset + element.getBoundingClientRect().bottom
  },
      windowPosition = {
    top: window.pageYOffset,
    left: window.pageXOffset,
    right: window.pageXOffset + document.documentElement.clientWidth,
    bottom: window.pageYOffset + document.documentElement.clientHeight
  };

  if (targetPosition.bottom >= windowPosition.top) {
    var elem_1 = document.querySelector('.fullscreen__title');
    var text_1 = elem_1.innerHTML;
    var elem_2 = document.querySelector('.fullscreen__subtitle');
    var text_2 = elem_2.innerHTML;
    elem_1.innerHTML = '';
    elem_2.innerHTML = '';
    setTimeout(function () {
      typeText(text_1, elem_1, 100).then(function () {
        return typeText(text_2, elem_2, 50);
      }).then(function () {
        leftButton.classList.add('slide-from-left');
        rightButton.classList.add('slide-from-right');
      });
    }, 1500);
  } else {
    leftButton.classList.add('slide-from-left');
    rightButton.classList.add('slide-from-right');
  }
};

document.addEventListener("DOMContentLoaded", function () {
  preloader();
  autoTyping();
  smoothScroll(1000);
});