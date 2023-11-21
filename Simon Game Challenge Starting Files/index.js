let buttonColor = [];
let chosenRandomColor = [];
let level = 0;
let start = false;

const nextSequence = () => {
  level++;
  let randomNumber = Math.floor(Math.random() * 4);
  switch (randomNumber) {
    case 0:
      $(".green").addClass("pressed");
      buttonColor.push("green");
      setTimeout(() => {
        $(".green").removeClass("pressed");
      }, 100);
      break;
    case 1:
      $(".red").addClass("pressed");
      buttonColor.push("red");
      setTimeout(() => {
        $(".red").removeClass("pressed");
      }, 100);
      break;
    case 2:
      $(".blue").addClass("pressed");
      buttonColor.push("blue");
      setTimeout(() => {
        $(".blue").removeClass("pressed");
      }, 100);
      break;
    case 3:
      $(".yellow").addClass("pressed");
      buttonColor.push("yellow");
      setTimeout(() => {
        $(".yellow").removeClass("pressed");
      }, 100);
      break;
  }
  console.log(buttonColor);
};

const playSound = (key) => {
  switch (key) {
    case "green":
      let audio1 = new Audio("./sounds/green.mp3");
      audio1.play();
      break;
    case "red":
      let audio2 = new Audio("./sounds/red.mp3");
      audio2.play();
      break;
    case "blue":
      let audio3 = new Audio("./sounds/blue.mp3");
      audio3.play();
      break;
    case "yellow":
      let audio4 = new Audio("./sounds/yellow.mp3");
      audio4.play();
      break;
  }
};

const checkAnswer = (currentLevel) => {
  if (buttonColor[currentLevel] === chosenRandomColor[currentLevel]) {
    console.log("success");
    if (buttonColor.length === chosenRandomColor.length) {
      chosenRandomColor = [];
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    let audio5 = new Audio("./sounds/wrong.mp3");
    audio5.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
      $("h1").html("Game Over, Press Any Key to Restart");
    }, 200);
    startOver();
  }
};

const startOver = () => {
  $("h1").html("Press A Key to Start");
  level = 0;
  chosenRandomColor = [];
  buttonColor = [];
  start = false;
};

$(".btn").click(function (e) {
  $(this).addClass("pressed");
  playSound(e.target.id);
  chosenRandomColor.push(e.target.id);
  checkAnswer(chosenRandomColor.length - 1);
  $("h1").html(`level ${level}`);
  setTimeout(() => {
    $(this).removeClass("pressed");
  }, 100);
});

$(document).keypress(() => {
  if (!start) {
    $("h1").html(`level ${level}`);
    nextSequence();
    start = true;
  }
});
