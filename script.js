// Need game object
// Game consists of one gameboard and two players

// Need one gameboard object
// game board should have nine squares

// Need two players object
// Each player will have a name and a marker

// Need display controller? 

const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const board = new Array(rows);

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = '*';
        }
    }

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

    return { getBoard, addMarker, printBoard };
})();

Gameboard.printBoard();

function createPlayer(name, marker) {
    return { name, marker };
}

function Game(playerOneName = "Player One", playerTwoName = "Player Two") {
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
        //Check for winner
        switchPlayer();
        printNewRound();
    };

    printNewRound();

    return { playRound, getActivePlayer };
}

const game = Game();