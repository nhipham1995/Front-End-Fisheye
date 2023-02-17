// function myFunction() {
// 	document.getElementById("myDropdown").classList.toggle("show");
// }
// document
// 	.querySelector("button.dropbtn")
// 	.addEventListener("click", () => myFunction());
// Close the dropdown menu if the user clicks outside of it
window.onclick = async function (event) {
	const { photos } = await getProducts();
	console.log("photo: ", photos);
	if (!event.target.matches(".dropbtn")) {
		var dropdowns = document.getElementById("myDropdown");
		output = dropdowns.value;
		let newPhotos;
		if (output) {
			console.log("true");
			newPhotos = await photos.sort((a, b) => {
				if (output === "title") {
					return a[output] > b[output];
				}
				return a[output] < b[output];
			});
		}
		console.log(newPhotos);
		displayData(newPhotos);
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			// var value = event.options[event.selectedIndex].value;
			// console.log(value);
			// if (openDropdown.classList.contains("show")) {
			// 	openDropdown.classList.remove("show");
			// }
		}
	}
};
