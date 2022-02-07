import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
const flatpickrInpet = document.querySelector('input#datetime-picker');

const refs = {
  bntStart: document.querySelector('button[data-start]'),
  $days: document.querySelector('.value[data-days]'),
  $hours: document.querySelector('.value[data-hours]'),
  $minutes: document.querySelector('.value[data-minutes]'),
  $seconds: document.querySelector('.value[data-seconds]'),
};

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

// ===========================================================
refs.bntStart.addEventListener('click', onBtnStart);
refs.bntStart.setAttribute('disabled', true);
flatpickrInpet.addEventListener('change', onStartTimer);

class Timer {
  constructor({ onTick }) {
    this.timerId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }

    const countDownDate = new Date(fp.selectedDates).getTime();
    this.isActive = true;

    this.timerId = setInterval(() => {
      const currentTime = new Date().getTime();
      const deltaTime = countDownDate - currentTime;
      const onTime = this.convertMs(deltaTime);
      this.onTick(onTime);
      // console.log(onTime);

      if (deltaTime <= 0) {
        clearInterval(this.timerId);
        this.isActive = false;
        const onTime = this.convertMs(0);
        this.onTick(onTime);
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
}

const timer = new Timer({
  onTick: timeText,
});

function onBtnStart() {
  timer.start();
}

function onStartTimer() {
  if (new Date(fp.selectedDates).getTime() <= new Date().getTime()) {
    // window.alert('Please choose a date in the future');
    Notify.failure('Please choose a date in the future');
    refs.bntStart.setAttribute('disabled', true);
  }
  if (new Date(fp.selectedDates).getTime() > new Date().getTime()) {
    refs.bntStart.removeAttribute('disabled');
  }
}

function timeText({ days, hours, minutes, seconds }) {
  refs.$days.textContent = `${days}`;
  refs.$hours.textContent = `${hours}`;
  refs.$minutes.textContent = `${minutes}`;
  refs.$seconds.textContent = `${seconds}`;
}
