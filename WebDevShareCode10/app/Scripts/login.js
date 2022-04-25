// Mac, Eric, Bob 2022 LUC

"use strict";

fetch('http://localhost:3000/login')
.then(response => response.json())
.then(response => {
  var credential = [];
  credential = response;

  testLogin();

  function testLogin() {

    // input field for add note
    let usernameField = document.getElementById('usernameBox');
    let passwordField = document.getElementById('passwordBox');

    let loginButton = document.getElementById('testLogin');

    loginButton.addEventListener('click', () => {
     let inputUsername = usernameField.value;
     let inputPassword = passwordField.value;

     let numCredentials = credential.length;

     let isLoginGood = false;

     for(let i = 0; i < numCredentials; i++) {
        if (credential[i]["Username"] === inputUsername)
        {
          if (credential[i]["Password"] === inputPassword) {
              localStorage.setItem("TeamID", credential[i]["TeamID"]);
              window.location.replace("editor.html");
              isLoginGood = true; // avoids the alert and form reset
          }
        }
      }
      if (!isLoginGood) {
        alert("Invalid Username &/or Password");
        document.getElementById('loginForm').reset();
      }
  } )


   passwordField.addEventListener('keypress', (e) => {
     // check key pressed by code - 13 - return
     if (e.keyCode === 13) {
       console.log('return key pressed...');
     }
   });

 };
})

/* does not work:
  window.addEventListener('keydown', function (e) {
      if (e.code === "13") {
        let inputUsername = usernameField.value;
        let inputPassword = passwordField.value;

        if (inputUsername === "TeamCoach" && inputPassword === "1234"){
          window.location.replace("editor.html");
        }
        else {
          alert("Invalid Username &/or Password");
        }
      }
  });
*/


/*
var credential = {};

var credentialsArray = [];

var inputBtn = document.getElementById('testLogin');

inputBtn.addEventListener('click', () => {
  let newUsernameField = document.getElementById('usernameBox');
  let newPasswordField = document.getElementById('passwordBox');

  let inputUsername = usernameField.value;
  let inputPassword = passwordField.value;

  credential.userName = inputUserName;
  credential.password = inputPassword;
  credentialsArray[0] = credential;
}
*/
