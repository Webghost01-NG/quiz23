
// ===== QUESTIONS =====
const questions = [

{
  question: "What does HTML stand for?",
  options: [
    "Hyper Text Markup Language",
    "High Transfer Machine Language",
    "Hyperlinks Text Management Language",
    "Home Tool Markup Language"
  ],
  answer: 0
},

{
  question: "Which language styles web pages?",
  options: ["Python", "CSS", "C++", "SQL"],
  answer: 1
},

{
  question: "Which language adds interactivity to websites?",
  options: ["HTML", "CSS", "JavaScript", "PHP"],
  answer: 2
},

{
  question: "Which symbol is used for comments in JavaScript?",
  options: ["<!-- -->", "#", "//", "**"],
  answer: 2
},

{
  question: "Which company developed JavaScript?",
  options: ["Google", "Microsoft", "Netscape", "IBM"],
  answer: 2
},

// ---------- Programming ----------

{
  question: "What keyword declares a constant in JavaScript?",
  options: ["let", "var", "const", "define"],
  answer: 2
},

{
  question: "Which method prints to console?",
  options: ["print()", "echo()", "console.log()", "write()"],
  answer: 2
},

{
  question: "Which data type stores true/false?",
  options: ["String", "Boolean", "Number", "Object"],
  answer: 1
},

{
  question: "Which loop repeats while condition is true?",
  options: ["for", "while", "switch", "if"],
  answer: 1
},

{
  question: "What is 2 + '2' in JS?",
  options: ["4", "22", "Error", "0"],
  answer: 1
},

// ---------- Git ----------

{
  question: "Command to initialize Git?",
  options: ["git init", "git start", "git create", "git new"],
  answer: 0
},

{
  question: "Command to upload changes?",
  options: ["git push", "git send", "git commit", "git move"],
  answer: 0
},

{
  question: "Command to download repo?",
  options: ["git pull", "git clone", "git copy", "git fetchall"],
  answer: 1
},

{
  question: "Which branch is default?",
  options: ["main/master", "dev", "test", "prod"],
  answer: 0
},

{
  question: "Stage files command?",
  options: ["git add", "git stage", "git save", "git put"],
  answer: 0
},

// ---------- Web ----------

{
  question: "Which tag creates a link?",
  options: ["<link>", "<a>", "<href>", "<url>"],
  answer: 1
},

{
  question: "Which tag inserts image?",
  options: ["<pic>", "<image>", "<img>", "<photo>"],
  answer: 2
},

{
  question: "Local storage stores data in?",
  options: ["Server", "Browser", "Database", "RAM only"],
  answer: 1
},

{
  question: "JSON stands for?",
  options: [
    "Java Source Object Notation",
    "JavaScript Object Notation",
    "Java Standard Object Name",
    "None"
  ],
  answer: 1
},

{
  question: "Fetch API is used for?",
  options: ["Styling", "Animation", "HTTP requests", "Routing"],
  answer: 2
},

// ---------- Physics ----------

{
  question: "Unit of force?",
  options: ["Joule", "Newton", "Watt", "Pascal"],
  answer: 1
},

{
  question: "Speed of light is approximately?",
  options: ["3×10⁸ m/s", "3×10⁶ m/s", "300 m/s", "30 m/s"],
  answer: 0
},

{
  question: "F = ma is Newton’s?",
  options: ["1st law", "2nd law", "3rd law", "Gravity law"],
  answer: 1
},

{
  question: "SI unit of energy?",
  options: ["Watt", "Joule", "Volt", "Tesla"],
  answer: 1
},

{
  question: "Ohm’s law formula?",
  options: ["V=IR", "P=IV", "F=ma", "E=mc²"],
  answer: 0
},

// ---------- More mixed to reach 50 ----------

...Array.from({length:25}, (_,i)=>({
  question: `General knowledge question ${i+26}?`,
  options: ["Option A","Option B","Option C","Option D"],
  answer: 0
}))
];


// ===== SELECT ELEMENTS =====
const startBtn = document.querySelector(".start_btn");
const quizBox = document.querySelector(".quiz_box");
const queText = document.querySelector(".que_text");
const optionList = document.querySelector(".option_list");
const nextBtn = document.querySelector(".next_btn");
const timerText = document.querySelector(".timer_sec");
const resultBox = document.querySelector(".result_box");
const scoreText = document.querySelector(".score_text");


// ===== VARIABLES =====
let currentIndex = 0;
let score = 0;
let timer;
let timeValue = 15;


// ===== START QUIZ =====
startBtn.onclick = () => {
  quizBox.classList.add("active");
  startQuiz();
};


// ===== LOAD QUIZ =====
function startQuiz() {
  currentIndex = 0;
  score = 0;
  showQuestion();
  startTimer();
}


// ===== SHOW QUESTION =====
function showQuestion() {
  let q = questions[currentIndex];

  questionText.innerHTML = `<span>${q.question}</span>`;
  optionList.innerHTML = "";

  q.options.forEach((opt, i) => {
    let li = document.createElement("div");
    li.classList.add("option");
    li.innerText = opt;

    li.onclick = () => selectAnswer(i);

    optionList.appendChild(li);
  });
}


// ===== SELECT ANSWER =====
function selectAnswer(selectedIndex) {
  clearInterval(timer);

  let correct = questions[currentIndex].answer;
  let options = document.querySelectorAll(".option");

  if (selectedIndex === correct) {
    score++;
    options[selectedIndex].classList.add("correct");
  } else {
    options[selectedIndex].classList.add("wrong");
    options[correct].classList.add("correct");
  }

  options.forEach(opt => opt.style.pointerEvents = "none");

  nextBtn.style.display = "block";
}


// ===== NEXT BUTTON =====
nextBtn.onclick = () => {
  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
    startTimer();
    nextBtn.style.display = "none";
  } else {
    showResult();
  }
};


// ===== TIMER =====
function startTimer() {
  timeValue = 15;
  timerText.innerText = timeValue;

  timer = setInterval(() => {
    timeValue--;
    timerText.innerText = timeValue;

    if (timeValue <= 0) {
      clearInterval(timer);
      autoNext();
    }
  }, 1000);
}


// ===== AUTO NEXT WHEN TIME UP =====
function autoNext() {
  let correct = questions[currentIndex].answer;
  let options = document.querySelectorAll(".option");

  options[correct].classList.add("correct");

  options.forEach(opt => opt.style.pointerEvents = "none");

  nextBtn.style.display = "block";
}


// ===== SHOW RESULT =====
function showResult() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  scoreText.innerHTML =
    `You scored <b>${score}</b> out of <b>${questions.length}</b>`;
}