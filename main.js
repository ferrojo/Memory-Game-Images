// Inicializacion de variables
let uncoveredCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let totalHits = 0;
let timer = false;
let timeRewind = 40;
let initialTimer = 40;
let timeOut = null;

// Apuntando a documento HTML
let showMovements = document.getElementById('movements');
let showHits = document.getElementById('totalHits');
let showTime = document.getElementById('time-left');

let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/failed.wav');

//Gererar numeros aleatorios
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

// Sort ordena los numero de acuerdo a una funcion
numbers = numbers.sort(()=>{return Math.random()-0.5});
console.log(numbers);

// Funciones
function countTime(){
    timeOut = setInterval(()=>{
        timeRewind--;
        showTime.innerHTML = `Time: ${timeRewind} Seconds`;
        if(timeRewind == 0){
            clearInterval(timeOut);
            blockCards();
            loseAudio.play(); 
        }
    },1000);
}

function blockCards(){
    for(let i = 0; i <=15; i++){
        let lockedCard = document.getElementById(i);
        lockedCard.innerHTML = `<img src="./images/${numbers[i]}.png" alt="">`;
        lockedCard.disabled = true;
    }
}

// Funcion Principal
function uncover(id){

    if(timer == false){
        countTime();
        timer = true;
    }

    uncoveredCards++;
    console.log(uncoveredCards);

    if(uncoveredCards == 1){
        // Mostrar primer numero
        card1 = document.getElementById(id);
        firstResult = numbers[id];
        card1.innerHTML = `<img src="./images/${firstResult}.png" alt="">`;
        clickAudio.play();

        // Deshabilitar primer boton
        card1.disabled = true;
    }
    else if(uncoveredCards == 2){
        // Mostrar segundo nuemero
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = `<img src="./images/${secondResult}.png" alt="">`;
        clickAudio.play();

        // Deshabilitar segundo boton
        card2.disabled = true;

        // Incrementar Movimientos
        movements++;
        showMovements.innerHTML = `Movements: ${movements}`;

        if(firstResult == secondResult){
            // Encerar contador tarjetas destapadas
            uncoveredCards = 0;

            // Aumentar Hits
            totalHits++; 
            showHits.innerHTML = `Total Hits: ${totalHits}`;
            rightAudio.play();

            if(totalHits == 8){
                winAudio.play();
                clearInterval(timeOut);
                showHits.innerHTML = `Total Hits: ${totalHits} 🥳️`;
                showTime.innerHTML = `Excellent! 🎉 it only took you ${initialTimer - timeRewind} seconds`;
                showMovements.innerHTML = `Movements: ${movements} 🤟😎`;
            }
        }
        else{
            wrongAudio.play();
            // Mostrar momentaniamente valores y volver a tapar
            setTimeout(()=>{
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';
                card1.disabled = false;
                card2.disabled = false;
                uncoveredCards = 0;
            },800);
        }
    }
}

