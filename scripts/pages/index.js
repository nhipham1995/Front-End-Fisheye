async function getPhotographers() {
	// request to take all the photographers from json file
	const response = await fetch("/data/photographers.json", {
		method: "GET",
		type: "application/json",
		mode: "cors",
		cache: "default",
	}).then((res) => res.json());
	// return table of photographer one time
	return response;
}

async function displayData(photographers) {
	const photographersSection = document.querySelector(
		".photographer_section"
	);

	// for each photographer, create a article for displaying the data
	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// initialisation to take all the photographers
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

init();
