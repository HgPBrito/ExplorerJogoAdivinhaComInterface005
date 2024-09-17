const screenInitial = document.querySelector(".screen-initial");
const screenGame = document.querySelector(".screen-game");
const screenFinal = document.querySelector(".screen-final");

const buttonInitial = document.querySelector("#button-initial");
const buttonTry = document.querySelector("#button-try");
const buttonFinal = document.querySelector("#button-final");

const attemptsScoreButton = document.querySelector("#attempts-score-button");

const chosenNumber = Math.round((Math.random() * 10));
const attemptsScore = document.querySelector("#attempts-score");
const inputInitial = document.querySelector("#input-initial");

let attempts = 1;
console.log("chosenNumber: " + chosenNumber);

function handleInitial(event){
    event.preventDefault();

    const inputInitial = document.querySelector("#input-initial");

    if(Number(inputInitial.value) > 0){
        screenInitial.classList.add("hide");
        screenGame.classList.remove("hide");
    }
    attemptsScore.innerText = `${attempts}/${inputInitial.value}`; 
}

function handleTryClick(event) {
    event.preventDefault();
    
    const inputNumber = document.querySelector("#input-number");    
    
    if(Number(inputNumber.value) == chosenNumber){
        screenGame.classList.add("hide");
        screenFinal.classList.remove("hide");        

        if(attempts == 1) {
            screenFinal
            .querySelector("h2")
            .innerText = `Acertou em ${attempts} tentativa.`;    
        } else {
            screenFinal
            .querySelector("h2")
            .innerText = `Acertou em ${attempts} tentativas.`;        
        }
        inputInitial.value = "";
    }

    if(inputNumber.value != null && inputNumber.value != ""){

        inputNumber.value = "";    
        attempts ++;
    }

    attemptsScore.innerText = `${attempts}/${inputInitial.value}`; 

    if(attempts > Number(inputInitial.value)) {
        attemptsScore.style.color ="red";
        document.querySelector("#attempts-score-button").classList.remove("hide");
        document.querySelector("#hint").classList.remove("hide");
    }
    
}

function giveUp(event) {
    event.preventDefault();
    inputInitial.value = "";
    
    screenGame.classList.add("hide");
    screenFinal.classList.remove("hide");

    screenFinal.querySelector("h2").innerText = `Era o número ${chosenNumber}, mais sorte na próxima!`;
}

function handleResetClick() {
    inputInitial.value = "";
    screenFinal.classList.add("hide");
    screenInitial.classList.remove("hide");
    attempts = 1;
}




buttonInitial.addEventListener('click', handleInitial);
buttonTry.addEventListener('click', handleTryClick);
attemptsScoreButton.addEventListener('click', giveUp);

buttonFinal.addEventListener('click', handleResetClick);

document.addEventListener('keypress', (event)=> {

    if (event.key == 'Enter' && screenGame.classList.contains("hide") && screenInitial.classList.contains("hide")) {
        inputInitial.value = "";
        screenFinal.classList.add("hide");
        screenInitial.classList.remove("hide");
        attempts = 1;
    }
});