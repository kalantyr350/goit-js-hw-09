import Notiflix from 'notiflix';
// const delayInput = document.querySelector('.form');
const form = document.querySelector('.form');

const obj = {};

form.addEventListener('input', inputObj);
function inputObj(event) {
  obj[event.target.name] = event.target.value;
}

form.addEventListener('submit', formHandler);

function formHandler(event) {
  event.preventDefault();

  //
  const formData = new FormData(event.currentTarget);
  console.log(formData);

  for (let i = 1; i <= obj.amount; i++) {
    if (i <= obj.amount) {
      createPromise(i, Number(obj.delay), Number(obj.step))
        .then(({ position, delay, step }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${
              delay + (position - 1) * step
            }ms`
          );
        })
        .catch(({ position, delay, step }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${
              delay + (position - 1) * step
            }ms`
          );
        });
    }
  }
}

function createPromise(position, delay, step) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay, step });
      }
      reject({ position, delay, step });
    }, delay + (position - 1) * step);
  });
}
