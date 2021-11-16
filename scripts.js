

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
    let aiLemming = false;
    let aiReaper = false;
    let firstMove = false;

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

    const toggleAI = function() {
        aiLemming = !aiLemming;
        if (aiReaper === true) aiReaper = false;
    }

    const checkAI = function() {
        return aiLemming;
    }

    const toggleAIHard = function() {
        aiReaper = !aiReaper;
        if (aiLemming === true) aiLemming = false;
    }

    const checkAIHard = function() {
        return aiReaper;
    }

    const checkFirstMove = function() {
        return firstMove;
    }

    const changeFirstMove = function() {
        firstMove = !firstMove;
    }
        
    return {getShape, getActive, changeActive, getScore, addWinPoint, resetScore, switchShape, toggleAI, checkAI, toggleAIHard, checkAIHard, checkFirstMove, changeFirstMove};
};



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



const gameController = (function() {
    let player1 = Player('X');
    player1.changeActive();
    player1.changeFirstMove();
    let player2 = Player('O');
    let squareRefFoos = [];

    playAgainBtn = document.querySelector('#play-again');
    resetBtn = document.querySelector('#reset');
    changeShapesBtn = document.querySelector('#change-shape');
    startGameBtn = document.querySelector('#start-game');
    swapFirstBtn = document.querySelector('#swap-first');
    toggleAIBtn = document.querySelector('#toggle-ai');
    toggleAIHardBtn = document.querySelector('#toggle-ai-hard');

    p1First = document.querySelector('#p1-first');
    p2First = document.querySelector('#p2-first');
    p1ScoreCount = document.querySelector('#p1-span');
    p2ScoreCount = document.querySelector('#p2-span');
    p1Shape = document.querySelector('#p1shape');
    p2Shape = document.querySelector('#p2shape');
    p2Player = document.querySelector('#p2-player')

    resetBtn.addEventListener('click', clickReset);
    playAgainBtn.addEventListener('click', clickPlayAgain);
    changeShapesBtn.addEventListener('click', clickChangeShapes);
    startGameBtn.addEventListener('click', clickStartGame);
    swapFirstBtn.addEventListener('click', clickSwapFirst);
    toggleAIBtn.addEventListener('click', clickToggleAI);
    toggleAIHardBtn.addEventListener('click', clickToggleAIHard);

    const switchCurrent = function() {
        player1.changeActive();
        player2.changeActive();
    }

    const getCurrentPlayer = function() {
        if (player1.getActive() === true) return player1;
        else return player2;
    }

    const checkForWinner = function() {
        if (checkIfWin(player1, gameBoard.getBoardState()) === true) return 1;
        else if (checkIfWin(player2, gameBoard.getBoardState()) === true) return 2;
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

    function checkEndGame() {
        let winResult = checkForWinner();
            if (winResult !== 0) {
                endGame(winResult);
                return true;
            } else {
                if (checkIfSpaceLeft(gameBoard.getBoardState()) === false) {
                    endGame(winResult);
                    return true;
                }
            }
    }

    function lemming() {
        board = gameBoard.getBoardState();
        moves = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') moves.push(i);
        }
        move = Math.floor(Math.random() * moves.length);
        gameBoard.pickSquare(player2.getShape(), moves[move]);
        updateWebpage.updateBoard(gameBoard.getBoardState());
        switchCurrent();
        checkEndGame();
    }

    function reaper() {
        move = minimax(player2, gameBoard.getBoardState(), true, 0);
        gameBoard.pickSquare(player2.getShape(), move);
        updateWebpage.updateBoard(gameBoard.getBoardState());
        switchCurrent();
        checkEndGame();
    }

    function clickOnSquare(currentPlayer, squareNum) {
        x = gameBoard.pickSquare(currentPlayer, squareNum);
        if (x !== false) {
            updateWebpage.updateBoard(gameBoard.getBoardState());
            switchCurrent();
            if (checkEndGame()) return;

            if (player2.checkAI()) lemming();
            else if (player2.checkAIHard()) reaper();
        };
    }

    function clickPlayAgain() {
        playAgainBtn.style['display'] = 'none';
        resetBtn.style['display'] = 'none';
        gameBoard.clearBoard();
        updateWebpage.updateBoard(gameBoard.getBoardState());
        displayWin('');
        turnOnSquares();
        swapFirstPlayer();
        getFirstMoveDisplay();
        determineFirstMove();
        if ((player2.checkAI() || player2.checkAIHard()) && player2.getActive()) {
            if (player2.checkAI()) lemming();
            else if (player2.checkAIHard()) reaper();
        };
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
        if (player1.checkFirstMove() !== true) {
            swapFirstPlayer();
            getFirstMoveDisplay();
        }
        if (player1.getShape() !== 'X') {
            clickChangeShapes();
        }
        if (player2.checkAI() === true) {
            clickToggleAI();
        }
        if (player2.checkAIHard() === true) {
            clickToggleAIHard(); 
        }
    }

    function clickChangeShapes() {
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
        determineFirstMove();
        if ((player2.checkAI() || player2.checkAIHard()) && player2.getActive()) {
            if (player2.checkAI()) lemming();
            else if (player2.checkAIHard()) reaper();
        }
    }

    function clickSwapFirst() {
        swapFirstPlayer();
        getFirstMoveDisplay();
    }

    function clickToggleAI() {
        player2.toggleAI();
        if (p2Player.textContent !== 'AI: Lemming') {
            p2Player.textContent = 'AI: Lemming';
        } else p2Player.textContent = 'Human';
    }

    function clickToggleAIHard() {
        player2.toggleAIHard();
        if (p2Player.textContent !== 'AI: Reaper') {
            p2Player.textContent = 'AI: Reaper';
        } else p2Player.textContent = 'Human';
    }

    function determineFirstMove() {
        if (player1.checkFirstMove() === true) {
            if (player1.getActive() !== true) {
                switchCurrent();
            }
        } else if (player2.checkFirstMove() === true) {
            if (player2.getActive() !== true) {
                switchCurrent();
            }
        }
    }

    function getFirstMoveDisplay() {
        if (player1.checkFirstMove() === true) {
            p1First.textContent = 'First Move';
            p2First.textContent = '';
        } else if (player2.checkFirstMove() === true) {
            p2First.textContent = 'First Move';
            p1First.textContent = '';
        }
    }

    function swapFirstPlayer() {
        player1.changeFirstMove();
        player2.changeFirstMove();
    }

    function displayWin(message) {
        ele = document.querySelector('#win-result');
        ele.textContent = message;
    }

    function checkIfSpaceLeft(board) {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') return true;
        }
        return false; 
    }

    function minimax(caller, boardState, self, counter) {
        let nextCaller;
        let avMoves = [];
        let avMovesIndices = [];
        let scores = [];
        if (caller === player1) {
            nextCaller = player2;
        } else nextCaller = player1;

        //generate all possible +1 moves
        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i] === '') {
                let newBoard = copyArray(boardState);
                avMovesIndices.push(i);
                newBoard[i] = caller.getShape();
                avMoves.push(newBoard);
            };
        };

        //generate empty list of scores for each move
        for (i = 0; i < avMoves.length; i++) {
            scores.push(0);
        };

        //calculate score for each move
        for (i = 0; i < avMoves.length; i++) {
            if (checkIfWin(caller, avMoves[i]) === true) {
                if (self === true) scores[i] = 10;
                else scores[i] = -10;
            };
            if (counter === 0) {
                console.log(`calc score for loop, it.#${i}`);
            }
        };

        //call minimax on all states with score of 0
        // and which are not draws
        for (i = 0; i < avMoves.length; i++) {
            if (scores[i] === 0 && checkIfSpaceLeft(avMoves[i]) === true) {
                scores[i] = minimax(nextCaller, avMoves[i], !self, (counter + 1));
            };
            if (counter === 0) console.log(`call minimax for loop, it.#${i}`);
        };

        //pick which score to return
        if (counter !== 0) {
            let maxScore = scores[0];
            let minScore = scores[0];
            for (i = 0; i < scores.length; i++) {
                if (scores[i] > maxScore) maxScore = scores[i];
                if (scores[i] < minScore) minScore = scores[i];
            }
            if (self === true) {
                return maxScore;
            } else {
                return minScore; 
            }

        } if (counter === 0) {
            let bestMove = 0;
            for (i = 0; i < scores.length; i++) {
                if (scores[i] > scores[bestMove]) {
                    bestMove = i;
                }
            }
            return avMovesIndices[bestMove];
        }
    }

    function copyArray(array) {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            newArray[i] = array[i];
        }
        return newArray;
    }

    return {getCurrentPlayer, switchCurrent, checkForWinner, endGame, turnOffSquares, turnOnSquares, minimax}
})();

const checkIfWin = function(player, board) {
    let x = player.getShape();
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










