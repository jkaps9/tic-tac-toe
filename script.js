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
            board[i][j] = 0;
        }
    }

    const getBoard = () => board;

    const addMark = (row, column, player) => {
        board[row][column] = player;
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

    return { getBoard, addMark, printBoard };
})();

Gameboard.printBoard();