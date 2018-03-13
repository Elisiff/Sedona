'use strict';

(function () {
  var form = document.querySelector('.review-form');
  var introInput = document.querySelectorAll('.form-intro__input');

  // function validateIntro() {
  //   for (var i = 0; i < 1; i++) {
  //     if (introInput[i].required) {
  //       if (introInput[i].value.length < 3) {
  //         introInput[i].setCustomValidity('Имя или фамилия должны состоять минимум из 3 букв');
  //         introInput[i].setAttribute('style', 'box-shadow: 0 0 0 1px red;');
  //         return false;
  //       } else {
  //         introFieldValid();
  //       }
  //     } else {
  //       introFieldValid();
  //     }
  //   }
  // }

  function introFieldValid() {
    introInput.setCustomValidity('');
    introInput.setAttribute('style', 'box-shadow: none;');
  }

  function validateContacts() {

  }

  // function onIntroFieldChange() {
  //   for (var i = 0; i < 1; i++) {
  //     introInput[i].addEventListener('blur', function () {
  //       validateIntro();
  //     });
  //   }
  // }
  // onIntroFieldChange();
})();

'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var mainNav = document.querySelector('.main-nav__menu');
  var openBtn = document.querySelector('.main-nav__open-btn');
  var closeBtn = document.querySelector('.main-nav__close-btn');

  function openNav() {
    if (mainNav.classList.contains('main-nav--closed')) {
      mainNav.classList.remove('main-nav--closed');
      mainNav.classList.add('main-nav--opened');
    }
  }

  function clickOpenBtnNav() {
    openBtn.addEventListener('click', function (evt) {
      openNav();
    });
  }
  clickOpenBtnNav();

  function pressEnterOpenBtnNav() {
    openBtn.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openNav();
      }
    });
  }
  pressEnterOpenBtnNav();

  function closeNav() {
    if (mainNav.classList.contains('main-nav--opened')) {
      mainNav.classList.remove('main-nav--opened');
      mainNav.classList.add('main-nav--closed');
    }
  }

  function clickCloseBtnNav() {
    closeBtn.addEventListener('click', function (evt) {
      closeNav();
    });
  }
  clickCloseBtnNav();

  function pressEscNav() {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeNav();
      }
    });
  }
  pressEscNav();

  function pressEnterCloseBtnNav() {
    closeBtn.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closeNav();
      }
    });
  }
  pressEnterCloseBtnNav();
})();
