// Mac, Eric, Bob 2022 LUC

"use strict";

var allPlayerData = {};

fetch('http://localhost:3000/players')
.then(response => {
  return response.json();
})
.then(response => {
    allPlayerData = response;
    showMaxScoreDashboard(returnMaxScore(allPlayerData));
})

function returnMaxScore(allPlayer) {
  var currPlayerScore;
  var maxScore = 0;
    /*
    allPlayer.forEach(currPlayer => {
      currPlayerScore = currPlayer["SeasonGoals"];
      if (currPlayerScore > maxScore)
        maxScore = currPlayerScore;
    });
    */
    var numRows = allPlayer.length;

    for (let i = 0; i < numRows; i++) {
      currPlayerScore = parseInt(allPlayer[i]["SeasonGoals"]);
      if (currPlayerScore > maxScore)
        maxScore = currPlayerScore;
    }
    return maxScore;
}

function showMaxScoreDashboard(max) {
    var currHighScorer = {};
    if (max === 0) {
      document.getElementById("highScore").innerHTML = "No Player Data in DB";
    }
    else {
      fetch('http://localhost:3000/players?SeasonGoals=' + max)
      .then(response => {
        return response.json();
      })
      .then(response => {
          response.forEach(currHighScorer => {
            document.getElementById("highScore").innerHTML += currHighScorer["PlayerName"] +
            " scored " + currHighScorer["SeasonGoals"] + " goals out of all teams.";
          });
      });
    }
  }


  fetch('http://localhost:3000/teams')
  .then(response => {
    return response.json();
  })
  .then(response => {
    var currTeam = {};
    response.forEach(currTeam => {
      document.getElementById("TeamNames").innerHTML +=
      "<th>" + currTeam["TeamName"] + "</th>";
    fetch('http://localhost:3000/players?TeamID=' + currTeam["id"])
    .then(response => {
      return response.json();
    })
    .then(response => {
      var maxScore = returnMaxScore(response);
      fetch('http://localhost:3000/players?TeamID=' + currTeam["id"] +
        "&SeasonGoals=" + maxScore)
      .then(response => {
        return response.json();
      })
      .then(response => {
        document.getElementById("TeamHighestScorers").innerHTML +=
        "<td>" + response[0]["PlayerName"] + "</td>";
      })
    })
  })
})
