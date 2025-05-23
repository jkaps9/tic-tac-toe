// Need game object
// Game consists of one gameboard and two players

// Need one gameboard object
// game board should have nine squares

// Need two players object
// Each player will have a name and a marker

// Need display controller

const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const board = new Array(rows);

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = '';
            }
        }
    };

    const getBoard = () => board;

    const addMarker = (row, column, marker) => {
        board[row][column] = marker;
    };

    const printBoard = () => {
        let boardWithValues = '';
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                boardWithValues += board[i][j];
            }
            if (i < rows - 1) {
                boardWithValues += '\n';
            }
        }
        console.log(boardWithValues);
    };

    resetBoard();

    return { getBoard, addMarker, printBoard, resetBoard };
})();

function createPlayer(name, marker) {
    return { name, marker };
}

const Game = (function (playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard;
    const playerOne = createPlayer(playerOneName, "X");
    const playerTwo = createPlayer(playerTwoName, "O");
    const players = [playerOne, playerTwo];

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        board.addMarker(row, column, getActivePlayer().marker);
        if (isWinner()) {
            alert(`${activePlayer.name} won!`);
        } else {
            switchPlayer();
            printNewRound();
        }
    };

    const newGame = () => {
        board.resetBoard();
        activePlayer = players[0];
    };

    const getPlayer = (index) => {
        if (index < players.length) {
            return players[index];
        }
    };

    const isWinner = () => {
        let boardCheck = board.getBoard();
        for (let i = 0; i < 3; i++) {
            //check rows
            if (boardCheck[i][0] === boardCheck[i][1] &&
                boardCheck[i][1] === boardCheck[i][2] &&
                boardCheck[i][0] === activePlayer.marker) {
                return true;
            }
            //check cols
            if (boardCheck[0][i] === boardCheck[1][i] &&
                boardCheck[1][i] === boardCheck[2][i] &&
                boardCheck[0][i] === activePlayer.marker) {
                return true;
            }
        }

        //check diagonals
        if (boardCheck[0][0] === boardCheck[1][1] &&
            boardCheck[1][1] === boardCheck[2][2] &&
            boardCheck[0][0] === activePlayer.marker) {
            return true;
        }

        if (boardCheck[0][2] === boardCheck[1][1] &&
            boardCheck[1][1] === boardCheck[2][0] &&
            boardCheck[0][2] === activePlayer.marker) {
            return true;
        }

        return false;
    };

    printNewRound();

    return { playRound, getActivePlayer, newGame, getPlayer };
})();

const DisplayController = (function () {
    const gameSquares = document.querySelectorAll(".game-grid>button");

    const updateSquares = () => {
        const board = Gameboard.getBoard();
        let squareIndex = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameSquares[squareIndex].textContent = `${board[i][j]}`;
                squareIndex++;
            }
        }
    };

    gameSquares.forEach(function (square) {
        square.addEventListener('click', () => {
            if (square.textContent === "") {
                Game.playRound(square.getAttribute("data-row"), square.getAttribute("data-column"));
                updateSquares();
                styleActivePlayer();
            }
        });
    });

    const newGameButton = document.querySelector("#new-game");
    newGameButton.addEventListener('click', () => {
        Game.newGame();
        updateSquares();
    });

    const playerOne = document.querySelector("#playerOne");
    const playerTwo = document.querySelector("#playerTwo");

    const updatePlayerValues = () => {
        let p1 = Game.getPlayer(0);
        playerOne.textContent = `${p1.marker}: ${p1.name}`;

        let p2 = Game.getPlayer(1);
        playerTwo.textContent = `${p2.marker}: ${p2.name}`;
    }

    updatePlayerValues();

    const styleActivePlayer = () => {
        let activePlayer = Game.getActivePlayer();
        if (activePlayer.marker === "X") {
            playerOne.classList.add("active");
            playerTwo.classList.remove("active");
        } else {
            playerTwo.classList.add("active");
            playerOne.classList.remove("active");
        }
    };

    styleActivePlayer();

})();