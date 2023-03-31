// this function create a new photo in list of photos on photographer page
function photoFactory(data) {
  const { id, title, image, likes, video } = data;

  // declaration variable to containe the src of video or image
  const picture = `assets/photos/${image || video}`;

  // creation of photo article
  function getUserCardDOM() {
    const article = document.createElement("article");

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
      const source = document.createElement("source");
      source.setAttribute("src", picture);
      src.appendChild(source);
    }
    src.classList.add("img-photo");

    src.addEventListener("click", () => {
      displayPhotosModal(id);
    });

    const h2 = document.createElement("h2");
    h2.textContent = title;
    const description = document.createElement("p");
    description.textContent = likes;
    description.classList.add("likes");
    description.tabIndex = "0";
    const heartIcon = document.createElement("i");

    heartIcon.setAttribute("class", "fa fa-heart fa-lg");
    heartIcon.classList.add("icon-style");
    const likesWrap = document.createElement("div");
    likesWrap.appendChild(description);
    likesWrap.classList.add("likes-wrap");
    likesWrap.appendChild(heartIcon);
    const link = document.createElement("div");
    link.classList.add("img");
    link.appendChild(src);
    link.tabIndex = "0";

    link.addEventListener("keydown", (e) => {
      const keyCode = e.code;
      if (keyCode === "Enter") {
        displayPhotosModal(id);
      }
    });
    const wrapText = document.createElement("div");
    wrapText.classList.add("wrap-text");
    wrapText.appendChild(h2);
    wrapText.appendChild(likesWrap);
    article.appendChild(link);
    article.appendChild(wrapText);
    return article;
  }
  return { title, picture, getUserCardDOM };
}
