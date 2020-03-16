document.addEventListener("DOMContentLoaded", function () {
  loadImages();
  loadBreed();
});

function loadImages() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(results => {
      results.message.forEach(image => addImage(image))
    });
}

function addImage(url) {
  let imgContainer = document.querySelector('#dog-image-container');
  let newImg = document.createElement('img');
  newImg.src = url;
  imgContainer.appendChild(newImg);
}

function loadBreed() {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(results => {
      breeds = Object.keys(results.message);
      updateBreedList(breeds);
      addBreedSelectListener();
    });
}

function updateBreedList(breeds) {
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}

function addBreed(breed) {
  let breedsList = document.querySelector('#dog-breeds');
  let newLi = document.createElement('li');
  newLi.innerHTML = breed;
  newLi.style.cursor = 'pointer';
  newLi.addEventListener('click', changeColor);
  breedsList.appendChild(newLi);
}

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectBreedsStartingWith(letter) {
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function (event) {
    selectBreedsStartingWith(event.target.value);
  });
}

function changeColor(event) {
  event.target.style.color = 'red';
}

