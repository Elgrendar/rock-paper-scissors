/*
0 rocks
1 paper
2 scissors
*/

/* Create all the elements of the DOM */
const menuTurns = document.getElementById('turns');
const turnsNumber = document.getElementById('turns__number');
const playButton = document.getElementById('start');
const play = document.getElementById('play');
const playCurrent = document.getElementById('play__current');
const playerSelection = document.getElementById('playerselection');
const computerSelection = document.getElementById('computerselection');
const score = document.getElementById('table__score');
const scorePlayer = document.getElementById('score--player');
const scoreComputer = document.getElementById('score--computer');
const playerOption = document.getElementById('optionplayer');
const computerOption = document.getElementById('optioncomputer')
const result = document.getElementById('result');
const resultText = document.getElementById('result--text');
const buttonReset = document.getElementById('reset');
let turns = 1;
let rest = 0;
let player = 0;
let computer = 0;
let jSelect;
let cSelect;
let cont = 0;
let id;
let p;

/* aplication logic */

const change = () => {
    if ((cont % 2) === 1) {
        computerSelection.src = "assets/paper.svg";
    } else if ((cont % 3) === 1) {
        computerSelection.src = "assets/rock.svg";
    } else {
        computerSelection.src = "assets/scissors.svg";
    }

    cont++;
    if (cont === 10) {
        cont = 0;
        clearInterval(id);
        p = Math.floor(Math.random() * (3 - 0)) + 0;
        //Draw the image of the computer run
        cSelect = p;
        switch (p) {
            case 0:
                computerSelection.src = "assets/rock.svg";
                break;
            case 1:
                computerSelection.src = "assets/paper.svg";
                break;
            case 2:
                computerSelection.src = "assets/scissors.svg";
                break;
        }
        calculateWinner();
    }
}

const reset = () => {
    //Reset all variables and show only start game
    cont = 0;
    turns = 1;
    rest = 0;
    player = 0;
    computer = 0;
    jSelect = null;
    cSelect = null;
    menuTurns.classList.remove('hide');
    score.classList.add('hide');
    playButton.classList.remove('hide');
    buttonReset.classList.add('hide');
    result.classList.add('hide');
    play.classList.add('hide');
    //hide all image of players selection
    //computerSelection.children[0].classList.add('hide');
    //computerSelection.children[1].classList.add('hide');
    //computerSelection.children[2].classList.add('hide');
    playerSelection.classList.add('hide');
}

const tie = () => {
    updateScore();
}

const humanWins = () => {
    rest++;
    player = parseInt(scorePlayer.dataset.value) + 1;
    updateScore();
}

const humanLoses = () => {
    rest++;
    computer = parseInt(scoreComputer.dataset.value) + 1;
    updateScore();
}

const updateScore = () => {
    scorePlayer.innerHTML = player;
    scorePlayer.setAttribute('data-value', player);
    scoreComputer.innerHTML = computer;
    scoreComputer.setAttribute('data-value', computer);
    if (rest === turns || computer > (turns / 2) || player > (turns / 2)) {
        result.classList.remove('hide');
        buttonReset.classList.remove('hide');
        if (player > computer) {
            resultText.innerHTML = "Has ganado!!!";
        } else if (player < computer) {
            resultText.innerHTML = "Has perdido!!!";
        } else {
            /*This option should never occur since we do not count ties as plays.*/
            resultText.innerHTML = "Has empatado!!!";
        }
    }
}

const calculateWinner = () => {
    console.log("Jugador: " + jSelect + " Computador: " + cSelect + " p: " + p);
    if (jSelect === 0) {
        switch (cSelect) {
            case 0:
                tie();
                break;
            case 1:
                humanLoses();
                break;
            case 2:
                humanWins();
                break;
        }
    }
    if (jSelect === 1) {
        switch (cSelect) {
            case 0:
                humanWins();
                break;
            case 1:
                tie();
                break;
            case 2:
                humanLoses();
                break;
        }
    }
    if (jSelect === 2) {
        switch (cSelect) {
            case 0:
                humanLoses();
                break;
            case 1:
                humanWins();
                break;
            case 2:
                tie();
                break;
        }
    }
}

const computerRoll = () => {
    //Computer roll
    //Show the image of the computer run
    computerSelection.classList.remove('hide');
    id = setInterval(change, 100);
};




/* capture clic play button*/

playButton.addEventListener('click', () => {
    turns = parseInt(turnsNumber.value);
    scoreComputer.innerHTML = computer;
    scoreComputer.setAttribute('data-value', computer);
    scorePlayer.innerHTML = player;
    scorePlayer.setAttribute('data-value', player);
    menuTurns.classList.add('hide');
    score.classList.remove('hide');
    playButton.classList.add('hide');
    play.classList.remove('hide');
    computerSelection.classList.add('hide');
})

/*Capture reset Button */

buttonReset.addEventListener('click', () => {
    reset();
})

/* Capture player option */

playerOption.addEventListener('click', (e) => {
    let seleccionJugador = e.target.parentNode.dataset.option;

    switch (seleccionJugador) {
        case "2":
            playerSelection.src = 'assets/scissors.svg';
            jSelect = 2;
            /* console.log("Las tijeras ganan al papel y pierden con la piedra."); */
            break;
        case "0":
            playerSelection.src = 'assets/rock.svg';
            jSelect = 0;
            /* console.log("La piedra gana a las tijeras y pierden con el papel."); */
            break;
        case "1":
            playerSelection.src = 'assets/paper.svg';
            jSelect = 1;
            /* console.log("El papel gana a la piedra y pierde con las tijeras."); */
            break;
    }
    playerSelection.classList.remove('hide');
    computerSelection.classList.remove('hide');
    cSelect = -1;
    p = -1;
    computerRoll();
})