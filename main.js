// 1. QUIZ FUNCTION //////////////////////////////////////////////////

// Questions
const questions = [
  {
    question: "What's the right way to spell it?",
    answer1: "a maze on",
    answer1Total: "1",
    answer2: "Amazone",
    answer2Total: "2",
    answer3: "amaze zone",
    answer3Total: "3",
    answer4: "Alibaba",
    answer4Total: "4"
  },

  {
    question: "What's George Clooney’s secret talent?",
    answer1: "Coffee",
    answer1Total: "1",
    answer2: "Charcoal drawing",
    answer2Total: "2",
    answer3: "Clooney having coffee in Como",
    answer3Total: "3",
    answer4: "Espresso",
    answer4Total: "4"
  },

  {
    question: "What book is “Apocalypse Now” based on?",
    answer1: "The Nibelungs",
    answer1Total: "1",
    answer2: "The Horror? Twilight: Eclipse… wait: Dracula?",
    answer2Total: "2",
    answer3: "Two and a Half Men",
    answer3Total: "3",
    answer4: "A Streetcar Named Desire",
    answer4Total: "4"
  },

  {
    question: "Red or blue pill?",
    answer1: "Jagged Little Pill",
    answer1Total: "1",
    answer2: "Both",
    answer2Total: "2",
    answer3: "I’m still in the Matrix?",
    answer3Total: "3",
    answer4: "I’m still in the Matrix?",
    answer4Total: "4"
  },

  {
    question: "What`s Agent Cooper’s passion?",
    answer1: "Coffee",
    answer1Total: "1",
    answer2: "Transcendental meditation",
    answer2Total: "2",
    answer3: "George Clooney",
    answer3Total: "3",
    answer4: "Espresso",
    answer4Total: "4"
  },

  {
    question: "What does the name Keanu mean?",
    answer1: "Sad Panda",
    answer1Total: "1",
    answer2: "The Lion King",
    answer2Total: "2",
    answer3: "Gorillas in the Mist",
    answer3Total: "3",
    answer4: "Actor eats sandwich",
    answer4Total: "4"
  },

  {
    question: "What’s the weather like where you are today?",
    answer1: "App says no",
    answer1Total: "1",
    answer2: "Foggy",
    answer2Total: "2",
    answer3: "Mist (with gorillas)",
    answer3Total: "3",
    answer4: "Napalm in the morning",
    answer4Total: "4"
  },

  {
    question: "Do you want to know your totem animal?",
    answer1: "Yes",
    answer1Total: "1",
    answer2: "No",
    answer2Total: "2",
    answer3: "Only if it’s a sad panda",
    answer3Total: "3",
    answer4: "Espresso",
    answer4Total: "4"
  },

  {
    question: "What's Jean Baudrillard famous for?",
    answer1: "Post-structural pedophilia",
    answer1Total: "1",
    answer2: "Post-modern memes",
    answer2Total: "2",
    answer3: "Post-dramatic Disneyland",
    answer3Total: "3",
    answer4: "The Matrix",
    answer4Total: "4"
  },

  {
    question:
      "Final question: Imagine a jungle. What is it like? Do you go inside or not? Imagine waters. What is it? A river? A lake? Do you go inside or not? Imagine a wall. How tall is it? What do you do? Sit on it, look at it, climb over it?",
    answer1: "Lake Como",
    answer1Total: "1",
    answer2: "Save the pandas",
    answer2Total: "2",
    answer3: "Can I open my eyes again?",
    answer3Total: "3",
    answer4: "Espresso",
    answer4Total: "4"
  }
];

let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions = questions.length;

const container = document.querySelector(".quiz-container");
const questionEl = document.querySelector(".question");
const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");
const nextButton = document.querySelector(".next");
const previousButton = document.querySelector(".previous");
const restartButton = document.querySelector(".restart");
const result = document.querySelector(".result");

//Function to generate question
function generateQuestions(index) {
  //Select each question by passing it a particular index
  const question = questions[index];
  const option1Total = questions[index].answer1Total;
  const option2Total = questions[index].answer2Total;
  const option3Total = questions[index].answer3Total;
  const option4Total = questions[index].answer4Total;

  //Populate html elements
  questionEl.innerHTML = `${index + 1}. ${question.question}`;
  option1.setAttribute("data-total", `${option1Total}`);
  option2.setAttribute("data-total", `${option2Total}`);
  option3.setAttribute("data-total", `${option3Total}`);
  option4.setAttribute("data-total", `${option4Total}`);
  option1.innerHTML = `${question.answer1}`;
  option2.innerHTML = `${question.answer2}`;
  option3.innerHTML = `${question.answer3}`;
  option4.innerHTML = `${question.answer4}`;
}

function loadNextQuestion() {
  const selectedOption = document.querySelector('input[type="radio"]:checked');
  //Check if there is a radio input checked
  if (!selectedOption) {
    alert("Please select your answer.");
    return;
  }
  //Get value of selected radio
  const answerScore = Number(
    selectedOption.nextElementSibling.getAttribute("data-total")
  );

  //Add the answer score to the score array
  score.push(answerScore);

  selectedAnswersData.push();

  const totalScore = score.reduce((total, currentNum) => total + currentNum);

  //Incement the current question number ( to be used as the index for each array)
  currentQuestion++;

  //Once finished clear checked
  selectedOption.checked = false;
  //If quiz is on the final question
  if (currentQuestion == totalQuestions - 1) {
    nextButton.textContent = "Finish";
  }
  //If the quiz is finished then we hide the questions container and show the results
  if (currentQuestion == totalQuestions) {
    container.style.display = "none";
    result.innerHTML = `<h1 class="final-score">Your score: ${totalScore}</h1>
         <div class="summary">
            <p>I wake up. </br>
            I’m not sure if the wolf tricked me with that test.</br> 
            Feels like he stole everything that makes me me 
            and put me in his mysterious forest</br> 
            reselling my story to other people 
            who are stupid enough to have themselves talked into a personality test by a wolf or:</br> 
            a memory dealer.
            </p>
        </div>
        <button id="generate-ram-button"><a href="./pages/ram.html">Generate RAM</a></button>
        <button class="restart" id="generate-ram-button">Restart Quiz</button>`;
    return;
  }
  generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
  //Decrement quentions index
  currentQuestion--;
  //remove last array value;
  score.pop();
  //Generate the question
  generateQuestions(currentQuestion);
}

function restartQuiz(e) {
  if (e.target.matches("button")) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
  }
}

//Call Quiz functions
generateQuestions(currentQuestion);
nextButton.addEventListener("click", loadNextQuestion);
previousButton.addEventListener("click", loadPreviousQuestion);
result.addEventListener("click", restartQuiz);
//Call Ram function
randomize.addEventListener("click", haiku);
