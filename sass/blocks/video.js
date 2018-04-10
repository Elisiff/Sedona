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
  var videoWrapper = document.querySelector('.video__presentation');
  var videoPlayFullBtn = document.querySelector('.video__play-full');

  function togglePlayFullBtn() {
    if (window.innerWidth === screen.width && window.innerHeight === screen.height && video.paused) {
      videoPlayFullBtn.style.display = 'block';
    } else {
      videoPlayFullBtn.style.display = 'none';
    }
  }

  function playVideo() {
    video.play();
    video.addEventListener('timeupdate', updateBar, false);
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    replayBtn.style.display = 'none';
    videoPlayFullBtn.style.display = 'none';
  }

  function pauseVideo() {
    video.pause();
    video.removeEventListener('timeupdate', updateBar);
    if (video.currentTime !== video.duration) {
      playBtn.style.display = 'block';
      pauseBtn.style.display = 'none';
      replayBtn.style.display = 'none';
      togglePlayFullBtn();
    }
  }

  function replayVideo() {
    video.play();
    video.addEventListener('timeupdate', updateBar, false);
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    replayBtn.style.display = 'none';
    videoPlayFullBtn.style.display = 'none';
  }

  function endedVideo() {
    if (video) {
      video.addEventListener('ended', function () {
        if (video.currentTime === video.duration) {
          video.pause();
          pauseBtn.style.display = 'none';
          playBtn.style.display = 'none';
          replayBtn.style.display = 'block';
          togglePlayFullBtn();
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

  function clickPlayFullBtn() {
    if (video) {
      videoPlayFullBtn.addEventListener('click', function () {
        playVideo();
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

  function calcSizesBtn() {
    var scrWidth = screen.width;
    var scrHeight = screen.height;

    videoPlayFullBtn.style.left = (50 - ((100 * 120 / scrWidth) / 2)) + '%';
    videoPlayFullBtn.style.top = (50 - ((100 * 120 / scrHeight) / 2)) + '%';
  }

  function toggleFullScreen() {
    var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) || (document.mozFullScreen || document.webkitIsFullScreen);

    if (isInFullScreen) {
      cancelFullScreen(document);
    } else {
      requestFullScreen(videoWrapper);
      calcSizesBtn();
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
    calcProgress();
    window.pixels = (video.currentTime * window.levelBarWidth / video.duration);
    progressBar.style.width = window.pixels + 'px';
    progressToggle.style.left = progressBar.style.width;
  }

  function calcProgress() {
    var levelContainerWidth = getComputedStyle(levelContainer).width;
    levelContainerWidth = Number(levelContainerWidth.replace(/px/, ''));
    var levelBarPaddingL = getComputedStyle(levelContainer).paddingLeft;
    levelBarPaddingL = Number(levelBarPaddingL.replace(/px/, ''));
    var levelBarPaddingR = getComputedStyle(levelContainer).paddingRight;
    levelBarPaddingR = Number(levelBarPaddingR.replace(/px/, ''));
    window.levelBarWidth = levelContainerWidth - (levelBarPaddingL + levelBarPaddingR);
    window.levelStyleX = Number(getComputedStyle(progressToggle).left.replace(/px/, '')) * window.levelBarWidth / 100;
  }

  function movePin() {
    levelContainer.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      pauseVideo();
      levelContainer.style.cursor = 'pointer';

      var startCoords = {
        x: evt.clientX
      };
      var progressToggleX = progressToggle.getBoundingClientRect().right;
      progressToggle.style.left = (startCoords.x - progressToggleX) + progressToggle.offsetLeft + 'px';
      progressBar.style.width = progressToggle.style.left;
      calcProgress();
      if (progressToggle.offsetLeft > window.levelBarWidth) {
        progressToggle.style.left = window.levelBarWidth + 'px';
        progressBar.style.width = progressToggle.style.left;
      } else
      if (progressToggle.offsetLeft < 0) {
        progressToggle.style.left = 0 + 'px';
        progressBar.style.width = progressToggle.style.left;
      }
      window.levelStyleX = Number(progressToggle.style.left.replace(/px/, ''));
      var percentageX = Math.ceil((window.levelStyleX * 100) / window.levelBarWidth);
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
        percentageX = Math.ceil((window.levelStyleX * 100) / window.levelBarWidth);
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
      clickPlayFullBtn();
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

  if (video) {
    window.addEventListener('resize', function () {
      togglePlayFullBtn();
      updateBar();
    });
  }
})();
