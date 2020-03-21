// const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
// const breedUrl = 'https://dog.ceo/api/breeds/list/all'
// const filter


// function main() {
//   document.addEventListener('DOMContentLoaded', (e) => {
//   //  console.log('%c HI', 'color: firebrick')
//    fetchDogImages()
//    fetchDogBreeds()
//    filterBreeds()
//   })
// }

// function fetchDogImages() {
//   fetch(imgUrl)
//   .then(resp => resp.json())
//   .then(images => renderImages(images))
// }

// function renderImages(images) {
//   const imageContainer = document.querySelector('#dog-image-container')
//   const dogImages = images.message

//   dogImages.forEach((image) => {
//     const imageTag = document.createElement('img')
//     imageTag.src = image
//     imageContainer.appendChild(imageTag)
//   })
// }

// function fetchDogBreeds() {
//   fetch(breedUrl)
//   .then(resp => resp.json())
//   .then(breeds => renderBreeds(breeds))
// }

// function renderBreeds(breeds) {
//   const breedUl = document.querySelector('#dog-breeds')
//   const dogBreeds = Object.keys(breeds.message)

//   dogBreeds.forEach((breed) => {
//     const liEl = document.createElement('li')
//     liEl.innerHTML = breed
//     breedUl.appendChild(liEl)

//     liEl.addEventListener('click', (event) => {
//       event.target.style.color = 'red'
//     })
//   })  
// }

// function filterBreeds() {

// }

// main()

let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
  loadImages();
  loadBreedOptions();
});

function loadImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(res=> res.json())
    .then(results => {
      results.message.forEach(image => addImage(image))
    });
}

function addImage(dogPicUrl) {
  let container = document.querySelector('#dog-image-container');
  let newImageEl = document.createElement('img');
  newImageEl.src = dogPicUrl;
  container.appendChild(newImageEl);
}

function loadBreedOptions() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(res => res.json())
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

function addBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}

function updateColor(event) {
  event.target.style.color = 'palevioletred';
}