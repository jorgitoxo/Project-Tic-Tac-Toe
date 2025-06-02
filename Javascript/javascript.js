// Author: Jorge Leonard-Pinero

// Interactive game of tic-tac-toe
// Aim:
//  To practice using module pattern
//  and factory functions in Javascript
//  having as little global code as possible.

// TCB: Testing code below
// DCB: Debugging code below

const Game = (function () {

    const displayController = (function () {
        
        return {};
    })();

    return {}
})();

const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const gameboard = [];

    // Build the board!
    // Create a 2D array that will represent the state of the game board
    // Row 0 represent the top row
    // Column 0 represents the left-most colum
    for (let row = 0; row < rows; row++) {
        gameboard[row] = [];
        for (let col = 0; col < columns; col++) {
            gameboard[row].push("_");
        };
    };

    // Method of getting entire game board, that the UI will eventually need to render it
    const getGameBoard = () => gameboard;
    
    // Code below used for testing //
    // Prints board to console, helps seeing how the 2D array is initially built
    // We have to map each cell's value to be able to see the gameboard on the console.
    // Why does this work, instead of console.logGameboard.getGameBoard)?
    const printGameBoard = gameboard.map((row) => row.map((cell) => `${cell}`));
    
    return { getGameBoard, printGameBoard }
})();

// Needs work
const Player = (function(name, token) {
    const name = name;
    const token = token;
    let score = 0;

    return { name, token, score };
})();

// RUN
console.log(Gameboard.printGameBoard);
