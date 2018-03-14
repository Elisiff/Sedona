'use strict';

(function () {
  var form = document.querySelector('.review-form');
  var introWrap = document.querySelector('.form-intro__wrapper');
  if (introWrap) {
    var introLabel = introWrap.getElementsByTagName('label');
  }
  // var contactsTel = document.getElementById('form-contacts__tel-field');
  // var contactsMail = document.getElementById('form-contacts__email-field');

  function validateIntro() {
    if (introLabel) {
      for (var i = 0; i < introLabel.length; i++) {
        var introInput = introLabel[i].querySelector('.form-intro__input');
        introInput.value = introInput.value.charAt(0).toUpperCase() + introInput.value.substr(1);

        if (introInput.required) {
          if (introInput.value.length < 2) {
            introInput.setCustomValidity('Имя или фамилия должны состоять минимум из 2 букв');
            introInput.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
            return false;
          } else {
            introFieldValid();
          }
        } else {
          introFieldValid();
        }
      }
    }
    return validateIntro;
  }

  function introFieldValid() {
    if (introLabel) {
      for (var i = 0; i < introLabel.length; i++) {
        var introInput = introLabel[i].querySelector('.form-intro__input');
        
        introInput.setCustomValidity('');
        introInput.setAttribute('style', 'box-shadow: none;');
      }
    }
  }

  // function validateTelField() {

  // }

  function onIntroFieldChange() {
    if (introLabel) {
      for (var i = 0; i < introLabel.length; i++) {
        var introInput = introLabel[i].querySelector('.form-intro__input');

        introInput.addEventListener('blur', function () {
          validateIntro();
        });
      }
    }
  }
  onIntroFieldChange();
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
