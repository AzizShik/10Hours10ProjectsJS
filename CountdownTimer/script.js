window.addEventListener('load', () => {
  const daysEl = document.querySelector('.countdown-timer-days span');
  const hoursEl = document.querySelector('.countdown-timer-hours span');
  const minutesEl = document.querySelector('.countdown-timer-minutes span');
  const secondsEl = document.querySelector('.countdown-timer-seconds span');

  const countdownTimer = () => {
    const date = new Date();
    const newYear = new Date(`January 1, ${date.getFullYear() + 1} 00:00:00`);
    const diff = newYear - date;
    let days = Math.floor(diff / 1000 / 60 / 60 / 24);
    let hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    let minutes = Math.floor((diff / 1000 / 60) % 60);
    let seconds = Math.floor((diff / 1000) % 60);
    days = days < 10 ? `0${days}` : days;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  };

  countdownTimer();

  setInterval(countdownTimer, 1000)
});
