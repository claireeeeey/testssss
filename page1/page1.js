const navToggle = document.querySelector('.nav_toggle');

//add a click listener to the navigation bar to open the menu
navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

//create the quiz and store it in an array, including the question prefixs, questions, answer options, correct answers, and the answer feedbacks
let questions = [
  {
    numb: 1,
    question: "What does \"B\" mean in the graphite scale?",
    answer: "c. Soft lead",
    options: [
    "a. Brown color",
    "b. Hard pencil",
    "c. Soft lead"
    ],
    correctoutput: "Correct! Good job!",
    wrongoutput: "Incorrect. \"B\" stands for \"lack\", indicating a softer lead, and is darker. Answer c is the correct answer."
  },
  {
    numb: 2,
    question: "Which of the following can draw the lighest line?",
    answer: "b. 9H",
    options: [
    "a. 7H",
    "b. 9H",
    "c. 4B"
    ],
    correctoutput: "Correct! Good job!",
    wrongoutput: "Incorrect. \"H\" indicates the hard pencils which can draw lighter, and larger number means higher degree of the pencil intensity. Therefore, the correct answer is 9H."
  }
]

//set question counter
let que_count = 0;

const que_text = document.querySelector(".que_text");
const option_list = document.querySelector(".option_list");

//create a function to push the quiz array into html
function showQuestions (index) {
  //create the span and div tag for question and options and pass the quiz array
  let que_tag = "<span>" + questions[index].numb + ". " + questions[index].question + "</span>";
  let option_tag = '<div class="option">' + questions[index].options[0] + '</div>'
  + '<div class="option">' + questions[index].options[1] + '</div>'
  + '<div class="option">' + questions[index].options[2] + '</div>';
 
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  
  const option = option_list.querySelectorAll (".option");
  
  //for every answer options, set onclick attribute
  for(i = 0; i < option.length; i++) {
    option[i].setAttribute ("onclick", "optionSelected(this)");
  }
}

const output = document.querySelector(".output");

//create a function to set the correct and wrong answers when option is selected
function optionSelected(answer) {
  //get correct answers, wrong answers, and all options
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let alloptions = option_list.children.length;
  //create the div tag for answer feedback when option is selected
  let output_text = '<div class="output">' + questions[que_count].correctoutput + '</div>';
  let wrongoutput_text = '<div class="output">' + questions[que_count].wrongoutput + '</div>';

  // if selected options is equal to the correct answer, add one score to the userScore, add a correct effect that the background will be green, and print a correct answer feedback
  if (userAns == correctAns) {
    answer.classList.add("correct");
    console.log("Correct Answer");
    output.innerHTML = output_text;
  // if selected answer is not equal to the correct answer, add a wrong effect that the background will be red, and print a wrong answer feedback
  }else{
    answer.classList.add("incorrect");
    console.log("Wrong Answer");
    output.innerHTML = wrongoutput_text;
    
    //once the option is selected, the correct answer with green background will show up
    for (i = 0; i < alloptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute ("class", "option correct");
      }
    }
  }

  //once an option is selected then other options are unable to be selected
  for (i = 0; i < alloptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
}

//run the whole quiz function
showQuestions(0);

const btn = document.querySelector(".btn");
const previous_btn = document.querySelector(".previous_btn");
const next_btn = document.querySelector(".next_btn");

//once the next button is clicked, the next question will show up and then hide the next button
next_btn.onclick = () => {
  if(que_count < questions.length - 1) {
    que_count++;
    showQuestions(que_count);
    next_btn.style.display = 'none';
  }
}

//hide the previous button first
previous_btn.style.display = 'none';
next_btn.addEventListener('click', showBtn); 

//if the next button is clicked, show the previous button and hide the answer feedback
function showBtn(e) { 
 previous_btn.style.display = 'inline'; 
 e.preventDefault(); 
 output.style.display = 'none';
}

//once the previous button is clicked, show the previous question
previous_btn.onclick = () => {
  if (que_count > 0) {
    que_count = que_count - 1;
    showQuestions(que_count);
    //hide the previous button and the answer feedback, show the next button
    previous_btn.style.display = 'none';
    next_btn.style.display = 'inline'; 
    output.style.display = 'none';
  }
}

option_list.addEventListener('click', show); 

//if the option is selected, show the answer feedback
function show() {
  output.style.display = 'inline';
}
