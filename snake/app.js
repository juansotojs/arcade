let boardElem = document.querySelector('#board');
let nameDisplay = document.querySelector('#playerName');
let resetButton = document.querySelector('.reset');
let score = document.querySelector('#score');
let bodyPart = ['hold'];
let play = 0;
let selBoard = document.querySelectorAll(".board, .cell");
let stop = false;
let prevMoves = [];

let initialState = {};

function buildInitialState() {
    initialState.player = '';
    initialState.score = 0;
    initialState.direction = "";
    initialState.snakePositions = [168, 169, 170, 171];
    initialState.applePosition = 100;
}


nameDisplay.addEventListener('click', function(event){
    if(event.target.className !== 'enter')
    return;
    const playerInput = document.querySelector('input[name = player]');
    initialState.player = playerInput.value;
    renderPlayer();
    play++;
    
})

function resetBoard(){
    for(let i = 0; i < selBoard.length; i ++){
        selBoard[i].removeAttribute('id');
    }
}

function renderScore(){
    score.innerHTML = `${initialState.score}`
}
function renderBoard(){
    let gridBox;
    for(let i = 0; i < 225; i++){
        gridBox = document.createElement('div');
        gridBox.classList.add('cell');
        boardElem.appendChild(gridBox);
    }
}

function renderState() {

    renderScore();
    
    
    
    const tiles = document.querySelectorAll(".board, .cell");
    
    const apple = tiles[initialState.applePosition];
    apple.setAttribute('id','apple');
    for(let i = 0; i < initialState.snakePositions.length; i++){
        let snakePiece = initialState.snakePositions[i];
        bodyPart = tiles[snakePiece];
        bodyPart.setAttribute('id','snake');
    }

}
function renderPlayer(){
    let text;
    if(!initialState.player){
        text = `
            <input name = "player"
            placeholder="Enter Name!">
            <button class = "enter">Start</button>`
    } else {
        text = initialState.player
    }
    nameDisplay.innerHTML = text;
}
function increaseScore(){
    initialState.score++;
    let newPos = Math.floor(Math.random() * 226);
    initialState.applePosition = newPos;

}

function tick() {
    // this is an incremental change that happens to the state every time you update...
    
    let cells = document.querySelectorAll(".board, .cell");
        if(initialState.direction === "ArrowRight" && stop === false){
            let lastIndex = initialState.snakePositions.length - 1;
            let nextStep = initialState.snakePositions[lastIndex] + 1;
            let snakeTail = initialState.snakePositions[0];
            if(nextStep === initialState.applePosition){
                initialState.snakePositions.push(nextStep);
                increaseScore();
            
            }
            else {
                cells[snakeTail].removeAttribute('id');
                initialState.snakePositions.splice(0,1);
                initialState.snakePositions.push(nextStep);
            }
            
        }
    else if(initialState.direction === "ArrowLeft" && stop === false){
        let lastIndex = initialState.snakePositions.length - 1;
        let nextStep = initialState.snakePositions[lastIndex] - 1;
        let snakeTail = initialState.snakePositions[0];
        if(nextStep === initialState.applePosition){
            initialState.snakePositions.push(nextStep);
            increaseScore();
            
        }
        else{
            cells[snakeTail].removeAttribute('id');
            initialState.snakePositions.splice(0,1);
            initialState.snakePositions.push(nextStep);
        }
    }
    else if(initialState.direction === "ArrowUp" && stop === false){
        let lastIndex = initialState.snakePositions.length - 1;
        let nextStep = initialState.snakePositions[lastIndex] - 15;
        let snakeTail = initialState.snakePositions[0];
        if(nextStep === initialState.applePosition){
            initialState.snakePositions.push(nextStep);
            increaseScore();
            
        }
        else{
            cells[snakeTail].removeAttribute('id');
            initialState.snakePositions.splice(0,1);
            initialState.snakePositions.push(nextStep);
        }
    }
    else if(initialState.direction === "ArrowDown"&& stop === false){
        let lastIndex = initialState.snakePositions.length - 1;
        let nextStep = initialState.snakePositions[lastIndex] + 15;
        let snakeTail = initialState.snakePositions[0];
        if(nextStep === initialState.applePosition){
            initialState.snakePositions.push(nextStep);
            increaseScore();
            
        }
        else{
            cells[snakeTail].removeAttribute('id');
            initialState.snakePositions.splice(0,1);
            initialState.snakePositions.push(nextStep);
        }
    }
    
    let limit = initialState.snakePositions.length - 1;
    for(let i = 0; i < limit; i++){
        if(initialState.snakePositions[limit] === initialState.snakePositions[i]){
            nameDisplay.innerHTML = `<h1 id="playerName"> You Lose! </h1>`
            stop = true;
            
        }
    }
    if(!bodyPart){
        nameDisplay.innerHTML = `<h1 id="playerName"> You Lose! </h1>`
            stop = true;
    }
    renderState()
  }

  
    renderPlayer();
    buildInitialState();
    renderBoard();    
    setInterval(tick, 1000/ 12);
    

    document.addEventListener('keydown', function(event){
     if(event.code === "ArrowRight" && initialState.direction === "ArrowLeft"){
        initialState.direction = initialState.direction;
     }
     else if(event.code === "ArrowLeft" && initialState.direction === "ArrowRight"){
        initialState.direction = initialState.direction;
     }
     else if(event.code === "ArrowUp" && initialState.direction === "ArrowDown"){
        initialState.direction = initialState.direction;
     }
     else if(event.code === "ArrowDown" && initialState.direction === "ArrowUp"){
        initialState.direction = initialState.direction;
     }
     else {
        initialState.direction = event.code;
     }
     prevMoves.push(event.code);
    })
  