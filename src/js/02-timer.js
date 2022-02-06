// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const flatpickrInpet = document.querySelector('input#datetime-picker');
const fp = flatpickr(flatpickrInpet, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
});

const bntStart = document.querySelector('button[data-start]');

// получаем элементы, содержащие компоненты даты
const timerRefs = {
  $days: document.querySelector('.value[data-days]'),
  $hours: document.querySelector('.value[data-hours]'),
  $minutes: document.querySelector('.value[data-minutes]'),
  $seconds: document.querySelector('.value[data-seconds]'),
};

// console.log(timerRefs.$days);
// console.log(timerRefs.$hours);
// console.log(timerRefs.$minutes);
// console.log(timerRefs.$seconds);
// ===========================================================
bntStart.addEventListener('click', onBtnStart);
bntStart.setAttribute('disabled', true);
// bntStart.removeAttribute('disabled');

function onBtnStart() {
  timer.start();
  // timer.stop();
}

class Timer {
  constructor({ onTick }) {
    this.timerId = null;
    this.isActive = false;
    this.onTick = onTick;

    // this.init();
  }

  start() {
    if (this.isActive) {
      return;
    }
    if (new Date(fp.selectedDates).getTime() > new Date().getTime()) {
      bntStart.removeAttribute('disabled');
      console.log('ononon');
    }
    if (new Date(fp.selectedDates).getTime() <= new Date().getTime()) {
      window.alert('Please choose a date in the future');
      bntStart.setAttribute('disabled', true);
      console.log('gfdisognodfi');
    }

    const countDownDate = new Date(fp.selectedDates).getTime();
    this.isActive = true;

    this.timerId = setInterval(() => {
      const currentTime = new Date().getTime();
      const deltaTime = countDownDate - currentTime;
      const onTime = this.convertMs(deltaTime);
      this.onTick(onTime);
      // timeText(onTime);
      console.log(onTime);

      if (deltaTime <= 0) {
        clearInterval(this.timerId);
        this.isActive = false;
        const onTime = this.convertMs(0);
        this.onTick(onTime);
        console.log('Финиш');
      }
    }, 1000);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  // console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  // console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  // console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
}

const timer = new Timer({
  onTick: timeText,
});

function timeText({ days, hours, minutes, seconds }) {
  timerRefs.$days.textContent = `${days}`;
  timerRefs.$hours.textContent = `${hours}`;
  timerRefs.$minutes.textContent = `${minutes}`;
  timerRefs.$seconds.textContent = `${seconds}`;
  console.log(timerRefs.$seconds);
  // console.log(timerRefs.$minutes);
}
flatpickrInpet.addEventListener('change', testWindos);

function testWindos(params) {
  if (new Date(fp.selectedDates).getTime() <= new Date().getTime()) {
    window.alert('Please choose a date in the future');
    bntStart.setAttribute('disabled', true);
    console.log('gfdisognodfi');
  }
  if (new Date(fp.selectedDates).getTime() > new Date().getTime()) {
    bntStart.removeAttribute('disabled');
    console.log('ononon');
  }
}
