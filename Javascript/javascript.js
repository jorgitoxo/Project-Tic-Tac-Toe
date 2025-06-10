// Author: Jorge Leonard-Pinero

const { log } = require("console");

// Interactive game of tic-tac-toe
// Aim:
//  To practice using module pattern
//  and factory functions in Javascript
//  having as little global code as possible.

// TCB: Testing code below
// DCB: Debugging code below
// CBUT: Code below used for testing

const Game = (function (playerOne, playerTwo) {
    const players = [
        playerOne,
        playerTwo
    ];

    let activePlayer = players[0];
    
    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const printRound = () => {
        Gameboard.printGameBoard();
        console.log(`${getActivePlayer().getName()}'s turn.`);
    }

    const playRound = () => {

    }

    return {
        // playRound,
        // getActivePlayer,
        // printRound
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
    // const printGameBoard = () => console.log(gameboard.map((row) => row.map((cell) => cell.getToken())));
    const printGameBoard = () => {
        for (let i = 0; i < gameboard.length; i++) {
            let row = [];
            for (let j = 0; j < gameboard[i].length; j++) {
                row.push(gameboard[i][j].getToken());
            }
            console.log(row);
        }
        console.log();
    };

    const markToken = function (xAxis, yAxis, player) {
        try {
            if (gameboard[xAxis][yAxis].getToken() !== "") return;
            gameboard[xAxis][yAxis].addToken(player);
        } catch (error) {
            console.log("Ilegal move!");
            return;
        }
        
        // function isAvailable(cell) {
        //     if (cell === "") {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
        // const availableCells = gameboard
        //                         .filter(row => isAvailable(row[yAxis]))
        //                         .map(row => row[yAxis]);
        
        // getAvailableCells = () => availableCells;
        // if (!availableCells.length) return;
        
    }

    return { getGameBoard, printGameBoard, markToken }
})();

function Player (playerName, playerToken) {
    const name = playerName;
    const token = playerToken;
    const score = 0;
    
    const getName = () => name;
    const getToken = () => token;
    const getScore = () => score;

    return { getName, getToken, getScore };
};


// RUN
const Eddy = Player('Eddy', 'O');
const Nia = Player('Nia', 'X');

Gameboard.printGameBoard();
Gameboard.markToken(1, 1, Eddy);
Gameboard.printGameBoard();
Gameboard.markToken(0, 0, Nia);
Gameboard.printGameBoard();
Gameboard.markToken(0, 1, Eddy);
Gameboard.printGameBoard();
Gameboard.markToken(2, 1, Nia);
Gameboard.printGameBoard();
Gameboard.markToken(1, 0, Eddy);

// Jest testing
try {
    module.exports = Gameboard;
    // module.exports = Gameboard.gameboard.addToken;
} catch (error) {
    console.log('we got a problem chief');
}
