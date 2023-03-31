// function to take the id from url (this id is equal to photographerId)
function checkUrl() {
	const params = window.location.href;
	const photographerId = params.substring(params.indexOf("?id=") + 4);
	return photographerId;
}

// global variables
let photosLibrary;
let currentPhotographer;
let likesSum = 0;

// request to take all the photos of precise photographer
async function getProducts() {
	const response = await fetch("/data/photographers.json", {
		method: "GET",
		type: "application/json",
		mode: "cors",
		cache: "default",
	}).then((res) => res.json());
	const photographer = await response.photographers.filter(
		(photographer) => photographer.id == checkUrl()
	)[0];
	// filter all the photos which has the right photographerId
	const photos = await response.media.filter(
		(photo) => photo.photographerId == checkUrl()
	);
	return { photos, photographer };
}
const likesNumDOM = document.querySelector(".likes-number");

// create the DOM to contain the photographer data at the header
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
var stop = false;

// creation part for containing the photos
async function displayData(products) {
	photosLibrary = products;
	const productsSection = document.querySelector(".product-list");
	let child = productsSection.lastElementChild;
	while (child) {
		productsSection.removeChild(child);
		child = productsSection.lastElementChild;
	}

	products.forEach((photographer) => {
		if (stop) return;
		const product = photoFactory(photographer);
		const userCardDOM = product.getUserCardDOM();
		productsSection.appendChild(userCardDOM);
	});

	// add like to photo item and likes sum
	for (let i = 0; i < productsSection.childNodes.length; i++) {
		let liked = false;
		const likesWrapDOM =
			productsSection.childNodes[i].childNodes[1].childNodes[1];
		const likesDOM = likesWrapDOM.childNodes[0].childNodes[0];
		likesWrapDOM.addEventListener("click", () => {
			if (likesDOM.textContent == products[i].likes) {
				likesDOM.textContent = products[i].likes + 1;
				likesSum++;
			} else {
				likesDOM.textContent = products[i].likes;
				likesSum--;
			}
			likesNumDOM.textContent = likesSum;
			liked = !liked;
		});
		likesWrapDOM.addEventListener("keydown", (e) => {
			if (e.code === "Enter") {
				if (likesDOM.textContent == products[i].likes) {
					likesDOM.textContent = products[i].likes + 1;
					likesSum++;
				} else {
					likesDOM.textContent = products[i].likes;
					likesSum--;
				}
				likesNumDOM.textContent = likesSum;
				liked = !liked;
			}
		});
		stop = true;
	}
}

// display the price and likes part sticky
function displaySticky(photographer, likesSum) {
	// DOM
	const likesNumber = document.querySelector(".likes-number");
	const priceNumber = document.querySelector(".price-number");
	likesNumber.textContent = likesSum;
	priceNumber.textContent = photographer.price;
}

// initialisation when starting
async function init() {
	// take all the photos by photographer
	const { photos, photographer } = await getProducts();
	photosLibrary = photos;
	currentPhotographer = photographer;
	photos.map((photo) => (likesSum += photo.likes));
	fillProfile(photographer);
	displayData(photos);
	displaySticky(photographer, likesSum);
}
init();
