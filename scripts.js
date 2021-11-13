

const gameBoard = (function() {
    let board = ['','','','','','','','',''];

    const pickSquare = function(player, square) {
        if (board[square] !== '') return false;

        if (player === 'X') {
            board[square] = 'X';
        } else if (player === 'O') {
            board[square] = 'O';
        };
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
    let active = false;
    let boardShape = shape;

    if (!(boardShape === 'X' || boardShape === 'O')) return false; 

    const getShape = function() {
        return boardShape;
    }

    const getActive = function() {
        return active;
    }

    const changeActive = function() {
        active = !active; 
    }

    const checkIfWin = function() {
        let board = gameBoard.getBoardState();
        let x = boardShape;
        let win = false;
        if ((board[0] === x && board[1] === x && board[2] === x)) win = true;
        if ((board[3] === x && board[4] === x && board[5] === x)) win = true;
        if ((board[6] === x && board[7] === x && board[8] === x)) win = true;
        if ((board[0] === x && board[3] === x && board[6] === x)) win = true;
        if ((board[1] === x && board[4] === x && board[7] === x)) win = true;
        if ((board[2] === x && board[5] === x && board[8] === x)) win = true;
        if ((board[0] === x && board[4] === x && board[8] === x)) win = true;
        if ((board[2] === x && board[4] === x && board[6] === x)) win = true;
        return win;
    }
        
    return {getShape, getActive, changeActive, checkIfWin};
};



const gameController = (function() {
    let player1, player2;

    const addPlayers = function(p1, p2) {
        player1 = p1;
        player2 = p2;
        player1.changeActive();
    }

    const switchCurrent = function() {
        player1.changeActive();
        player2.changeActive();
    }

    const getCurrentPlayer = function() {
        if (player1.getActive() === true) return player1;
        else return player2;
    }

    const checkForWinner = function() {
        if (player1.checkIfWin() === true) return 1;
        else if (player2.checkIfWin() === true) return 2;
        else return 0;
    }

    for (let i = 0; i < gameBoard.getBoardState().length; i++) {
        let id = `#s${i}`;
        let ele = document.querySelector(id);
        ele.addEventListener('click', function() {clickOnSquare(gameController.getCurrentPlayer().getShape(), i)});
    };

    function clickOnSquare(currentPlayer, squareNum) {
        x = gameBoard.pickSquare(currentPlayer, squareNum);
        console.log(x);
        if (x !== false) {
            updateWebpage.updateBoard(gameBoard.getBoardState());
            gameController.switchCurrent();
        };
    }

    function coinFlip() {
        result = Math.floor(Math.random()*2) + 1;
        if (result === 1) return true;
        else return false;
    }

    return {addPlayers, getCurrentPlayer, switchCurrent, checkForWinner}
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

