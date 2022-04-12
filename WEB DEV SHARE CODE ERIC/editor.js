"use strict";

var selectedRow = null;

function initialRows() {
  fetch("./asset/teamdata.json")
  .then(response => {
     return response.json();
  })
  .then(response => {

    var numInitialRows = response.length;

    var formData = {};

    for (let i = 0; i < numInitialRows; i++) {
      formData["Team"] = response[i]["Team"];
      formData["PlayerName"] = response[i]["Player Name"];
      formData["Position"] = response[i]["Position"];
      formData["MatchesPlayed"] = response[i]["Matches Played"];
      formData["SeasonGoals"] = response[i]["Season Goals"];
      var table = document.getElementById("articleList").getElementsByTagName("tbody")[0];
      var newRow = table.insertRow(table.length);
      var cell1 = newRow.insertCell(0);
      cell1.innerHTML = formData.Team;
      var cell2 = newRow.insertCell(1);
      cell2.innerHTML = formData.PlayerName;
      var cell3 = newRow.insertCell(2);
      cell3.innerHTML = formData.Position;
      var cell4 = newRow.insertCell(3);
      cell4.innerHTML = formData.MatchesPlayed;
      var cell5 = newRow.insertCell(4);
      cell5.innerHTML = formData.SeasonGoals;
      var cell6 = newRow.insertCell(5);
      cell6.classList.add("AvgGoals");
      var cell7 = newRow.insertCell(6);
      cell7.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                         <a onClick="onDelete(this)">Delete</a>`;
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
    formData["Team"] = document.getElementById("Team").value;
    formData["PlayerName"] = document.getElementById("Player Name").value;
    formData["Position"] = document.getElementById("Position").value;
    formData["MatchesPlayed"] = document.getElementById("Matches Played").value;
    formData["SeasonGoals"] = document.getElementById("Season Goals").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("articleList").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.Team;
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
    var selectedRow = td.parentElement.parentElement;
    document.getElementById("Team").value = selectedRow.cells[0].innerHTML;
    document.getElementById("Player Name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("Position").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Matches Played").value = selectedRow.cells[3].innerHTML;
    document.getElementById("Season Goals").value = selectedRow.cells[4].innerHTML;
    document.getElementById("articleList").deleteRow(selectedRow.rowIndex);
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.Team;
    selectedRow.cells[1].innerHTML = formData.PlayerName;
    selectedRow.cells[2].innerHTML = formData.Position;
    selectedRow.cells[3].innerHTML = formData.MatchesPlayed;
    selectedRow.cells[4].innerHTML = formData.SeasonGoals;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this article?')) {
        let row = td.parentElement.parentElement;
        document.getElementById("articleList").deleteRow(row.rowIndex);
        resetForm();
    }
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

function onCalc() {
  var tableBody = document.getElementById("articleList").getElementsByTagName("tbody");
  var totalRows = tableBody[0].rows.length;
  for (let i = 0; i < totalRows; i++){
    var selectedMatches = tableBody[0].rows[i].cells[3].innerHTML;
    var selectedGoals = tableBody[0].rows[i].cells[4].innerHTML;
    var calculatedAvg = (selectedGoals / selectedMatches).toFixed(2);
    tableBody[0].rows[i].cells[5].innerHTML = calculatedAvg;
  }
}
