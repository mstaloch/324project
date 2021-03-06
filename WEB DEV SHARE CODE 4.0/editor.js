"use strict";

var selectedRow = null;

var crudSelector = 0;

var backendFirstRowID = 0;

fetch("http://localhost:3000/players?TeamID=" + localStorage.getItem("TeamID"))
  .then(response => {
     return response.json();
  })
  .then(response => {
    backendFirstRowID = response[0].id;

  } )

  setTeamToDOM(localStorage.getItem("TeamID"));

// custom
  function setTeamToDOM(team) {
    var mainHeadingInDOM = document.getElementById('MainHeading');
    fetch('http://localhost:3000/teams?id=' + team)
    .then(response => {
      return response.json();
    })
    .then(response => {
      mainHeadingInDOM.innerHTML = "TeamStats" + ": " + response.TeamName;
    })
  }

//custom initialRows()
function initialRows() {
  fetch('http://localhost:3000/players?TeamID=' + localStorage.getItem("TeamID"))
  .then(response => {
     return response.json();
  })
  .then(response => {

    let numInitialRows = response.length;

    let formData = {};

    for (let i = 0; i < numInitialRows; i++) {
      formData["TeamID"] = response[i]["TeamID"];
      formData["PlayerName"] = response[i]["PlayerName"];
      formData["Position"] = response[i]["Position"];
      formData["MatchesPlayed"] = response[i]["MatchesPlayed"];
      formData["SeasonGoals"] = response[i]["SeasonGoals"];
      let table = document.getElementById("articleList").getElementsByTagName("tbody")[0];
      let newRow = table.insertRow(table.length);
      newRow.setAttribute('id', backendFirstRowID);
      let cell1 = newRow.insertCell(0);
      cell1.innerHTML = formData.TeamID;
      let cell2 = newRow.insertCell(1);
      cell2.innerHTML = formData.PlayerName;
      let cell3 = newRow.insertCell(2);
      cell3.innerHTML = formData.Position;
      let cell4 = newRow.insertCell(3);
      cell4.innerHTML = formData.MatchesPlayed;
      let cell5 = newRow.insertCell(4);
      cell5.innerHTML = formData.SeasonGoals;
      let cell6 = newRow.insertCell(5);
      cell6.classList.add("AvgGoals");
      let cell7 = newRow.insertCell(6);
      cell7.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                         <a onClick="onDelete(this)">Delete</a>`;
      backendFirstRowID++;
      }

  })
}

initialRows();

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null) {
            insertNewRecord(formData);
        }
        else {
            updateRecord(formData);
        }
    resetForm();
  }
}

function readFormData() {
    var formData = {};
    formData["TeamID"] = document.getElementById("Team").value;
    formData["PlayerName"] = document.getElementById("Player Name").value;
    formData["Position"] = document.getElementById("Position").value;
    formData["MatchesPlayed"] = document.getElementById("Matches Played").value;
    formData["SeasonGoals"] = document.getElementById("Season Goals").value;
    if (crudSelector === 0)
      updateBackendCreate(formData);
    crudSelector = 0;
    return formData;
}

//custom updateBackend
function updateBackendCreate(formData) {
  fetch('http://localhost:3000/players', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
}

function insertNewRecord(data) {
    var table = document.getElementById("articleList").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);
    newRow.setAttribute('id', backendFirstRowID);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.TeamID;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.PlayerName;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.Position;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.MatchesPlayed;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.SeasonGoals;
    var cell6 = newRow.insertCell(5);
    cell6.classList.add("AvgGoals");
    var cell7 = newRow.insertCell(6);
    cell7.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("Team").value = "";
    document.getElementById("Player Name").value = "";
    document.getElementById("Position").value = "";
    document.getElementById("Matches Played").value = "";
    document.getElementById("Season Goals").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("Team").value = selectedRow.cells[0].innerHTML;
    document.getElementById("Player Name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("Position").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Matches Played").value = selectedRow.cells[3].innerHTML;
    document.getElementById("Season Goals").value = selectedRow.cells[4].innerHTML;
    crudSelector = 1;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.TeamID;
    selectedRow.cells[1].innerHTML = formData.PlayerName;
    selectedRow.cells[2].innerHTML = formData.Position;
    selectedRow.cells[3].innerHTML = formData.MatchesPlayed;
    selectedRow.cells[4].innerHTML = formData.SeasonGoals;
    let selectedID = selectedRow.id;
    updateBackendUpdate(formData, selectedID);
}

// custom updateBackendUpdate()
function updateBackendUpdate(formData, id) {
  fetch(`http://localhost:3000/players/${id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(console.log("I've finished fetching"))
}

function onDelete(td) {
    if (confirm('Are you sure to delete this article?')) {
        let row = td.parentElement.parentElement;
        let selectedID = row.id;
        document.getElementById("articleList").deleteRow(row.rowIndex);
        updateBackendDelete(selectedID);
        resetForm();
    }
}

// custom updateBackendDelete()
function updateBackendDelete(id) {
  fetch(`http://localhost:3000/players/${id}`, {
      method: "DELETE"
    })
    .then(response => {response.json()
      console.log("deletedBackendRow");
    })
}


function validate() {
    var isValid = true;
    if (document.getElementById("Team").value == "") {
        isValid = false;
        document.getElementById("TeamValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("TeamValidationError").classList.contains("hide"))
            document.getElementById("TeamValidationError").classList.add("hide");
    }
    return isValid;
}


//Custom onCalc()
function onCalcAvg() {
  var tableBody = document.getElementById("articleList").getElementsByTagName("tbody");
  var totalRows = tableBody[0].rows.length;
  for (let i = 0; i < totalRows; i++){
    var selectedMatches = tableBody[0].rows[i].cells[3].innerHTML;
    var selectedGoals = tableBody[0].rows[i].cells[4].innerHTML;
    var calculatedAvg = (selectedGoals / selectedMatches).toFixed(2);
    tableBody[0].rows[i].cells[5].innerHTML = calculatedAvg;
  }
}

// to calc totalGoals scored by entire team

var calcTotalBtn = document.getElementById("calcTotal");

calcTotalBtn.addEventListener("click", () => {
  var tableBody = document.getElementById("articleList").getElementsByTagName("tbody");
  var totalRows = tableBody[0].rows.length;
  var totalGoals = 0;
  var selectedGoals = 0;
  for (let i = 0; i < totalRows; i++){
    selectedGoals = parseInt(tableBody[0].rows[i].cells[4].innerHTML, 10);
    totalGoals = totalGoals + selectedGoals;
  }
  var insertDOMheading = document.getElementById("totalGoals");
  insertDOMheading.innerHTML = totalGoals;
})
