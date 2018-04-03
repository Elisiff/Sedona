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
  var page = document.querySelector('.page');
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
      page.style.overflow = 'hidden';
    }
  }

  function closePopupSuccess() {
    popupSuccess.classList.remove('popup__success--opened');
    popupSuccess.classList.add('popup__success--closed');
    popupOver.classList.remove('popup__overlay--opened');
    popupOver.classList.add('popup__overlay--closed');
    page.style.overflow = 'visible';
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
    if (popupSuccessBtn) {
      document.addEventListener('keydown', function (evt) {
        if (popupSuccess.classList.contains('popup__success--opened') && evt.keyCode === window.ESC_KEYCODE) {
          closePopupSuccess();
        }
      });
    }
  }
  closePopupSuccessEsc();

  function getPopupFailure() {
    if (popupFail.classList.contains('popup__failure--closed')) {
      popupFail.classList.remove('popup__failure--closed');
      popupFail.classList.add('popup__failure--opened');
      popupOver.classList.remove('popup__overlay--closed');
      popupOver.classList.add('popup__overlay--opened');
      page.style.overflow = 'hidden';
    }
  }

  function closePopupFailure() {
    popupFail.classList.remove('popup__failure--opened');
    popupFail.classList.add('popup__failure--closed');
    popupOver.classList.remove('popup__overlay--opened');
    popupOver.classList.add('popup__overlay--closed');
    page.style.overflow = 'visible';
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
    if (popupFailBtn) {
      document.addEventListener('keydown', function (evt) {
        if (popupFail.classList.contains('popup__failure--opened') && evt.keyCode === window.ESC_KEYCODE) {
          closePopupFailure();
        }
      });
    }
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

  function resetForm() {
    if (form) {
      var formInput = form.getElementsByTagName('input');
      var formTextarea = form.getElementsByTagName('textarea');
      for (var i = 0; i < formInput.length; i++) {
        var typeValue = formInput[i].getAttribute('type');
        if (typeValue !== 'radio' && typeValue !== 'checkbox') {
          formInput[i].value = '';
        } else if (typeValue === 'radio' && formInput[i].value === 'positive') {
          formInput[i].checked = true;
        } else if (typeValue === 'checkbox' && formInput[i].name === 'form-sights__bridge') {
          formInput[i].checked = true;
        } else if (typeValue === 'checkbox' && formInput[i].name === 'form-sights__mountain') {
          formInput[i].checked = true;
        } else if (typeValue === 'checkbox' && formInput[i].name === 'form-sights__park') {
          formInput[i].checked = true;
        } else if (typeValue === 'checkbox' && formInput[i].name === 'form-sights__cliffs') {
          formInput[i].checked = false;
        }
      }
      for (var k = 0; k < formTextarea.length; k++) {
        formTextarea[k].value = '';
      }
    }
  }

  function formSubmit() {
    if ((validateIntro) && (validateTelField) && (validateMailField)) {
      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        resetForm();
      });
      return true;
    } else {
      return false;
    }
  }

  if (form) {
    formSubmit();
  }
})();

'use strict';

(function () {
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;
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
    openBtn.addEventListener('click', function () {
      openNav();
    });
  }
  clickOpenBtnNav();

  function pressEnterOpenBtnNav() {
    openBtn.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ENTER_KEYCODE) {
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
    closeBtn.addEventListener('click', function () {
      closeNav();
    });
  }
  clickCloseBtnNav();

  function pressEscNav() {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        closeNav();
      }
    });
  }
  pressEscNav();

  function pressEnterCloseBtnNav() {
    closeBtn.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ENTER_KEYCODE) {
        closeNav();
      }
    });
  }
  pressEnterCloseBtnNav();
})();

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

'use strict';

