

const gameBoard = (function() {
    let board = ['','','','','','','','',''];

    const pickSquare = function(player, square) {
        if (board[square] !== '') return;

        if (player === 'X') {
            board[square] = 'X';
        } else if (player === 'O') {
            board[square] = 'O';
        } else return;
    }

    const clearBoard = function() {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }    
    }

    const getBoardState = function() {
        let boardCopy = [];
        for (let i = 0; i < board.length; i++) {
            boardCopy[i] = board[i];
        }
        return boardCopy;
    }

    return {getBoardState, pickSquare, clearBoard};
})();


const Player = function(shape) {
    if (!(shape === 'X' || shape === 'O')) return; 
    return {shape};
};


const gameController = (function() {
    let player1, player2;
    let winner = 'none';
    let currentPlayer;


    for (let i = 0; i < gameBoard.getBoardState; i++) {
        let x = `p${i}`;
        box = document.querySelector(x);
        box.addEventListener('click', () => {
            
        });
    }
    

    const enterPlayers = function(p1, p2) {
        player1 = p1;
        player2 = p2;
    };

    coinFlip = Math.floor(Math.random()*2) + 1;
    if (coinFlip === 1) currentPlayer = player1;
    else currentPlayer = player2;

    let j = 0;
    while (winner === 'none' && j < 9) {
        //player picks square
        //check for a winner
        if (currentPlayer === player1) currentPlayer = player2;
        else currentPlayer = player1;
        j++;
    }
    return {enterPlayers};
})();

let updateWebpage = (function() {
    const updateBoard = function(currentBoard) {
        for (let i = 0; i < currentBoard.length; i++) {
            let x = `#p${i}`;
            box = document.querySelector(x);
            box.textContent = currentBoard[i];
        }
    }
    return {updateBoard};
})();