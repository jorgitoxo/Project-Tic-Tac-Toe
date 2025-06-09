// Author: Jorge Leonard-Pinero

// Interactive game of tic-tac-toe
// Aim:
//  To practice using module pattern
//  and factory functions in Javascript
//  having as little global code as possible.

// TCB: Testing code below
// DCB: Debugging code below
// CBUT: Code below used for testing

const Game = (function (playerOne, playerTwo) {
    
    return {
        // playRound,
        // getActivePlayer
    }
})();

const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const gameboard = [];
    
    function Cell () {
        let tokenInCell = "";

        const getToken = () => tokenInCell;

        const addToken = (player) => {
            tokenInCell = player.getToken();
        }

        return {
            getToken,
            addToken
        }
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
    
    const markToken = function (xAxis, yAxis, player) {
        if (gameboard[xAxis][yAxis].getToken() !== "") return;
        
        gameboard[xAxis][yAxis].addToken(player);
    }

    return { getGameBoard, printGameBoard, markToken }
})();

// Needs work
function Player (name="Player", token="X") {
    this.name = name;
    this.token = token;
    this.score = 0;
    
    const getName = () => this.name;
    const getToken = () => this.token;
    const getScore = () => this.score;

    return { getName, getToken, getScore };
};


// RUN
let Eddy = new Player ('Eddy', 'X');

Gameboard.printGameBoard();
Gameboard.markToken(0, 0, Eddy);
Gameboard.printGameBoard();

// Jest testing
try {
    module.exports = Gameboard;
    // module.exports = Gameboard.gameboard.addToken;
} catch (error) {
    console.log('we got a problem chief');
}
