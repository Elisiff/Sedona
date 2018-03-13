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
