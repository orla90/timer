const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl

const createTimerAnimator = () => {
  let remainedSeconds;
  return (seconds) => {
    remainedSeconds = seconds;
    buttonEl.disabled = true;
    const calculateTimer = () => {
      const timerTime = transformSecondsToTimer(remainedSeconds);
      timerEl.innerHTML = timerTime;
      if (remainedSeconds === 0) {
        clearInterval(timerId);
        timerEl.innerHTML = `hh:mm:ss`;
        buttonEl.disabled = false;
      }
      remainedSeconds--;
    };
    calculateTimer();
    let timerId = setInterval(calculateTimer, 1000);
  };
};

const checkLength = (time, h) => {
  let stringTime;
  if (h) {
    if (time >= 24) {
      stringTime = (time % 24).toString();
    } else {
      stringTime = time.toString();
    }
  } else {
    stringTime = time.toString();
  }

  if (stringTime.length === 1) {
    return `0${stringTime}`;
  } else if (stringTime.length === 2) {
    return `${stringTime}`;
  }
};

const transformSecondsToTimer = (time) => {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = Math.round((time % 3600) % 60);

  if (seconds === 60) {
    seconds = 0;
    minutes = minutes + 1;
  }

  if (minutes === 60) {
    minutes = 0;
    hours = hours + 1;
  }

  const hh = checkLength(hours, true);
  const mm = checkLength(minutes, false);
  const ss = checkLength(seconds, false);

  return `${hh}:${mm}:${ss}`;
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  const regExp = /[0-9]/gi;
  const seconds = inputEl.value.match(regExp);
  if (seconds) {
    inputEl.value = seconds.join('');
  } else {
    inputEl.value = '';
  }
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
