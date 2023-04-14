// this function creates a part of photographer in list of photographer on homepage
function photographerFactory(data) {
	const { name, portrait, city, country, tagline, price, id } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		const article = document.createElement("article");
		const img = document.createElement("img");
		img.setAttribute("src", picture);
		img.alt = name + " Image";
		const h2 = document.createElement("h2");
		h2.textContent = name;
		const h5 = document.createElement("h5");
		h5.textContent = city + ", " + country;
		const description = document.createElement("p");
		description.textContent = tagline;
		description.classList.add("tagline");
		const detail = document.createElement("p");
		detail.textContent = price + "€/jour";
		detail.classList.add("price");

		const link = document.createElement("a");
		link.href = "/photographer.html?&id=" + id;
		link.title = name;
		link.appendChild(img);
		link.appendChild(h2);
		article.appendChild(link);
		article.appendChild(h5);
		article.appendChild(description);
		article.appendChild(detail);
		return article;
	}
	return { name, picture, getUserCardDOM };
}
