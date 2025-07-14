let currScore = document.querySelector("#current");
let highScore = document.querySelector("#highest");
let boxes = document.querySelectorAll(".box");


let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];


let score = 0;
let hiscore = 0;
let started = false;


document.addEventListener("keydown", () => {
  if (!started) {
    nextSequence();
    started = true;
  }
});


boxes.forEach((box) => {
  box.addEventListener("click", function () {

    let userChosenColor = this.classList[0]; 
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});


const nextSequence = () => {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  animateFlash(randomChosenColor);

  document.querySelector(".center").innerText = "Level " + gamePattern.length;
};


const checkAnswer = (currLevel) => {
  if (userClickedPattern[currLevel] === gamePattern[currLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      score++;
      if (score > hiscore) {
        hiscore = score;
      }
      updateScore();
      setTimeout(() => nextSequence(), 1000);
    }
  } 
  else {
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 200);
    document.querySelector(".center").innerText = "Game Over! Press any key to restart";
    startOver();
  }
};


const updateScore = () => {
  currScore.innerText = `Score: ${score}`;
  highScore.innerText = `Highest Score: ${hiscore}`;
};


const animateFlash = (color) => {
  let flash = document.querySelector("." + color);
  flash.classList.add("flash");
  setTimeout(() => flash.classList.remove("flash"), 200);
};


const animatePress = (color) => {
  let box = document.querySelector("." + color);  
  box.classList.add("pressed");
  setTimeout(() => box.classList.remove("pressed"), 100);
};


const startOver = () => {
  score = 0;
  gamePattern = [];
  started = false;
  updateScore();
};
