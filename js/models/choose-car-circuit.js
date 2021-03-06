/* SLIDES CAR IMAGES */
let countCar = 0;

function chooseCar () {
  const carContainer = document.getElementById('car');
  carContainer.innerHTML = `<img class="my-car" id="${countCar}" src="/images/cars/car-${countCar}.png">`;
}

const prevCar = document.getElementById('left-button-car');
const nextCar = document.getElementById('right-button-car');

prevCar.onclick = () => {
  if (countCar >= 1) {
    countCar = countCar - 1;
    chooseCar();
  }
};

nextCar.onclick = () => {
  if (countCar < 3) {
    countCar = countCar + 1;
    chooseCar();
  }
};

chooseCar();



/* CHOOSE CAR TO GAME */
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
    document.getElementById('canvas').dataset.car = myCar.getAttribute('id')
  });
}

carChoosen()





/* SLIDES CIRCUIT IMAGES */
let countCircuit = 0;

function chooseCircuit () {
  const circuitContainer = document.getElementById('circuit');
  circuitContainer.innerHTML = `<img class="my-circuit" id="${countCircuit}" src="/images/circuits/circuit-${countCircuit}.png">`;
}

const prevCircuit = document.getElementById('left-button-circuit');
const nextCircuit = document.getElementById('right-button-circuit');

prevCircuit.onclick = () => {
  if (countCircuit > 0) {
    countCircuit = countCircuit - 1;
    chooseCircuit();
  }
};

nextCircuit.onclick = () => {
  if (countCircuit < 1) {
    countCircuit = countCircuit + 1;
    chooseCircuit();
  }
};

chooseCircuit();



/* CHOOSE CIRCUIT TO GAME */

const raceButton = document.getElementById('race-button');
const closeCircuitButton = document.getElementById('close-circuit-selection')
const circuitSelectionPanel = document.getElementById('circuit-selection');

raceButton.addEventListener('click', () => {
  circuitSelectionPanel.classList.add('display-panel');
});

closeCircuitButton.addEventListener('click', () => {
  circuitSelectionPanel.classList.remove('display-panel');
});

function circuitChossen() {
  const choosenCircuit = document.querySelector('#circuit');

  choosenCircuit.addEventListener('click', () => {
    let myCircuit = document.querySelector('.my-circuit');
    document.getElementById('canvas').dataset.background = myCircuit.getAttribute('id')
  });
}

circuitChossen()