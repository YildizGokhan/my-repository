const guessBtn = document.querySelector(".guessBtn");
const difficulty = document.querySelector(".difficulty");
const guessArea = document.querySelector(".guessArea");
const guessInput = document.querySelector("#guessInput");
const explanation = document.querySelector(".explanation");
const again = document.querySelector(".again");
const score = document.querySelector(".score");
const topScore = document.querySelector(".topScore");
const body = document.querySelector(".body");
let live = document.querySelector(".live");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const guessHistory = [];
let liveValue = parseInt(live.value);
let hak = 10;
let x = localStorage.getItem("mytime", 0);
let randomNumber;

document.querySelector(".again").addEventListener("click", () => {
  guessArea.style.display = "none";
  difficulty.style.display = "flex";
  guessInput.value = "";
  hak = 10;
  live.textContent = hak;
  body.style.backgroundColor = "#212121";
  location.reload(false)
});




document.querySelector("#easy").addEventListener("click", () => {
  const selectMode = document.querySelector(".select-mode");
  const difficulty = document.querySelector(".difficulty");
  difficulty.style.display = "none";
  guessArea.style.display = "flex";
  explanation.textContent = "Please enter a value between 1 and 20.";
  explanation.style.fontSize = "2rem";
  live.textContent = 10;
  newRandomNumber(20);
  guessBtn.addEventListener("click", () => {
    compare(20);
  });
});

document.querySelector("#normal").addEventListener("click", () => {
  const selectMode = document.querySelector(".select-mode");
  const difficulty = document.querySelector(".difficulty");
  difficulty.style.display = "none";
  guessArea.style.display = "flex";
  explanation.textContent = "Please enter a value between 1 and 50.";
  explanation.style.fontSize = "2rem";
  live.textContent = 10;
  newRandomNumber(50);
  guessBtn.addEventListener("click", () => {
    compare(50);
  });
});

document.querySelector("#hard").addEventListener("click", () => {
  const selectMode = document.querySelector(".select-mode");
  const difficulty = document.querySelector(".difficulty");
  difficulty.style.display = "none";
  guessArea.style.display = "flex";
  explanation.textContent = "Please enter a value between 1 and 100.";
  explanation.style.fontSize = "2rem";
  live.textContent = 10;
  newRandomNumber(100);
  guessBtn.addEventListener("click", () => {
    compare(100);
  });
});

function newRandomNumber(aralik) {
  randomNumber = Math.ceil(Math.random() * aralik);
}

function compare(aralik) {
  let userGuess = parseInt(guessInput.value);
  console.log(randomNumber);
  if (hak > 1 && hak <= 10) {
    if (isNaN(userGuess) || userGuess < 1 || userGuess > aralik) {
      explanation.textContent = `Please enter a valid number between 1 - ${aralik}`;
    } else if (guessHistory.includes(userGuess)) {
      explanation.textContent = "You've already guessed that number. Try a different one.";
    } else if (userGuess < randomNumber) {
      explanation.textContent = "Please increase the number.";
      hak -= 1;
      live.textContent = hak;
      guessHistory.push(userGuess);
    } else if (userGuess > randomNumber) {
      explanation.textContent = "Please decrease the number.";
      hak -= 1;
      live.textContent = hak;
      guessHistory.push(userGuess);
    } else {
      explanation.textContent = "Congratulations, you guessed it!";
      score.textContent = hak;
      body.style.backgroundColor = "green";
      correctSound.play();

      if (x > hak) {
        localStorage.setItem("totalScore", hak);
        console.log(x);
      }
    }
  } else {
    explanation.textContent = "Please try again.";
    body.style.backgroundColor = "red";
    wrongSound.play();
  }
  return aralik
}

guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); 
    guessBtn.click();
  }
});