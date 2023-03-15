// DOM
const form = document.querySelector("#form");
const confirmationMsg = document.querySelector(".modal-success-confirmation");
const firstnameInput = document.getElementById("name");
const lastnameInput = document.getElementById("lastname");
const emailInput = document.getElementById("mail");
const msgInput = document.getElementById("description");

const errMsg1 = document.getElementById("errMsg1");
const errMsg2 = document.getElementById("errMsg2");
const errMsg3 = document.getElementById("errMsg3");
const errMsg4 = document.getElementById("errMsg4");
let clickedLocation = false;
//functions for checking the value of inputs
function inputValidation(type, value) {
  const value1 = value;
  switch (type) {
    case "nametype":
      if (value1 === null || value1.length < 2) return false;
      return true;
    case "mail":
      const regex = /^[\w-\.]+@([\w-]+\.)+[a-z\.]{2,6}$/;
      let mailvalue = emailInput.value;
      return regex.test(mailvalue);
    case "msgtype":
      if (value1 === null || value1.length < 10) return false;
      return true;
  }
}

//function for showing the error message when the value of input is bad
function errorMsg(input, msgForm, msg) {
  msgForm.textContent = msg;
  if (input) {
    input.style.border = "solid 1.8px red";
  }
}

//remove the error message when the value of input is good
function refresh(input, errMsgForm) {
  if (input) {
    input.style.border = "none";
  }
  errMsgForm.textContent = "";
}

// Action Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let successValidation = true;
  if (!inputValidation("nametype", firstnameInput.value)) {
    errorMsg(
      firstnameInput,
      errMsg1,
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
    successValidation = false;
  } else {
    refresh(firstnameInput, errMsg1);
  }

  if (!inputValidation("nametype", lastnameInput.value)) {
    errorMsg(
      lastnameInput,
      errMsg2,
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    successValidation = false;
  } else refresh(lastnameInput, errMsg2);

  if (!inputValidation("mail")) {
    errorMsg(emailInput, errMsg3, "Veuillez entrer mail");
    successValidation = false;
  } else refresh(emailInput, errMsg3);

  if (!inputValidation("msgtype", msgInput.value)) {
    errorMsg(
      msgInput,
      errMsg4,
      "Veuillez entrer 10 caractères ou plus pour le champ du message."
    );
    successValidation = false;
  } else refresh(msgInput, errMsg4);

  if (successValidation) {
    //     form.style.display = "none";
    //     confirmationMsg.style.display = "block";
    // empty all the fields of form
    //     e.target.map((input) => console.log(input, ": ", input.value));
    form.reset();
  }
});

// Disapear the error note when changing the input
firstnameInput.addEventListener("change", () => {
  if (inputValidation("nametype", firstnameInput.value))
    refresh(firstnameInput, errMsg1);
});

lastnameInput.addEventListener("change", () => {
  if (inputValidation("nametype", lastnameInput.value))
    refresh(lastnameInput, errMsg2);
});

emailInput.addEventListener("change", () => {
  if (inputValidation("mail")) refresh(emailInput, errMsg3);
});

msgInput.addEventListener("change", () => {
  if (inputValidation("mgstype", msgInput.value)) refresh(birthdate, errMsg4);
});