(function () {
  var video = document.querySelector('.video__file');
  var playBtn = document.querySelector('.video__play');
  var pauseBtn = document.querySelector('.video__pause');
  var replayBtn = document.querySelector('.video__replay');
  var progressBar = document.querySelector('.video__progress');
  var progressToggle = document.querySelector('.video__toggle');
  var levelContainer = document.querySelector('.video__bar-wrapper');
  var errVideo = document.querySelector('.video__error');
  var fullScreenBtn = document.querySelector('.video__fullscreen');
  // var videoWrapper = document.querySelector('.video__presentation');

  function playVideo() {
    video.play();
    video.addEventListener('timeupdate', updateBar, false);
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    replayBtn.style.display = 'none';
  }

  function pauseVideo() {
    video.pause();
    video.removeEventListener('timeupdate', updateBar);
    if (video.currentTime !== video.duration) {
      playBtn.style.display = 'block';
      pauseBtn.style.display = 'none';
      replayBtn.style.display = 'none';
    }
  }

  function replayVideo() {
    video.play();
    video.addEventListener('timeupdate', updateBar, false);
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    replayBtn.style.display = 'none';
  }

  function endedVideo() {
    if (video) {
      video.addEventListener('ended', function () {
        if (video.currentTime === video.duration) {
          video.pause();
          pauseBtn.style.display = 'none';
          playBtn.style.display = 'none';
          replayBtn.style.display = 'block';
        }
      });
    }
  }

  function clickPlayBtn() {
    if (video) {
      playBtn.addEventListener('click', function () {
        playVideo();
      });
    }
  }

  function clickPauseBtn() {
    if (video) {
      pauseBtn.addEventListener('click', function () {
        pauseVideo();
      });
    }
  }

  function clickReplayBtn() {
    if (video) {
      replayBtn.addEventListener('click', function () {
        replayVideo();
      });
    }
  }

  function toggleVideo() {
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  }

  function clickVideo() {
    if (video) {
      video.addEventListener('click', function () {
        toggleVideo();
      });
    }
  }

  // FullScreen API
  // function openFullScreen() {
  //   if (video.requestFullscreen) {
  //     video.requestFullscreen();
  //   } else if (video.mozRequestFullScreen) {
  //     video.mozRequestFullScreen();
  //   } else if (video.webkitRequestFullscreen) {
  //     video.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  //   } else if (video.msRequestFullScreen) {
  //     video.msRequestFullScreen();
  //   }
  // }

  // function cancelFullScreen() {
  //   if (document.requestFullscreen) {
  //     document.requestFullscreen();
  //   } else if (document.webkitRequestFullscreen) {
  //     document.webkitRequestFullscreen();
  //   } else if (document.mozRequestFullscreen) {
  //     document.mozRequestFullScreen();
  //   } else if (document.msRequestFullScreen) {
  //     document.msRequestFullScreen();
  //   }
  // }

  // function toggleFullScreen() {
  //   if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
  //     openFullScreen();
  //   } else {
  //     cancelFullScreen();
  //   }
  // }

  function cancelFullScreen(el) {
    var requestMethod = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullscreen;
    if (requestMethod) { // cancel full screen.
      requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== 'undefined') { // Older IE.
      var wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
  }

  function requestFullScreen(el) {
    // Supports most browsers and their versions.
    var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

    if (requestMethod) { // Native full screen.
      requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== 'undefined') { // Older IE.
      var wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
    return false;
  }

  function setAttributes(elem, obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        elem[prop] = obj[prop];
      }
    }
  }

  function toggleFullScreen() {
    var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) || (document.mozFullScreen || document.webkitIsFullScreen);

    if (isInFullScreen) {
      cancelFullScreen(document);
    } else {
      requestFullScreen(video);
    }
    return false;
  }

  function clickFullScreenBtn() {
    if (video) {
      fullScreenBtn.addEventListener('click', function () {
        toggleFullScreen();
      });
    }
  }

  function updateBar() {
    var percentage = Math.ceil((100 / video.duration) * video.currentTime);
    progressBar.style.width = percentage + '%';
    progressToggle.style.left = progressBar.style.width;
  }

  function movePin() {
    var levelContainerWidth = getComputedStyle(levelContainer).width;
    levelContainerWidth = Number(levelContainerWidth.replace(/px/, ''));
    var levelBarPaddingL = getComputedStyle(levelContainer).paddingLeft;
    levelBarPaddingL = Number(levelBarPaddingL.replace(/px/, ''));
    var levelBarPaddingR = getComputedStyle(levelContainer).paddingRight;
    levelBarPaddingR = Number(levelBarPaddingR.replace(/px/, ''));
    window.levelBarWidth = levelContainerWidth - (levelBarPaddingL + levelBarPaddingR);
    window.levelStyleX = Number(getComputedStyle(progressToggle).left.replace(/px/, '')) * window.levelBarWidth / 100;
    levelContainer.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      pauseVideo();
      levelContainer.style.cursor = 'pointer';

      var startCoords = {
        x: evt.clientX
      };
      var progressToggleX = progressToggle.getBoundingClientRect().right;
      progressToggle.style.left = (startCoords.x - progressToggleX) + progressToggle.offsetLeft + 4 + 'px';
      progressBar.style.width = progressToggle.style.left;
      if (progressToggle.offsetLeft > window.levelBarWidth) {
        progressToggle.style.left = window.levelBarWidth + 'px';
        progressBar.style.width = progressToggle.style.left;
      } else
      if (progressToggle.offsetLeft < 0) {
        progressToggle.style.left = 0 + 'px';
        progressBar.style.width = progressToggle.style.left;
      }
      window.levelStyleX = Number(progressToggle.style.left.replace(/px/, ''));
      var percentageX = Math.floor((window.levelStyleX * 100) / window.levelBarWidth);
      var curTime = (percentageX / 100) * video.duration;
      video.currentTime = curTime;

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        pauseVideo();

        var shift = {
          x: startCoords.x - moveEvt.clientX
        };

        startCoords = {
          x: moveEvt.clientX
        };

        progressToggle.style.left = (progressToggle.offsetLeft - shift.x) + 'px';
        progressBar.style.width = progressToggle.style.left;

        if (progressToggle.offsetLeft > window.levelBarWidth) {
          progressToggle.style.left = window.levelBarWidth + 'px';
          progressBar.style.width = progressToggle.style.left;
        } else
        if (progressToggle.offsetLeft < 0) {
          progressToggle.style.left = 0 + 'px';
          progressBar.style.width = progressToggle.style.left;
        }
        window.levelStyleX = Number(progressToggle.style.left.replace(/px/, ''));
        percentageX = Math.floor((window.levelStyleX * 100) / window.levelBarWidth);
        curTime = (percentageX / 100) * video.duration;
        video.currentTime = curTime;
      }

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        pauseVideo();
        levelContainer.style.cursor = 'default';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  function errorVideo() {
    video.style.display = 'none';
    errVideo.style.display = 'block';
  }

  if (video) {
    video.addEventListener('loadeddata', function () {
      video.removeEventListener('error', errorVideo);
      endedVideo();
      clickPlayBtn();
      clickPauseBtn();
      clickReplayBtn();
      clickVideo();
      clickFullScreenBtn();
      movePin();
    }, false);
  }

  if (video) {
    video.addEventListener('error', function () {
      errorVideo();
    });
  }
})();
