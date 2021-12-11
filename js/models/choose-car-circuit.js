/* CAR PANEL SELECTION */

let countCar = 1;

function chooseCar () {
  const carContainer = document.getElementById('car');
  carContainer.innerHTML = `<img class="my-car" src="/images/cars/car-${countCar}.png">`;
}

const prevCar = document.getElementById('left-button-car');
const nextCar = document.getElementById('right-button-car');

prevCar.onclick = () => {
  if (countCar > 1) {
    countCar = countCar - 1;
    chooseCar();
  }
};

nextCar.onclick = () => {
  if (countCar < 4) {
    countCar = countCar + 1;
    chooseCar();
  }
};

chooseCar();


const carButton = document.getElementById('car-button');
const closeCarButton = document.getElementById('close-car-selection')
const carSelectionPanel = document.getElementById('car-selection');

carButton.addEventListener('click', () => {
  carSelectionPanel.classList.add('display-panel');
});

closeCarButton.addEventListener('click', () => {
  carSelectionPanel.classList.remove('display-panel');
});


function carChoosen() {
  const choosenCar = document.querySelector('#car');

  choosenCar.addEventListener('click', () => {
    let myCar = document.querySelector('.my-car');
    console.log(myCar.getAttribute('src'));
  });
}

/* export const carToGame = carChoosen(); */


/* CIRCUIT PANEL SELECTION */
let countCircuit = 1;

function chooseCircuit () {
  const circuitContainer = document.getElementById('circuit');
  circuitContainer.innerHTML = `<img class="my-circuit" src="/images/circuits/circuit-${countCircuit}.png">`;
}

const prevCircuit = document.getElementById('left-button-circuit');
const nextCircuit = document.getElementById('right-button-circuit');

prevCircuit.onclick = () => {
  if (countCircuit > 1) {
    countCircuit = countCircuit - 1;
    chooseCircuit();
  }
};

nextCircuit.onclick = () => {
  if (countCircuit < 3) {
    countCircuit = countCircuit + 1;
    chooseCircuit();
  }
};

chooseCircuit();


const raceButton = document.getElementById('race-button');
const closeCircuitButton = document.getElementById('close-circuit-selection')
const circuitSelectionPanel = document.getElementById('circuit-selection');

raceButton.addEventListener('click', () => {
  circuitSelectionPanel.classList.add('display-panel');
});

closeCircuitButton.addEventListener('click', () => {
  circuitSelectionPanel.classList.remove('display-panel');
});