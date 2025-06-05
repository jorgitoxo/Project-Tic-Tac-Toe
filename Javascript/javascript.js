// Author: Jorge Leonard-Pinero

// Interactive game of tic-tac-toe
// Aim:
//  To practice using module pattern
//  and factory functions in Javascript
//  having as little global code as possible.

// TCB: Testing code below
// DCB: Debugging code below
// CBUT: Code below used for testing

const Game = (function () {
    
    return {}
})();

const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const gameboard = [];
    
    function Cell (playerToken) {
        let tokenInCell = "";

        const getToken = () => tokenInCell;

        const addToken = (playerToken) => {
            tokenInCell = playerToken;
        }

        return {
            getToken,
            addToken
        }
    }

    function markToken(token) {

    }

    // Build the board!
    // The 2D array that will represent
    // the state of the game board
    // Row 0 represents the top row
    // Column 0 represents the left-most column
    for (let row = 0; row < rows; row++) {
        gameboard[row] = [];
        for (let col = 0; col < columns; col++) {
            gameboard[row].push(Cell());
        };
    };

    // Method of getting entire game board,
    // that the UI will eventually need to render it
    const getGameBoard = () => gameboard;

    // Show the content of the gameboard object
    // in the console
    const printGameBoard = () => console.log(gameboard.map((row) => row.map((cell) => cell.getToken())));
    
    return { getGameBoard, printGameBoard }
})();

// Needs work
function Player (name="Slick", token="X") {
    this.name = name;
    this.token = token;
    this.score = 0;
    
    const getName = () => this.name;
    const getToken = () => this.token;
    const getScore = () => this.score;

    return { getName, getToken, getScore };
};

// CBUT
// const Edson = Player("Edson", "0");
// Edson.logPlayerName();
// Edson.logPlayerToken();
// // 
// const Rui = Player("Rui", "X");
// Rui.logPlayerName();
// Rui.logPlayerToken();
// // 
// Player.logPlayerName();
// Player.logPlayerToken();


// RUN
Gameboard.printGameBoard();
