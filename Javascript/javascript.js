// Author: Jorge Leonard-Pinero
// Interactive game of tic-tac-toe
// Aim:
//  To practice using module pattern
//  and factory functions in Javascript
//  having as little global code as possible.

// TCB: Testing code below
// DCB: Debugging code below
// CBUT: Code below used for testing

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

    function Diagonals() {
        let board = Gameboard.getGameBoard();
        let principal = [];
        let secondary = [];

        for (let i = 0; i < board.length; i++) {
            principal.push(board[i][i].getToken());
        }

        for (let i = 0; i < board.length; i++) {
            secondary.push(board[i][board.length - 1 - i].getToken());
        }

        const getPrimary = () => principal;
        const getSecondary = () => secondary;

        return {
            getPrimary,
            getSecondary
        }
    }


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

    return {
            getGameBoard,
            printGameBoard,
            markToken,
            Diagonals
    }
})();

function Player (playerName, playerToken) {
    const name = playerName;
    const token = playerToken;
    // const score = 0;
    
    const getName = () => name;
    const getToken = () => token;
    // const getScore = () => score;

    return {
            getName,
            getToken,
            // getScore
    };
};

// CBUT
const Eddy = Player('Eddy', 'O');
const Nia = Player('Nia', 'X');

const Game = (function (playerOne=Eddy, playerTwo=Nia) {
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
        console.log(`${getActivePlayer().getName()}'s turn.`);
        Gameboard.printGameBoard();
    }

    const playRound = (row, col) => {
        console.log(`Marking ${getActivePlayer().getName()}'s ${getActivePlayer().getToken()} token`);
        console.log();
        
        // TODO
        // Add check for row and col
        // (0 <= row|col <= 3)
        Gameboard.markToken(row, col, getActivePlayer());

        // -- Code to check for winner and handle the logic below --
        // Rows and columns
        const winnerRow = Gameboard.getGameBoard()[row].filter((cell) => (cell.getToken() === getActivePlayer().getToken())).map(cell => [cell.getToken()]);
        const winnerCol = Gameboard.getGameBoard().filter((row) => (row[col].getToken() === getActivePlayer().getToken()));

        // Primary and Secondary diagonals
        const primaryDiagonal = Gameboard.Diagonals().getPrimary().filter(token => token === getActivePlayer().getToken());
        const secondaryDiagonal = Gameboard.Diagonals().getSecondary().filter(token => token === getActivePlayer().getToken());

        // Check rows, columns and diagonals for a winner
        if ((winnerRow.length === 3) || (winnerCol.length === 3) || (primaryDiagonal.length === 3) || (secondaryDiagonal.length === 3)) {
            Gameboard.printGameBoard();
            console.log(`${getActivePlayer().getName()}'s ${getActivePlayer().getToken()}s win!`);
            return;
        }

        // Switch player turn
        switchPlayerTurn();

        // Print round on console
        printRound();
    }

    // Initial play game message when Game is called
    printRound();

    return {
        // getActivePlayer,
        playRound
    }
})();

// RUN
Game.playRound(0, 2);
Game.playRound(1, 0);
Game.playRound(1, 1);
Game.playRound(2, 0);
Game.playRound(0, 0);
Game.playRound(2, 2);
Game.playRound(2, 1);
Game.playRound(1, 2);
Game.playRound(0, 1);


// Jest testing
try {
    module.exports = Gameboard;
    // module.exports = Gameboard.gameboard.addToken;
} catch (error) {
    console.log('we got a problem chief');
}
