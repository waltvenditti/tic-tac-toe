

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
    let winPoints = 0;

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

    const addWinPoint = function() {
        winPoints++;
    }

    const getScore = function() {
        return winPoints;
    }

    const resetScore = function() {
        winPoints = 0;
    }

    const switchShape = function() {
        if (boardShape === 'X') {
            boardShape = 'O';
        } else {
            boardShape = 'X';
        }
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
        
    return {getShape, getActive, changeActive, checkIfWin, getScore, addWinPoint, resetScore, switchShape};
};



const gameController = (function() {
    let player1 = Player('X');
    player1.changeActive();
    let player2 = Player('O');
    let squareRefFoos = [];

    playAgainBtn = document.querySelector('#play-again');
    resetBtn = document.querySelector('#reset');
    p1ScoreCount = document.querySelector('#p1-span');
    p2ScoreCount = document.querySelector('#p2-span');
    p1Shape = document.querySelector('#p1shape');
    p2Shape = document.querySelector('#p2shape');
    changeShapesBtn = document.querySelector('#change-shape');
    startGameBtn = document.querySelector('#start-game');
    p1Start = document.querySelector('#p1-first');
    p2Start = document.querySelector('#p2-first');

    resetBtn.addEventListener('click', clickReset);
    playAgainBtn.addEventListener('click', clickPlayAgain);
    changeShapesBtn.addEventListener('click', clickChangeShapes);
    startGameBtn.addEventListener('click', clickStartGame)

    const switchCurrent = function() {
        player1.changeActive();
        player2.changeActive();
    }

    /*
            if (player1.getActive()) {
            p1Start.textContent = 'First Move';
            p2Start.textContent = '';
        } else if (player2.getActive()) {
            p2Start.textContent = 'First Move';
            p1Start.textContent = '';
        }
    */

    const getCurrentPlayer = function() {
        if (player1.getActive() === true) return player1;
        else return player2;
    }

    const checkForWinner = function() {
        if (player1.checkIfWin() === true) return 1;
        else if (player2.checkIfWin() === true) return 2;
        else return 0;
    }

    const endGame = function(result) {
        if (result === 1) {
            displayWin('Player 1 wins');
            player1.addWinPoint();
        } else if (result === 2) {
            displayWin('Player 2 wins');
            player2.addWinPoint();
        } else if (result === 0) {
            displayWin('Draw');
        };
        gameController.turnOffSquares();
        updateScore();
        playAgainPrompt();
    }

    const turnOffSquares = function() {
        for (let i = gameBoard.getBoardState().length-1; i >= 0; i--) {
            let id = `#s${i}`;
            let ele = document.querySelector(id);
            let refFoo = squareRefFoos.pop();
            ele.removeEventListener('click', refFoo);
        }
    }

    const turnOnSquares = function() {
        for (let i = 0; i < gameBoard.getBoardState().length; i++) {
            let id = `#s${i}`;
            let ele = document.querySelector(id);
            ele.addEventListener('click', refFoo = function() {clickOnSquare(gameController.getCurrentPlayer().getShape(), i)});
            squareRefFoos.push(refFoo);
        }; 
    }

    const updateScore = function() {
        p1ScoreCount.textContent = player1.getScore();
        p2ScoreCount.textContent = player2.getScore();
    }

    const playAgainPrompt = function() {
        playAgainBtn.style['display'] = 'inline';
        resetBtn.style['display'] = 'inline';
    }

    function clickOnSquare(currentPlayer, squareNum) {
        x = gameBoard.pickSquare(currentPlayer, squareNum);
        if (x !== false) {
            updateWebpage.updateBoard(gameBoard.getBoardState());
            gameController.switchCurrent();
            let winResult = gameController.checkForWinner();
            if (winResult !== 0) {
                gameController.endGame(winResult);
            } else {
                if (checkIfSpaceLeft() === false) {
                    gameController.endGame(winResult);
                }
            }
        };
    }

    function clickPlayAgain() {
        playAgainBtn.style['display'] = 'none';
        resetBtn.style['display'] = 'none';
        gameBoard.clearBoard();
        updateWebpage.updateBoard(gameBoard.getBoardState());
        displayWin('');
        turnOnSquares();
    }

    function clickReset() {
        player1.resetScore();
        player2.resetScore();
        updateScore();
        gameBoard.clearBoard();
        updateWebpage.updateBoard(gameBoard.getBoardState());
        displayWin('');
        btns = document.querySelectorAll('#setting-board button');
        for (let i = 0; i < btns.length; i++) {
            btns[i].style['pointer-events'] = 'auto';
        }
        turnOffSquares();
        playAgainBtn.style['display'] = 'none';
        resetBtn.style['display'] = 'none';
    }

    function clickChangeShapes() {
        playAgainBtn.style['display'] = 'none';
        resetBtn.style['display'] = 'none';
        player1.switchShape();
        player2.switchShape();
        p1Shape.textContent = player1.getShape();
        p2Shape.textContent = player2.getShape();
    }

    function clickStartGame() {
        btns = document.querySelectorAll('#setting-board button');
        for (let i = 0; i < btns.length; i++) {
            btns[i].style['pointer-events'] = 'none';
        }
        turnOnSquares();
    }

    function coinFlip() {
        result = Math.floor(Math.random()*2) + 1;
        if (result === 1) return true;
        else return false;
    }

    function displayWin(message) {
        ele = document.querySelector('#win-result');
        ele.textContent = message;
    }

    function checkIfSpaceLeft() {
        board = gameBoard.getBoardState();
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') return true;
        }
        return false; 
    }

    return {getCurrentPlayer, switchCurrent, checkForWinner, endGame, turnOffSquares, turnOnSquares}
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

