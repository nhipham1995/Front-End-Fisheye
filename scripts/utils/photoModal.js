const modalPhotos = document.getElementById("list-photo-modal");
const contentSection = document.querySelector(".photographer-section");
const stickyNote = document.querySelector(".sticky-note");
const bodyPart = document.querySelector("body");
const rightIcon = document.createElement("i");
const leftIcon = document.createElement("i");
const wrapper = document.createElement("div");
const closeButton = document.querySelector(".fas.fa-times.fa-2x");

let crtPtoIdx;
let open = true;
function displayPhotosModal(idPhoto) {
  //the current photo
  const currentPhoto = photosLibrary.filter((photo) => photo.id === idPhoto);
  //find index of current photo in photos array
  crtPtoIdx = photosLibrary.findIndex((photo) => photo.id === idPhoto);
  open = true;
  modalPhotos.style.display = "block";
  modalPhotos.ariaHidden = "false";
  mainSection.ariaHidden = "true";

  contentSection.style.display = "none";
  stickyNote.style.display = "none";
  rightIcon.setAttribute("class", "fa fa-chevron-right fa-2x");
  leftIcon.setAttribute("class", "fa fa-chevron-left fa-2x");
  rightIcon.classList.add("right-icon-modal");
  leftIcon.classList.add("left-icon-modal");
  bodyPart.appendChild(rightIcon);
  bodyPart.appendChild(leftIcon);
  photoItemModalFactory(currentPhoto[0]);
}

function closePhotosModal() {
  open = false;
  modalPhotos.style.display = "none";
  contentSection.style.display = "block";
  stickyNote.style.display = "flex";
  modalPhotos.ariaHidden = "true";
  mainSection.ariaHidden = "false";
  rightIcon.style.display = "none";
  leftIcon.style.display = "none";
}

function photoItemModalFactory(photo) {
  rightIconCheck();
  leftIconCheck();
  console.log(photo);
  const { title, image, video } = photo;
  const picture = `assets/photos/${image ? image : video}`;
  const article = document.createElement("article");
  const h1 = document.createElement("h1");
  article.classList.add("photo-article-modal");
  let src;
  if (image) {
    src = document.createElement("img");
    src.setAttribute("src", picture);
    src.alt = title + " Image.";
  } else {
    src = document.createElement("video");
    src.alt = title + " Video.";
    src.autoplay = false;
    src.controls = true;
    var source = document.createElement("source");
    source.setAttribute("src", picture);
    src.appendChild(source);
  }
  // src.alt = title;
  src.classList.add("img-photo-modal");
  h1.textContent = title;
  h1.classList.add("h1-photo-modal");
  modalPhotos.appendChild(wrapper);
  wrapper.appendChild(article);
  article.appendChild(src);
  article.appendChild(h1);
}

open && rightIcon.addEventListener("click", nextPhotoAction);
open && leftIcon.addEventListener("click", previousPhotoAction);
open &&
  bodyPart.addEventListener("keydown", (event) => {
    if (event.key == "ArrowLeft") {
      if (crtPtoIdx === 0) return;
      previousPhotoAction();
    } else if (event.key == "ArrowRight") {
      if (crtPtoIdx === photosLibrary.length - 1) return;
      nextPhotoAction();
    }
  });
function nextPhotoAction() {
  refreshModal();
  crtPtoIdx += 1;
  photoItemModalFactory(photosLibrary[crtPtoIdx]);
  rightIconCheck();
}
function previousPhotoAction() {
  refreshModal();
  crtPtoIdx -= 1;
  photoItemModalFactory(photosLibrary[crtPtoIdx]);
  leftIconCheck();
}

function refreshModal() {
  let child = wrapper.firstChild;
  wrapper.removeChild(child);
}

function rightIconCheck() {
  if (crtPtoIdx === photosLibrary.length - 1) {
    return (rightIcon.style.display = "none");
  }
  rightIcon.style.display = "block";
}
function leftIconCheck() {
  if (crtPtoIdx === 0) {
    return (leftIcon.style.display = "none");
  }
  leftIcon.style.display = "block";
}

closeButton.addEventListener("click", () => {
  closePhotosModal();
  refreshModal();
});
