const quizData = [
  {
    question: "What is the capital of telangana?",
    options: ["vizag", "hyderabad", "delhi", "kerala"],
    answer: "hyderabad"
  },
  {
    question: " what is our national animal?",
    options: ["tiger", "lion", "elephant", "fox"],
    answer: "tiger"
  },
  {
    question: "What is 10 + 5?",
    options: ["13", "15", "17", "20"],
    answer: "15"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart");

function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = "";

  currentQuiz.options.forEach(option => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="answer" value="${option}" />
      ${option}
    `;
    optionsEl.appendChild(label);
  });
}

function getSelectedAnswer() {
  const answers = document.getElementsByName("answer");
  for (let answer of answers) {
    if (answer.checked) return answer.value;
  }
  return null;
}

submitBtn.addEventListener("click", () => {
  const selected = getSelectedAnswer();
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  if (selected === quizData[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    quizEnd();
  }
});

function quizEnd() {
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  submitBtn.style.display = "none";
  resultEl.textContent = `You scored ${score} out of ${quizData.length}`;
  restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  questionEl.style.display = "block";
  optionsEl.style.display = "block";
  submitBtn.style.display = "inline-block";
  resultEl.textContent = "";
  restartBtn.style.display = "none";
  loadQuestion();
});

loadQuestion();
