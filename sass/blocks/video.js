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

  function updateBar() {
    var percentage = Math.ceil((100 / video.duration) * video.currentTime);
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

  if (video) {
    // video.addEventListener('loadstart', function () {
      endedVideo();
      clickPlayBtn();
      clickPauseBtn();
      clickReplayBtn();
      clickVideo();
      movePin();
    // }, false);
  }
})();
