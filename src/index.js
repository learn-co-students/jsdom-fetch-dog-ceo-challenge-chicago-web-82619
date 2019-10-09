const state = {};


document.addEventListener('DOMContentLoaded', function() {
  console.log('%c HI', 'color: firebrick')
  // fetch('https://dog.ceo/api/breeds/image/random/4')
  //   .then(resp => resp.json())
  //   .then(json => renderImages(json));

    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
      .then(resp => resp.json())
      .then(json => {

        state.breeds = [...renderBreeds(json)]
        console.log(state)
        console.log(renderBreeds(json))

      });

      const breed_ul = document.getElementById('dog-breeds');

      breed_ul.addEventListener('click', function(event) {
        if (event.target.className === "breed") {

          event.target.style.color = "#ff00ff";

        }
      });

      // filter based on dropdown
    const letterFilter = document.getElementById('breed-dropdown');
    letterFilter.addEventListener('change', function(event) {
      const breeds_ul = document.getElementById('dog-breeds');
      const breedsList = document.getElementById('dog-breeds').children;
      const letter = event.target.value
      console.log(letter)
      const activeBreeds = filterBreeds(letter, state.breeds)
      breeds_ul.innerHTML = "";
      activeBreeds.forEach( breed => {
        console.log(breed);
        if (activeBreeds.includes(breed)) {
          breeds_ul.appendChild(breed);
        }
      })

    })
});



function renderImages(json) {
  const imgContainer = document.getElementById('dog-image-container');
  const imageURI = json.message;
  for (let src of imageURI) {
    let image = document.createElement('img');
    image.src = src;
    imgContainer.append(image);
  };
};

function renderBreeds(json) {
  const breedsList = document.getElementById('dog-breeds');
  const breeds = json.message;
  for (let breed in breeds) {

    let breed_li;
    if (breeds[breed].length > 0) {
    for (let subtype of breeds[breed]) {

      breed_li = document.createElement('li');
      breed_li.className = "breed " + breed;
      breed_li.textContent = subtype + " " + breed;
      breedsList.appendChild(breed_li);
    }
  }
  else {
    breed_li = document.createElement('li');
    breed_li.className = "breed";
    breed_li.textContent = breed;
    breedsList.appendChild(breed_li);
  }
  };
  return breedsList.children;
}

function filterBreeds(letter, listOfBreeds) {
  const breedArr = Array.from(listOfBreeds)
  console.log(breedArr)
  let result =  breedArr.filter(breed => {
    if (breed.classList.length > 1) {
      return breed.classList[1][0] == letter;
    } else {
      return breed.textContent[0] == letter
    }
  });
  return result;
};
