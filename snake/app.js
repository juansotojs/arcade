let boardElem = document.querySelector('#board');

// state
let initialState = {};

function buildInitialState() {
        initialState.snake = {
        body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
        nextDirection: [1, 0]
      }
      initialState.board = []
}

// render
function renderState() {
    boardElem.innerText = '';
    let alternator = true;
    let gridBox;
    for(let i = 0; i < 255; i ++){
        if(alternator === true){
            gridBox = document.createElement('div');
            gridBox.classList.add('oddBox');
            gridBox.innerHTML = ' j';
            boardElem.appendChild(gridBox);
            alternator = false;
        }
        else{
            gridBox = document.createElement('div');
            gridBox.classList.add('evenBox');
            gridBox.innerHTML = ' j';
            boardElem.appendChild(gridBox);
            alternator = true;
        }
    }

}

// maybe a dozen or so helper functions for tiny pieces of the interface

// listeners
function onBoardClick() {
  // update state, maybe with another dozen or so helper functions...

  renderState() // show the user the new state
}
renderState();