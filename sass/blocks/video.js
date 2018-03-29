'use strict';

(function () {
  var video = document.querySelector('.video__file');
  var playBtn = document.querySelector('.video__play');
  var pauseBtn = document.querySelector('.video__pause');
  var replayBtn = document.querySelector('.video__replay');
  var progressBar = document.querySelector('.video__progress');
  var progressToggle = document.querySelector('.video__toggle');

  function playVideo() {
    video.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    replayBtn.style.display = 'none';
  }

  function pauseVideo() {
    video.pause();
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    replayBtn.style.display = 'none';
  }

  function replayVideo() {
    video.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    replayBtn.style.display = 'none';
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

  video.addEventListener('canplay', function () {
    endedVideo();
    clickPlayBtn();
    clickPauseBtn();
    clickReplayBtn();
    clickVideo();
  }, false);

  video.addEventListener('timeupdate', updateBar, false);
})();
