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
