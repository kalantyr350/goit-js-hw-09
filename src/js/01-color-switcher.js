function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const bodyBG = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerId = null;

btnStart.addEventListener('click', startColorSwitch);
btnStop.addEventListener('click', stopColorSwitch);

function startColorSwitch() {
  timerId = setInterval(
    () => (bodyBG.style.backgroundColor = getRandomHexColor()),
    1000
  );
  btnStart.disabled = true;
  console.log(timerId);
}

function stopColorSwitch() {
  clearInterval(timerId);
  bodyBG.style.backgroundColor = '#fff';
  btnStart.disabled = false;
}
