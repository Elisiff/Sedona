'use strict';

(function () {
  var video = document.querySelector('.video__file');
  var playBtn = document.querySelector('.video__play');
  var pauseBtn = document.querySelector('.video__pause');
  var replayBtn = document.querySelector('.video__replay');
  var progressBar = document.querySelector('.video__progress');
  var progressToggle = document.querySelector('.video__toggle');
  var levelContainer = document.querySelector('.video__bar-wrapper');

  function playVideo() {
    video.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    replayBtn.style.display = 'none';
    // video.addEventListener('timeupdate', updateBar);
  }

  function pauseVideo() {
    video.pause();
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    replayBtn.style.display = 'none';
    // video.addEventListener('timeupdate', function (evt) {
    //   evt.stopPropagation();
    // });
  }

  function replayVideo() {
    video.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    replayBtn.style.display = 'none';
    // video.addEventListener('timeupdate', updateBar, false);
  }

  function endedVideo() {
    if (video) {
      video.addEventListener('ended', function () {
        video.pause();
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'none';
        replayBtn.style.display = 'block';
      });
    }
  }
  // endedVideo();

  function clickPlayBtn() {
    if (video) {
      playBtn.addEventListener('click', function () {
        playVideo();
      });
    }
  }
  // clickPlayBtn();

  function clickPauseBtn() {
    if (video) {
      pauseBtn.addEventListener('click', function () {
        pauseVideo();
      });
    }
  }
  // clickPauseBtn();

  function clickReplayBtn() {
    if (video) {
      replayBtn.addEventListener('click', function () {
        replayVideo();
      });
    }
  }
  // clickReplayBtn();

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
  // clickVideo();

  function updateBar() {
    var percentage = Math.floor((100 / video.duration) * video.currentTime);
    progressBar.style.width = percentage + '%';
    progressToggle.style.left = percentage + '%';
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

    progressToggle.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      pauseVideo();

      var startCoords = {
        x: evt.clientX
      };

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

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
        var percentageX = Math.floor((window.levelStyleX * 100) / window.levelBarWidth);
        var curTime = (percentageX / 100) * video.duration;
        video.currentTime = curTime;
      }

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  if (video) {
    video.addEventListener('loadstart', function () {
      endedVideo();
      clickPlayBtn();
      clickPauseBtn();
      clickReplayBtn();
      clickVideo();
      movePin();
    }, false);
  }
})();
