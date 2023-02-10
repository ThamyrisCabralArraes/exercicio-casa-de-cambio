import './style.css';

import Swal from 'sweetalert2';

const inputMoney = document.getElementById('money');
const button = document.getElementById('button-click');
const uls = document.getElementById('ul-li');
const titulo = document.getElementById('titulo');

const funcaoErro = () => {
  return Swal.fire({
    title: 'Ops... você precisa passar uma moeda',
    icon: 'question',
    iconHtml: 'X',
    confirmButtonText: 'OK',
    showCloseButton: true,
  });
};

const apiMoeda = () => {
  const { value } = inputMoney;
  if (!inputMoney.value) {
    funcaoErro();
  }

  fetch(`https://api.exchangerate.host/latest?base=${value}`).then(
    (response) =>
      response
        .json()
        .then((data) => {
          const { rates } = data;

          titulo.textContent = `Valores relacionados a moeda ${inputMoney.value}`;

          const ratesR = Object.entries(rates);
          uls.innerHTML = '';
          ratesR.forEach(([rate, valu]) => {
            const li = document.createElement('li');
            li.classList.add('lista-de-moeda');
            li.innerHTML = `${rate} = <span>${valu.toFixed(2)}</span>`;
            const img = document.createElement('img');
            img.src = 'public/coins-logo.png';

            li.appendChild(img);
            uls.appendChild(li);
          });
        })
        .catch((error) => error.message),
    (inputMoney.value = ''),
  );
};

button.addEventListener('click', apiMoeda);
