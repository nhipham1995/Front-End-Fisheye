const modalPhotos = document.getElementById("list-photo-modal");
const contentSection = document.querySelector(".photographer-section");
const stickyNote = document.querySelector(".sticky-note");
const bodyPart = document.querySelector("body");
const rightIcon = document.createElement("i");
const leftIcon = document.createElement("i");
const wrapper = document.createElement("div");

let crtPtoIdx;
let open = true;
function displayPhotosModal(idPhoto) {
  //the current photo
  const currentPhoto = photosLibrary.filter((photo) => photo.id === idPhoto);
  //find index of current photo in photos array
  crtPtoIdx = photosLibrary.findIndex((photo) => photo.id === idPhoto);
  open = true;
  modalPhotos.style.display = "block";
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
  stickyNote.style.display = "block";
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
  } else {
    src = document.createElement("video");
    src.autoplay = false;
    src.controls = true;
    var source = document.createElement("source");
    source.setAttribute("src", picture);
    src.appendChild(source);
  }
  src.alt = title;
  src.classList.add("img-photo-modal");
  h1.textContent = title;
  h1.classList.add("h1-photo-modal");
  modalPhotos.appendChild(wrapper);
  wrapper.appendChild(article);
  article.appendChild(src);
  article.appendChild(h1);
}

open &&
  rightIcon.addEventListener("click", () => {
    refreshModal();
    crtPtoIdx += 1;
    photoItemModalFactory(photosLibrary[crtPtoIdx]);
    rightIconCheck();
  });
open &&
  leftIcon.addEventListener("click", () => {
    refreshModal();
    crtPtoIdx -= 1;
    photoItemModalFactory(photosLibrary[crtPtoIdx]);
    leftIconCheck();
  });
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
