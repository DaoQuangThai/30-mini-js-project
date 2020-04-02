let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const timerEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers before start new one
  clearInterval(countdown);

  // Get the current mil secs
  const now = Date.now();
  // Add time to countdown from
  const then = now + seconds * 1000;
  displayTimeEnd(then);
  displayFristSecond(seconds);

  // Set auto countdown
  countdown = setInterval(() => {
    // Có thể hiểu là vd then 40 giây now đang ở 30giay, sau mỗi lần fucntion run sau 1s thì now sẽ tăng lên 1 thành 1 => then sẽ còn 40-31 = 9
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayFristSecond(secondsLeft);
  }, 1000);
}

function displayFristSecond(seconds) {
  const getMinutes = Math.floor(seconds / 60);
  const getSeconds = seconds % 60;
  const display = `${getMinutes}:${getSeconds >= 10 ? '' : '0'}${getSeconds}`;

  timerDisplay.textContent = display;
  document.title = display;
}

function displayTimeEnd(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  const adjustHour = hours < 12 ? hours : hours - 12;
  const midDay = hours > 12;

  timerEnd.textContent = midDay
    ? `Be Back At ${adjustHour < 10 ? '0' : ''}${adjustHour}:${
        minutes < 10 ? '0' : ''
      }${minutes} PM`
    : `Be Back At ${adjustHour < 10 ? '0' : ''}${adjustHour}:${
        minutes < 10 ? '0' : ''
      }${minutes} AM`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
