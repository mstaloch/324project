// Mac, Eric, Bob 2022 LUC

"use strict";

var credential = {};

var inputBtn = document.getElementById('testLogin');

var backendNumRows = 0;

var backendFirstRow = 0;

fetch("http://localhost:3000/teams")
  .then(response => {
     return response.json();
  })
  .then(response => {
    backendNumRows = response.length;
    backendFirstRow = response[0].id;

    var teamSelectDropDown = document.getElementById('TeamName');

    for (let i = 0; i < backendNumRows; i++) {
      teamSelectDropDown.innerHTML += "<option>" + response[i].TeamName + "</option>";
      teamSelectDropDown.getElementsByTagName("option")[i].value = response[i].id.toString();
    }
  } )

inputBtn.addEventListener('click', () => {
  let usernameField = document.getElementById('inputNewUsername');
  let passwordField = document.getElementById('inputNewPassword');
  let teamNameField = document.getElementById('TeamName');

  let inputUsername = usernameField.value;
  let inputPassword = passwordField.value;
  let inputTeamName = teamNameField.value;

  credential.Username = inputUsername;
  credential.Password = inputPassword;
  credential.TeamID = inputTeamName;

  if (credential.Username === "" || credential.Password === "") {
    alert("Cannot Have Blank Username &/or Password")
  }
  else {
    updateBackendNewUser(credential);
  }

function updateBackendNewUser(credential){
  console.log("fetch began")
  return fetch(`http://localhost:3000/login`, {
  method: "POST",
  body: JSON.stringify(credential),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
.then(res => {
  res.json();
  console.log("successful EDIT");
  var successAppend = document.getElementById("newUserSuccess");
  successAppend.innerHTML = "New User Account Successfully Added";

  var removeInput = document.getElementById("createNewUser");
  removeInput.innerHTML = "<br>";
})
}



});
