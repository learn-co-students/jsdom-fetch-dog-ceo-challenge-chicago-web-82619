document.addEventListener('DOMContentLoaded', function() {
  console.log('%c HI', 'color: firebrick')
  fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(json => renderImages(json));
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
