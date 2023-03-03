function photoFactory(data) {
  const { id, title, image, price, date, likes, video } = data;

  const picture = `assets/photos/${image ? image : video}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
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
    src.classList.add("img-photo");
    src.addEventListener("click", () => {
      displayPhotosModal(id);
    });
    const h2 = document.createElement("h2");
    h2.textContent = title;
    const description = document.createElement("p");
    description.textContent = likes;
    description.classList.add("likes");
    const heartIcon = document.createElement("i");

    heartIcon.setAttribute("class", "fa fa-heart fa-lg");
    heartIcon.classList.add("icon-style");
    const likesWrap = document.createElement("div");
    likesWrap.appendChild(description);
    likesWrap.classList.add("likes-wrap");
    likesWrap.appendChild(heartIcon);
    const link = document.createElement("div");
    link.classList.add("img");
    // link.href = "#";
    // link.title = title;
    link.appendChild(src);
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
