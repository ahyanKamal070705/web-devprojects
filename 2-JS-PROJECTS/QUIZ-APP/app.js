 const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Cheetah", correct: false },
      { text: "Panda", correct: false },
    ],
  },
  {
    question: "Which is the smallest animal in the world?",
    answers: [
      { text: "Cat", correct: true },
      { text: "Blue Whale", correct: false },
      { text: "Cheetah", correct: false },
      { text: "Panda", correct: false },
    ],
  },
  {
    question: "Is Nala my favorite cat?",
    answers: [
      { text: "Yes", correct: true },
      { text: "Maybe", correct: false },
      { text: "Someone Else", correct: false },
      { text: "Nikal", correct: false },
    ],
  },
];

const quiz = document.getElementById("quiz");
const answerElement = document.getElementById("answer-Buttons");
const next = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  next.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetPrevQuestions();

  const existingQuestion = document.querySelector('#quiz h2');
  if (existingQuestion) {
    existingQuestion.remove();
  }

  const questionExtract = questions[currentQuestionIndex].question;
  const questionNumber = currentQuestionIndex + 1;
  const dynamicQuestion = document.createElement("h2");
  dynamicQuestion.innerHTML = questionNumber + ". " + questionExtract;
  quiz.insertBefore(dynamicQuestion, answerElement);

  showAnswer();
}

function showAnswer() {
  questions[currentQuestionIndex].answers.forEach((key) => {
    const button = document.createElement("button");
    button.innerHTML = key.text;
    button.classList.add("btn");
    answerElement.appendChild(button);

    button.dataset.correct = key.correct;

    button.addEventListener('click', selectAns);
  });
}

function selectAns(e) {
  const selectedButton = e.target;
  if (selectedButton.dataset.correct === 'true') {
    selectedButton.classList.add('correct');
    score++;
  } else {
    selectedButton.classList.add('incorrect');
  }

  document.querySelectorAll(".btn").forEach((oneButton) => {
    if (oneButton.dataset.correct === 'true') {
      oneButton.classList.add('correct');
    }
    oneButton.disabled = true;
  });
}

function resetPrevQuestions() {
  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
    next.innerHTML = "PLAY AGAIN";
  }
}

function showScore() {
    resetPrevQuestions();
    const existingQuestion = document.querySelector('#quiz h2');
     existingQuestion.innerHTML = ` your score is ${score} out of  ${questions.length}`;
     
 
}

function resetState() {
  // Reset any additional state or UI elements
}

next.addEventListener('click', () => {
  if (next.innerHTML === "PLAY AGAIN") {
    startQuiz();
  } else {
    handleNextButton();
  }
});
