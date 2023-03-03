//Mettre le code JavaScript lié à la page photographer.html
function checkUrl() {
  let params = window.location.href;
  let photographerId = params.substring(params.indexOf("?id=") + 4);
  return photographerId;
}
let photosLibrary;
async function getProducts() {
  let response = await fetch("/data/photographers.json", {
    method: "GET",
    type: "application/json",
    mode: "cors",
    cache: "default",
  }).then((res) => res.json());
  const photographer = await response.photographers.filter(
    (photographer) => photographer.id == checkUrl()
  )[0];
  //retourner le tableau products
  const photos = await response.media.filter(
    (photo) => photo.photographerId == checkUrl()
  );
  return { photos, photographer };
}

function fillProfile(data) {
  // DOM
  const nameDOM = document.getElementById("photographerName");
  const location = document.getElementById("location");
  const des = document.getElementById("tagline");
  const img = document.getElementById("avatar");
  img.alt = data.name + " logo.";
  location.textContent = data.city + ", " + data.country;
  des.textContent = data.tagline;
  nameDOM.textContent = data.name;
  nameDOM.classList.add("h1-style");
  img.src = `/assets/photographers/${data.portrait}`;
}

async function displayData(products) {
  photosLibrary = products;
  const productsSection = document.querySelector(".product-list");
  var child = productsSection.lastElementChild;
  while (child) {
    productsSection.removeChild(child);
    child = productsSection.lastElementChild;
  }
  products.forEach((photographer) => {
    const product = photoFactory(photographer);
    const userCardDOM = product.getUserCardDOM();
    productsSection.appendChild(userCardDOM);
  });
}

function displaySticky(photographer, likesSum) {
  // DOM
  const likesNumber = document.querySelector(".likes-number");
  const priceNumber = document.querySelector(".price-number");
  likesNumber.textContent = likesSum;
  priceNumber.textContent = photographer.price;
}
async function init() {
  // Récupère les pictos par un photographer
  const { photos, photographer } = await getProducts();
  photosLibrary = photos;
  let likesSum = 0;
  photos.map((photo) => (likesSum += photo.likes));
  fillProfile(photographer);
  displayData(photos);
  displaySticky(photographer, likesSum);
}

init();
