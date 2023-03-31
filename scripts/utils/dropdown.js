// Close the dropdown menu if the user clicks outside of it
var dropdowns = document.getElementById("myDropdown");
var dropdownWrapper = document.querySelector(".dropdown");

// dropdownWrapper.onclick = async function (event) {
//   stop = false;
//   const { photos } = await getProducts();
//   if (!event.target.matches(".dropbtn")) {
//     output = dropdowns.value;
//     let newPhotos;
//     if (output) {
//       newPhotos = await photos.sort((a, b) => {
//         if (output === "title") {
//           return a[output] > b[output];
//         }
//         return a[output] < b[output];
//       });
//     }
//     displayData(newPhotos);

//   }
// };
dropdownWrapper.onclick = openDropdownAction;
dropdownWrapper.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    openDropdownAction(e);
  }
});
async function openDropdownAction(event) {
  stop = false;
  const { photos } = await getProducts();
  if (!event.target.matches(".dropbtn")) {
    let output = dropdowns.value;
    let newPhotos;
    if (output) {
      newPhotos = await photos.sort((a, b) => {
        if (output === "title") {
          return a[output] > b[output];
        }
        return a[output] < b[output];
      });
    }
    displayData(newPhotos);
  }
}
var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("dropdown");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.tabIndex = "0";
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    // 		/*for each option in the original select element,
    //     create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.tabIndex = "0";
    c.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
		        and the selected item:*/
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
    });
    c.addEventListener("keydown", function (e) {
      /* when an item is clicked, update the original select box,
              and the selected item: */
      if (e.code === "Enter") {
        let y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
      }
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    // this.classList.toggle("select-arrow-active");
  });
  a.addEventListener("keydown", function (e) {
    /* when the select box is clicked, close any other select boxes,
      and open/close the current select box: */
    if (e.code === "Enter") {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
    }
  });
}

function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    }
    //  else {
    // 	y[i].classList.remove("select-arrow-active");
    // }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
document.addEventListener("keydown", (e) => {
  if (e.code === "KeyE") {
    closeAllSelect();
  }
});
