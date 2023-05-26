var startButton = document.getElementById("start");
var submitButton = document.getElementById("submit");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById('choices');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
var timerEl = document.getElementById('time');
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;



// Start Quiz
function startQuiz() {
    var startPageEl = document.getElementById('start-page');
    startPageEl.setAttribute('class', 'hide');
    questionsEl.classList.remove('hide');
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    getQuestion();
};

// Display questions
function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = '';
    console.log(currentQuestion)
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);

        choiceNode.textContent = i + 1 + '. ' + choice;

        choicesEl.appendChild(choiceNode);
    }
};

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Question click
function questionClick(event) {
    var buttonEl = event.target;

    if (!buttonEl.matches('.choice')) {
        return;
    }

    if (buttonEl. value !== questions[currentQuestionIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }

    timerEl.textContent = time;

    feedbackEl.textContent = 'Wrong!';
    } else {
        feedbackEl.textContent = 'Correct!';
    }
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
      feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);
  
    currentQuestionIndex++;

    if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
      } else {
        getQuestion();
      }    
}

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById('end-page');
    endScreenEl.removeAttribute('class');
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
    questionsEl.setAttribute('class', 'hide');
  }
  
  function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
  }
  
  
// View high scores 
function saveHighscore() {
    var initials = initialsEl.value.trim();
    if (initials !== '') {
      var highscores =
        JSON.parse(window.localStorage.getItem('highscores')) || [];

      var newScore = {
        score: time,
        initials: initials,
      };
  
      highscores.push(newScore);
      window.localStorage.setItem('highscores', JSON.stringify(highscores));
  
      window.location.href = 'highscores.html';
    }
  }
 
  function checkForEnter(event) {
    if (event.key === 'Enter') {
      saveHighscore();
    }
  }
  
  
  submitButton.onclick = saveHighscore;

  startButton.onclick = startQuiz;
  
  choicesEl.onclick = questionClick;
  
  initialsEl.onkeyup = checkForEnter;
  
