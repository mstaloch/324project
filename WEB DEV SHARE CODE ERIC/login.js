"use strict";
/*
fetch("./credential/credential.json")
.then(response => {
   return response.json();
})
.then(response => {
*/

fetch('./credential/credential.json')
.then(response => response.json())
.then(response => {
  var credential = [];
  credential[0] = response;

  testSearch();

  function testSearch() {

    // input field for add note
    let usernameField = document.getElementById('usernameBox');
    let passwordField = document.getElementById('passwordBox');

    let loginButton = document.getElementById('testLogin');

    loginButton.addEventListener('click', () => {
     let inputUsername = usernameField.value;
     let inputPassword = passwordField.value;

     if (inputUsername === credential[0][0]["Username"] && inputPassword === credential[0][0]["Password"]){
       window.location.replace("editor.html");
     }
     else {
       alert("Invalid Username &/or Password");
     }
   })


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
