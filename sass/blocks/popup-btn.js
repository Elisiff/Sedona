'use strict';

(function () {
  var scrollBtn = document.querySelector('.popup-btn');
  var didScroll = false;

  window.onscroll = doScroll;

  function doScroll() {
    didScroll = true;
  }

  setInterval(function () {
    if (didScroll) {
      didScroll = false;
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if ((scrollY > 0) && scrollBtn.classList.contains('popup-btn--hidden')) {
        showScrollBtn();
      } else if ((scrollY === 0) && scrollBtn.classList.contains('popup-btn--visible')) {
        closeScrollBtn();
      }
    }
  }, 50);

  function showScrollBtn() {
    scrollBtn.classList.remove('popup-btn--hidden');
    scrollBtn.classList.add('popup-btn--visible');
  }

  function closeScrollBtn() {
    scrollBtn.classList.remove('popup-btn--visible');
    scrollBtn.classList.add('popup-btn--hidden');
  }

  function clickScrollBtn() {
    scrollBtn.addEventListener('click', function () {
      window.scrollTo(0, 0);
      closeScrollBtn();
    });
  }
  clickScrollBtn();

  function onScrollBtnKeydown() {
    scrollBtn.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ENTER_KEYCODE) {
        window.scrollTo(0, 0);
        closeScrollBtn();
      } else {
        evt.preventDefault();
      }
    });
  }
  onScrollBtnKeydown();
})();
