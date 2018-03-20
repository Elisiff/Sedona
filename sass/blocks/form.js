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
  var popupFail = document.querySelector('.popup__failure');
  var popupSuccess = document.querySelector('.popup__success');
  var popupOver = document.querySelector('.popup__overlay');
  var popupFailBtn = document.querySelector('.popup__failure-btn');
  var popupSuccessBtn = document.querySelector('.popup__success-btn');
  var submitBtn = document.querySelector('.review-form__submit-btn');

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
            introInput.setCustomValidity('Имя, фамилия или отчество должны состоять из 1 слова.');
            introInput.setAttribute('style', 'box-shadow: inset 0 0 0 2px red;');
            introInput.style.outline = 'none';
            return false;
          } else if (introInput.required) {
            if (introInput.value.length < 2) {
              introInput.setCustomValidity('Имя или фамилия должны состоять минимум из 2 букв.');
              introInput.setAttribute('style', 'box-shadow: inset 0 0 0 2px red;');
              introInput.style.outline = 'none';
              return false;
            } else {
              introFieldValid();
            }
          } else {
            introFieldValid();
          }
        } else if ((introInput.value === '') && introInput.required) {
          introInput.setCustomValidity('Заполните это поле.');
          introInput.setAttribute('style', 'box-shadow: inset 0 0 0 2px red;');
          introInput.style.outline = 'none';
          return false;
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
        contactsTel.setCustomValidity('Заполните это поле.');
        contactsTel.setAttribute('style', 'box-shadow: inset 0 0 0 2px red;');
        contactsTel.style.outline = 'none';
        return false;
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
        contactsMail.setCustomValidity('Заполните это поле.');
        contactsMail.setAttribute('style', 'box-shadow: inset 0 0 0 2px red;');
        contactsMail.style.outline = 'none';
        return false;
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

  function getPopupSuccess() {
    if (popupSuccess.classList.contains('popup__success--closed')) {
      popupSuccess.classList.remove('popup__success--closed');
      popupSuccess.classList.add('popup__success--opened');
      popupOver.classList.remove('popup__overlay--closed');
      popupOver.classList.add('popup__overlay--opened');
    }
  }

  function closePopupSuccess() {
    popupSuccess.classList.remove('popup__success--opened');
    popupSuccess.classList.add('popup__success--closed');
    popupOver.classList.remove('popup__overlay--opened');
    popupOver.classList.add('popup__overlay--closed');
  }

  function closePopupSuccessClick() {
    if (popupSuccessBtn) {
      popupSuccessBtn.addEventListener('click', function () {
        closePopupSuccess();
      });
    }
  }
  closePopupSuccessClick();

  function closePopupSuccessEnter() {
    if (popupSuccessBtn) {
      popupSuccessBtn.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.ENTER_KEYCODE) {
          closePopupSuccess();
        } else {
          evt.preventDefault();
        }
      });
    }
  }
  closePopupSuccessEnter();

  function closePopupSuccessEsc() {
    document.addEventListener('keydown', function (evt) {
      if (popupSuccess.classList.contains('popup__success--opened') && evt.keyCode === window.ESC_KEYCODE) {
        closePopupSuccess();
      }
    });
  }
  closePopupSuccessEsc();

  function getPopupFailure() {
    if (popupFail.classList.contains('popup__failure--closed')) {
      popupFail.classList.remove('popup__failure--closed');
      popupFail.classList.add('popup__failure--opened');
      popupOver.classList.remove('popup__overlay--closed');
      popupOver.classList.add('popup__overlay--opened');
    }
  }

  function closePopupFailure() {
    popupFail.classList.remove('popup__failure--opened');
    popupFail.classList.add('popup__failure--closed');
    popupOver.classList.remove('popup__overlay--opened');
    popupOver.classList.add('popup__overlay--closed');
  }

  function closePopupFailureClick() {
    if (popupFailBtn) {
      popupFailBtn.addEventListener('click', function () {
        closePopupFailure();
      });
    }
  }
  closePopupFailureClick();

  function closePopupFailureEnter() {
    if (popupFailBtn) {
      popupFailBtn.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.ENTER_KEYCODE) {
          closePopupFailure();
        } else {
          evt.preventDefault();
        }
      });
    }
  }
  closePopupFailureEnter();

  function closePopupFailureEsc() {
    document.addEventListener('keydown', function (evt) {
      if (popupFail.classList.contains('popup__failure--opened') && evt.keyCode === window.ESC_KEYCODE) {
        closePopupFailure();
      }
    });
  }
  closePopupFailureEsc();

  function onSubmitBtnClick() { 
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        validateIntro();
        validateTelField();
        validateMailField();
        if ((validateIntro()) && (validateTelField()) && (validateMailField())) {
          getPopupSuccess();
        } else {
          getPopupFailure();
        }
      });
    }
  }
  onSubmitBtnClick();

  function onSubmitBtnKeydown() {
    if (submitBtn) {
      submitBtn.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.ENTER_KEYCODE) {
          validateIntro();
          validateTelField();
          validateMailField();
        } else {
          evt.preventDefault();
        }
      });
    }
  }
  onSubmitBtnKeydown();

  function formSubmit() {
    if ((validateIntro) && (validateTelField) && (validateMailField)) {
      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      return true;
    } else {
      return false;
    }
  }
  formSubmit();

  // overflow: hidden; повесить на page, когда открыт оверлей
  // resetForm();
  // результаты отправки формы в консоль?

})();
