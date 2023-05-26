var highscoresEL = document.getElementById("highscores")



function getScores() {
    var scores = JSON.parse(localStorage.getItem("highscores"))
    for (var i = 0; i < scores.length; i++) {
        var li = document.createElement("li")
        li.textContent = scores[i].initials + " " + scores[i].score
        highscoresEL.append(li)
    }
}

getScores()