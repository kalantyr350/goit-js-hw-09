import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const startBtn = document.querySelector('button[data-start]');
const inputDays = document.querySelector('[data-days]');
const inputHour = document.querySelector('[data-hours]');
const inputMinute = document.querySelector('[data-minutes]');
const inputSeconds = document.querySelector('[data-seconds]');
const inputEl = document.querySelector('input');
// const date = new Date();

let timerCountdown = 0;
let timerMs = null;
let timerId = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    } else {
      startBtn.disabled = false;
      // timerCountdown = selectedDates.getTime();

      startBtn.addEventListener('click', () => {
        timerId = setInterval(() => {
          timerCountdown = new Date(inputEl.value);
          timerMs = timerCountdown - Date.now();
          timerMs = timerMs - 1000;
          // convertMs(timerMs);
          // console.log(convertMs(timerMs)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
          const convertMsTimerMs = convertMs(timerMs);
          console.log(convertMsTimerMs);
          addLeadingZero(convertMsTimerMs);
          // console.log(addLeadingZero(convertMs(timerMs))); // {days: 0, hours: 0, minutes: 0, seconds: 2}
        }, 1000);
        startBtn.disabled = true;
      });
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  // addLeadingZero({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

function timerParamToString(value) {
  value.toString().padStart(2, '0');
}

function addLeadingZero(value) {
  timerParamToString(value);
  // const timerParam = Object.values(value);
  // const timerParamToString = timerParam.map(timerParam => timerParam.toString().padStart(2, '0'));
  const { days, hours, minutes, seconds } = value;
  inputDays.innerHTML = days;
  inputHour.innerHTML = hours;
  inputMinute.innerHTML = minutes;
  inputSeconds.innerHTML = seconds;
}
