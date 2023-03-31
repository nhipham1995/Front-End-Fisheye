async function getPhotographers() {
  let response = await fetch("/data/photographers.json", {
    method: "GET",
    // type: "application/json",
    mode: "cors",
    header: {
      "Content-Type": "application/json",
    },
    cache: "default",
  }).then((res) => res.json());
  // et bien retourner le tableau photographers seulement une fois récupéré
  return response;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
