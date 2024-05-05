//To do list functionality
let inputBx = document.querySelector('#inputBx');
let list = document.querySelector('#list');
let numberOfTaskCompleted = 0;
const taskCompletedValue = document.getElementById('tasks-completed-value');

inputBx.addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        addItem(this.value)
        this.value = ""
    }
})

let addItem = (inputBx) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = `${inputBx}<i></i>`;

        listItem.addEventListener("click", function(){
            this.classList.toggle('done');
        })

        listItem.querySelector("i").addEventListener("click",
        function(){
            if (listItem.classList.contains('done')){
                numberOfTaskCompleted += 1;
                taskCompletedValue.innerHTML = `${numberOfTaskCompleted}`;
            }
            listItem.remove();
        })
        list.appendChild(listItem);
}

//Summary
let numberOfPomodoroSession = 0;


//Pomodoro timer
const startingMinutes = 25;
let time = startingMinutes * 60;
const countdownEl = document.getElementById('countdown');
const timerSound = document.getElementById('timerSound'); // Get reference to the audio element
const pomodoroValue = document.getElementById('pomodoro-value');

let intervalId;
let timer = document.querySelector('#settings-start')
let pause = document.querySelector('#settings-pause')
let reset = document.querySelector('#settings-reset')

function pauseTimer(){
    clearInterval(intervalId);
    intervalId = false;
}

function resetTimer(){
    startAgain();
}

function startCountdownOnClick() {
    if(intervalId){
        return;
    }
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
}

function startAgain(){
    clearInterval(intervalId); // Clear the interval
    intervalId = false; // Reset intervalId to false
    countdownEl.innerHTML = "Pomodoro Timer";
    time = startingMinutes * 60;
}

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;

    if (time <= 0) {
        clearInterval(intervalId); 
        countdownEl.innerHTML = "Time's up!";
        numberOfPomodoroSession += 1;
        pomodoroValue.innerHTML = `${numberOfPomodoroSession}`;
        playTimerSound(); 
        startAgain()
    }

    time--; 
    time = Math.max(time, 0); 
}

function playTimerSound() {
    timerSound.play(); 
}


timer.addEventListener('click', startCountdownOnClick);
pause.addEventListener('click', pauseTimer);
reset.addEventListener('click', resetTimer);

