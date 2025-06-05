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
    // Create a 2D array that will represent
    // the state of the game board
    // Row 0 represents the top row
    // Column 0 represents the left-most column
    for (let row = 0; row < rows; row++) {
        gameboard[row] = [];
        for (let col = 0; col < columns; col++) {
            // gameboard[row].push("_");
            gameboard[row].push(Cell());
        };
    };

    // Method of getting entire game board,
    // that the UI will eventually need to render it
    const getGameBoard = () => gameboard;
    
    // CBUT //
    // Prints board to console, helps seeing how
    // the 2D array is initially built
    // Do we have to map each cell's value
    // to be able to see the gameboard on the console?
    // Why does this work, instead of console.log(Gameboard.getGameBoard)?
    // Is it because what is stored in each cell
    // is a cell object, so we have to extract
    // the values inside each cell object?
    // ```
    // const printGameBoard = gameboard.map((row) => row.map((cell) => `${cell}`));
    // ```
    // => Not quite, as we haven't created a cell object yet
    // This was not possible because getGameBoard
    // is a const variable that holds a reference to a function
    // We need make the call as an object method,
    // not as an object property -- $ console.log(Gameboard.getGameBoard())
    // Method: Gameboard.getGameBoard()
    // vs
    // Property: Gameboard.getGameBoard
    // const printGameBoard = () => { console.log(gameboard) };
    const printGameBoard = console.log(gameboard.map((row) => row.map((cell) => cell.getToken())));
    
    return { getGameBoard, printGameBoard }
})();

// Needs work
function Player (name="Slick", token="X") {
    this.name = name;
    this.token = token;
    this.score = 0;

    // CBUT
    const logPlayerName = () => console.log(this.name);
    const logPlayerToken = () => console.log(this.token);
    

    return { name, token, score, logPlayerName, logPlayerToken };
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
Gameboard.printGameBoard;
