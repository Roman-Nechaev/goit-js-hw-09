const refs = {
  bntStart: document.querySelector('button[data-start]'),
  bntStop: document.querySelector('button[data-stop]'),
  bodyEl: document.body,
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const DELAY = 1000;
refs.bntStart.addEventListener('click', () => {
  interval.start();
});
refs.bntStop.addEventListener('click', () => {
  interval.stop();
});

//   ==========================================

const interval = {
  timerId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.timerId = setInterval(() => {
      this.isActive = true;
      const color = getRandomHexColor();
      console.log(color);
      refs.bodyEl.style.backgroundColor = color;
    }, DELAY);
  },
  stop() {
    clearInterval(this.timerId);
    this.isActive = false;
  },
};
