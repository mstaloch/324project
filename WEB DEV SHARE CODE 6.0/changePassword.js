
"use strict";

var inputBtn = document.getElementById('testChangePass');

var isPassChanged = false;

inputBtn.addEventListener('click', () => {
  let usernameField = document.getElementById('inputExistUser');
  let oldPasswordField = document.getElementById('inputExistPass');
  let newPasswordField = document.getElementById('inputNewPass');
  let confirmPasswordField = document.getElementById('confirmNewPass');

  let inputUsername = usernameField.value;
  let inputOldPassword = oldPasswordField.value;
  let inputNewPassword = newPasswordField.value;
  let inputConfirmNewPassword = confirmPasswordField.value;

  fetch('http://localhost:3000/login')
  .then(response => response.json())
  .then(response => {
    var credential = [];
    credential = response;
    let numCredentials = credential.length;
    if (inputNewPassword === inputConfirmNewPassword) {
      for (let i = 0; i < numCredentials; i++) {
        if (inputUsername === credential[i]["Username"] &&
              inputOldPassword === credential[i]["Password"]
              && (!isPassChanged) ) {
            let newCredential = {};
            newCredential.Username = inputUsername;
            newCredential.Password = inputNewPassword;
            updateBackendPassword(newCredential,(i+1));
            isPassChanged = true;
            var successAppend = document.getElementById("newPassSuccess");
            successAppend.innerHTML = "Password Successfully Changed";

            var removeInput = document.getElementById("changePassword");
            removeInput.innerHTML = "<br>";
        }
      }
      if (!isPassChanged) {
        alert("Unknown or Incorrect Username &/or Password");
        document.getElementById('changePasswordForm').reset();
      }
    }
    else {
      alert("Failed to Confirm New Password");
      document.getElementById('changePasswordForm').reset();
    }
  })
} );

function updateBackendPassword(inputUpdatedCredential, id) {
  fetch(`http://localhost:3000/login/${id}`, {
      method: "PATCH",
      body: JSON.stringify(inputUpdatedCredential),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(console.log("I've finished fetching & password changing"))
}
