'use strict';

(function () {
  var form = document.querySelector('.review-form');
  var introWrap = document.querySelector('.form-intro__wrapper');
  if (introWrap) {
    var introLabel = introWrap.getElementsByTagName('label');
  }
  var telError = document.querySelector('.form-contacts__error');
  var contactsTel = document.getElementById('form-contacts__tel-field');
  var contactsMail = document.getElementById('form-contacts__email-field');

  function validateIntro() {
    if (introLabel) {
      for (var i = 0; i < introLabel.length; i++) {
        var introInput = introLabel[i].querySelector('.form-intro__input');    
        introInput.value = introInput.value.trim();
        introInput.value = introInput.value.charAt(0).toUpperCase() + introInput.value.substr(1);
        var introInputValue = introInput.value.trim(); // удаляем пробелы в начале и конце строки
        var introWords = introInputValue.split(/\s+/); // считаем 1 и более пробел за 1 пробел

        if (introInput.value !== '') {
          if (introWords.length > 1) {
            introInput.setCustomValidity('Имя, фамилия или отчество должны состоять из 1 слова');
            introInput.setAttribute('style', 'box-shadow: inset 0 0 0 2px red;');
            introInput.style.outline = 'none';
            return false;
          } else if (introInput.required) {
            if (introInput.value.length < 2) {
              introInput.setCustomValidity('Имя или фамилия должны состоять минимум из 2 букв');
              introInput.setAttribute('style', 'box-shadow: inset 0 0 0 2px red;');
              introInput.style.outline = 'none';
              return false;
            } else {
              introFieldValid();
            }
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
        introInput.setAttribute('style', 'outline: invert none medium;');
      }
    }
  }

  function validateTelField() {
    if (contactsTel) {
      var reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/gi;
      
      if (contactsTel.value !== '') {
        if (!reg.test(contactsTel.value)) {
          contactsTel.setCustomValidity('Номер телефона должен соответствовать шаблону: + 7 ХХХ ХХХ ХХ ХХ или 8 ХХХ ХХХ ХХ ХХ');
          contactsTel.setAttribute('style', 'box-shadow: inset 0 0 0 2px red;');
          contactsTel.style.outline = 'none';
          telError.setAttribute('style', 'visibility: visible;');
          return false;
        } else {
          telFieldValid();
        }
      } else {
        telFieldValid();
      }
    }
    return validateTelField;
  }

  function telFieldValid() {
    if (contactsTel) {
      contactsTel.setCustomValidity('');
      contactsTel.setAttribute('style', 'box-shadow: none;');
      contactsTel.setAttribute('style', 'outline: invert none medium;');
      telError.setAttribute('style', 'visibility: hidden;');
    }
  }

  function validateMailField() {
    if (contactsMail) {
      var reg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/gi;
      
      if (contactsMail.value !== '') {
        if (!reg.test(contactsMail.value)) {
          contactsMail.setCustomValidity('Адрес электронной почты должен соответствовать шаблону: X@XX.XX');
          contactsMail.setAttribute('style', 'box-shadow: inset 0 0 0 2px red;');
          contactsMail.style.outline = 'none';
          return false;
        } else {
          mailFieldValid();
        }
      } else {
        mailFieldValid();
      }
    }
    return validateMailField;
  }

  function mailFieldValid() {
    if (contactsMail) {
      contactsMail.setCustomValidity('');
      contactsMail.setAttribute('style', 'box-shadow: none;');
      contactsMail.setAttribute('style', 'outline: invert none medium;');
    }
  }

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

  function onTelFieldChange() {
    if (contactsTel) {
      contactsTel.addEventListener('blur', function () {
        validateTelField();
      });
    }
  }
  onTelFieldChange();

  function onMailFieldChange() {
    if (contactsMail) {
      contactsMail.addEventListener('blur', function () {
        validateMailField();
      });
    }
  }
  onMailFieldChange();
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
