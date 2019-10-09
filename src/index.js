document.addEventListener('DOMContentLoaded', function() {
  console.log('%c HI', 'color: firebrick')
  fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(json => renderImages(json));

    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
      .then(resp => resp.json())
      .then(json => renderBreeds(json));

      const breed_ul = document.getElementById('dog-breeds');
      console.log(breed_ul);
      breed_ul.addEventListener('click', function(event) {
        if (event.target.className === "breed") {

          event.target.style.color = "#ff00ff";

        }
      });

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
      breed_li.className = "breed";
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
};
