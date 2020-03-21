console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

document.addEventListener("DOMContentLoaded", () => {
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => addPicture(json["message"]));
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => addBreed(Object.keys(json["message"])));
});

function addPicture(arr) {
    const dogPics = document.getElementById("dog-image-container");
    for(const element of arr) {
        let img = document.createElement("img");
        dogPics.append(img);
        img.setAttribute("src", element);
    }
}

function addBreed(arr) {
    const breeds = document.getElementById("dog-breeds");
    for(const el of arr) {
        let li = document.createElement("li");
        breeds.append(li);
        li.innerText = el;
        li.setAttribute("class", "dog-breed-name")
    }
}

document.addEventListener("click", (event) => {
    if(event.target.className === "dog-breed-name") {
        event.target.style.color = "red";
    }
});

document.addEventListener("change", () => {
    let ul = document.getElementById("dog-breeds");
    let items = ul.getElementsByTagName("li");
    let dropdownValue = document.getElementById("breed-dropdown").value;
    for(const el of items) {
        if(el.innerText[0] !== dropdownValue) {
            el.style.display = "none";
        } else {
            el.style.display = "block";
        }
    }
});