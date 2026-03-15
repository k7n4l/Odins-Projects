const buttons = document.querySelectorAll(".btn");
const playerSign = document.querySelector(".player-sign");
const compSign = document.querySelector(".comp-sign");
const statusMsg=document.getElementById("status-msg");
const statusH2=document.getElementById("status-h2");
const pscore = document.getElementById("player-score");
const cscore = document.getElementById("comp-score");
const endgameModal = document.getElementById("endgame-modal")
const overlay = document.getElementById("overlay")
const endgameMsg = document.getElementById("endgame-msg")
const restartBtn = document.getElementById("restart-btn")



const choices = ["ROCK","PAPER","SCISSORS"]
let roundWinner;
let playerScore=0, compScore=0;
const rules = {
    ROCK:"SCISSORS",
    PAPER:"ROCK",
    SCISSORS:"PAPER"
}

const signs = {
  ROCK: "✊",
  PAPER: "✋",
  SCISSORS: "✌"
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    handleClick(button.id.replace("-btn","").toUpperCase());
  })
})

function isGameOver() {
  return playerScore === 5 || compScore === 5
}

function updateSign(playerSelection, compSelection){
    playerSign.textContent = signs[playerSelection];
    compSign.textContent = signs[compSelection];
}


function playRound(playerSelection, compSelection){
  if(playerSelection===compSelection){
    roundWinner='tie';
  }
  else if(rules[playerSelection]===compSelection){
    roundWinner='player';
    playerScore++;
  }
  else{
    roundWinner='computer';
    compScore++
  }
  updateStatus(roundWinner,playerSelection,compSelection)
  updateScore(playerScore,compScore)
}

function updateScore(playerScore,compScore){
    pscore.textContent = `Player: ${playerScore}`;
    cscore.textContent = `Computer: ${compScore}`;
}


function updateStatus(roundWinner,playerSelection,compSelection){
    if(roundWinner==='tie'){
        statusH2.textContent="It's a tie!";
        statusMsg.textContent=`Both players chose ${playerSelection}`;
    }
    else if(roundWinner==='player'){
        statusH2.textContent="You win!";
        statusMsg.textContent=`${playerSelection} beats ${compSelection}`;
    }
    else{
        statusH2.textContent="Computer wins!";
        statusMsg.textContent=`${compSelection} beats ${playerSelection}`;
    }
}

function getComputerChoice(){
    return choices[Math.floor(Math.random()*3)] 
}

function openEndgameModal(){
  endgameModal.classList.add("active")
  overlay.classList.add("active")
}

function setFinalMessage(){

  if(playerScore > compScore){
    endgameMsg.textContent = "You Won The Game!"
  }

  else{
    endgameMsg.textContent = "Computer Won The Game!"
  }

}
restartBtn.addEventListener("click", restartGame)

function restartGame(){
  playerScore = 0
  compScore = 0

  statusH2.textContent = "Choose your move"
  statusMsg.textContent = "First to 5 wins"

  playerSign.textContent = "❔"
  compSign.textContent = "❔"

  updateScore(0,0)
  endgameModal.classList.remove("active")
  overlay.classList.remove("active")
}

function handleClick(playerSelection){
     if(isGameOver()) return;   //prevents further play if game is already over

    const compSelection = getComputerChoice();
    updateSign(playerSelection, compSelection);
    playRound(playerSelection, compSelection);

    if (isGameOver()) {
    openEndgameModal()
    setFinalMessage()
  }
}