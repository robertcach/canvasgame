let count = 1;

function renderCar () {
  const carContainer = document.getElementById('car');
  carContainer.innerHTML = `<img class="my-car" src="/images/cars/car-${count}.png">`;
}

const prevCar = document.getElementById('left-button');
const nextCar = document.getElementById('right-button');

prevCar.onclick = () => {
  if (count > 1) {
    count = count - 1;
    renderCar();
  }
};

nextCar.onclick = () => {
  if (count < 4) {
    count = count + 1;
    renderCar();
  }
};

renderCar();