

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


//module to control game flow
const gameController = (function(player1, player2) {
    let winner = 'none';
    let currentPlayer;

    coinFlip = Math.floor(Math.random()*2) + 1;
    if (coinFlip === 1) currentPlayer = player1;
    else currentPlayer = player2;
    /*
    while (winner === 'none') {
        //player picks square
        //check for a winner
        if (currentPlayer === player1) currentPlayer = player2;
        else currentPlayer = player1;
        break; ///!!!!!!!!!!!!!!!!!!!!!!REMOVE!!!!
    }
    */
})();

