/* Select element */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const playButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const volumnRanges = player.querySelectorAll('.player__slider');
const progressBar = player.querySelector('.progress__filled');
const progress = player.querySelector('.progress');
const screenSize = player.querySelector('.full-screen');

/* Build out function */

function togglePlayer() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  playButton.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleVolumn() {
  video[this.name] = this.value;
}

function handleProgress() {
  // When the video is play progress bar should update on realtime
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  // Click and drag it should update the video to correspond with that place
}

function scrub(e) {
  // Some how define the position when the user click in
  // Caculate this and turn to time
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  // Update the time
  video.currentTime = scrubTime;
}

function handleScreenSize() {
  document.fullscreen ? document.exitFullscreen() : player.requestFullscreen();
}

/* Add event listener */
video.addEventListener('click', togglePlayer);
playButton.addEventListener('click', togglePlayer);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
skipButtons.forEach((btn) => btn.addEventListener('click', skip));
volumnRanges.forEach((volumnRange) =>
  volumnRange.addEventListener('input', handleVolumn)
);
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
screenSize.addEventListener('click', handleScreenSize);
