const mainSection = document.querySelector(".photographer-section");
const headerPart = document.querySelector(".photograph-header");
const mainPart = document.querySelector(".product");
const photographerName = document.querySelector(".photographer-name");
const contactFormClose = document.querySelector(".contact-modal-close");
const modal = document.getElementById("contact_modal");

function displayModal() {
  mainSection.ariaHidden = "true";

  modal.ariaHidden = "false";
  modal.style.display = "flex";

  console.log(currentPhotographer);

  bodyPart.classList.add("no-scroll");
  photographerName.textContent = currentPhotographer.name;
  contactFormClose.focus();
}

function closeModal() {
  modal.style.display = "none";
  modal.ariaHidden = "true";

  mainSection.ariaHidden = "false";
  bodyPart.classList.remove("no-scroll");

  // mainPart.style.display = "block";
  // headerPart.style.display = "block";
  // stickyNote.style.display = "block";
}

document.addEventListener("keydown", (e) => {
  const keyCode = e.code;
  if (modal.ariaHidden == "false" && keyCode === "Escape") {
    closeModal();
  }
  if (modalPhotos.ariaHidden == "false" && keyCode === "Escape") {
    closePhotosModal();
    refreshModal();
  }
});
