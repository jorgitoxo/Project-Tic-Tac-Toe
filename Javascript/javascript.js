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
    
    // Method of getting entire game board,
    // that the UI will eventually need to render it
    const getGameBoard = () => gameboard;
    
    function Cell () {
        let tokenInCell = "";

        const getToken = () => tokenInCell;

        const addToken = (player) => {
            tokenInCell = player.getToken();
        }

        const isEmpty = () => {
            return !tokenInCell;
        }

        return {
            getToken,
            addToken,
            isEmpty
        }
    }

    const buildGameBoard = function() {
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
    }

    function Diagonals() {
        let board = Gameboard.getGameBoard();
        let principal = [];
        let secondary = [];

        // Gather elements along main diagonal
        for (let i = 0; i < board.length; i++) {
            principal.push(board[i][i].getToken());
        }

        // Gather elements along secondary diagonal
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

    // Show the content of the gameboard object in the console
    // const logGameBoard = () => console.log(gameboard.map((row) => row.map((cell) => cell.getToken())));
    const logGameBoard = () => {
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
        if (gameboard[xAxis][yAxis].getToken() !== "") return;
        gameboard[xAxis][yAxis].addToken(player);
    }

    // Build the board for the first time!
    buildGameBoard();

    return {
        buildGameBoard,
        getGameBoard,
        logGameBoard,
        Diagonals,
        markToken,
    }
})();

function Player (playerName, playerToken) {
    let name = playerName;
    const token = playerToken;
    // const score = 0;
    
    const getName = () => name;
    const getToken = () => token;
    // const getScore = () => score;

    const setName = (playerName) => {
        name = playerName;
    }

    return {
            getName,
            getToken,
            setName
            // getScore
    };
};

const Game = (function () {
    let PlayerOne = Player('Eddy', 'O');
    let PlayerTwo = Player('Nia', 'X');

    const players = [
        PlayerOne,
        PlayerTwo
    ];
    
    let activePlayer = players[0];
    let gameWinner = "";
    
    const getPlayers = () => players;
    const getActivePlayer = () => activePlayer;
    const getGameWinner = () => gameWinner;
    
    const setGameWinner = (player) => {
        gameWinner = player;
    }
    
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const printRound = () => {
        Gameboard.logGameBoard();
        console.log(`${getActivePlayer().getName()}'s turn.`);
    }

    const playRound = (row, col) => {
        if (!!Game.getGameWinner()) {
            console.log(`Game over! ${Game.getGameWinner().getName()}'s ${Game.getGameWinner().getToken()}s won.`);
            return;
        }
        // Check for valid values for row and col (0 <= row|col <= 3) -- IF method
        if ((row > 2 || col > 2) || (!Gameboard.getGameBoard()[row][col].isEmpty())){
            console.log("Ilegal move! Stay within gameboard bounds or cell already in use.");
            console.log(`${getActivePlayer().getName()}, try again.`);
            console.log();
            return;
        }

        console.log(`Marking ${getActivePlayer().getName()}'s ${getActivePlayer().getToken()} token...`);

        const results = ["Player move", "Player win", "Tie"];
        let roundResults = results[0];
        const getRoundResults = () => roundResults;

        let availableCellsCount = [].concat(...Gameboard.getGameBoard()).filter((cell) => cell.getToken() === "").length;
        const getAvailableCellsCount = () => availableCellsCount;

        // Mark token in gameboard array and show the updated board on screen
        Gameboard.markToken(row, col, getActivePlayer());
        availableCellsCount -= 1;
        displayController.showBoard();

        // -- Start of code to check for winner and handle the logic -- //
        // Rows and columns
        const activeRow = Gameboard.getGameBoard()[row].filter((cell) => (cell.getToken() === getActivePlayer().getToken())).map(cell => [cell.getToken()]);
        const activeCol = Gameboard.getGameBoard().filter((row) => (row[col].getToken() === getActivePlayer().getToken()));

        // Primary and Secondary diagonals
        const primaryDiagonal = Gameboard.Diagonals().getPrimary().filter(token => token === getActivePlayer().getToken());
        const secondaryDiagonal = Gameboard.Diagonals().getSecondary().filter(token => token === getActivePlayer().getToken());

        // Check for a winner along the rows, columns and diagonals
        if ((activeRow.length === 3) || (activeCol.length === 3) || (primaryDiagonal.length === 3) || (secondaryDiagonal.length === 3)) {
            // console testing
            Gameboard.logGameBoard();
            console.log(`${getActivePlayer().getName()}'s ${getActivePlayer().getToken()}s win!`);
            //
            setGameWinner(getActivePlayer());
            roundResults = results[1];
            return;
        } else if (!availableCellsCount) {
            // console testing
            Gameboard.logGameBoard();
            console.log("Game is a tie!");
            //
            roundResults = results[2]
            return;
        }
        // -- End of code to check for winner and handle the logic -- //

        // Switch player turn
        switchPlayerTurn();
        // Print round on console
        printRound();

        return {
            getRoundResults,
            getAvailableCellsCount,
        }
    }

    // Initial play game message when Game is called
    printRound();

    return {
        playRound,
        getActivePlayer,
        getGameWinner,
        getPlayers
    }
})();

const displayController = (function() {
    const players = {
        playerOne:Game.getPlayers()[0],
        playerTwo:Game.getPlayers()[1]
    }

    const showBoard = function () {
        const cells = [].concat(...Gameboard.getGameBoard());
        const board = document.querySelector("#gameboard");
        board.replaceChildren();
        
        cells.forEach((cell) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add('cell');
            cellElement.textContent = cell.getToken();
            board.appendChild(cellElement);
        });
    }

    // Initializes click event handler on gameboard
    const markCells = (function () {
        const board = document.querySelector("#gameboard");
        board.addEventListener('click', (e) => {
            const cellPos = [...board.children].indexOf(e.target);
            const boardRows = Gameboard.getGameBoard().length;
            const row = Math.floor(cellPos / boardRows);
            const col = cellPos % boardRows;
            Game.playRound(row, col);
        });
    })();

    // Show current player names on screen
    const showPlayersNames = function () {
        const playerOne = document.querySelector(`#${Object.getOwnPropertyNames(players)[0]}`);
        const playerTwo = document.querySelector(`#${Object.getOwnPropertyNames(players)[1]}`);

        playerOne.textContent = players.playerOne.getName();
        playerTwo.textContent = players.playerTwo.getName();
    }

    // Dialog window for players to enter their names
    const playerNameModal = function (player) {
        const playerNameBtn = document.getElementById(`${player}NameBtn`);
        const dialogModal = document.querySelector(`#${player}NameBtn + dialog`);
        const modalForm = document.querySelector(`#${player}NameForm`);
        const modalCloseBtn = document.getElementById(`${player}CloseButton`);
        const formPlayerName = document.querySelector(`#${player}Name`);
        const formOKBtn = document.querySelector(`#${player}NameForm > button`);

        const resetClose = function () {
            modalForm.reset();
            dialogModal.close();
        }

        playerNameBtn.addEventListener("click", () => {
            dialogModal.showModal();
            return;
        });

        // Handles close action on button event
        modalCloseBtn.addEventListener("click", () => {
            resetClose();
            return;
        });

        // Handles name change action on OK button event
        formOKBtn.addEventListener("click", () => {
            players[`${player}`].setName(formPlayerName.value);
            showPlayersNames();
            resetClose();
            return;
        });
    };

    const resetGame = (function() {
        const newGameBtn = document.querySelector('#newGameBtn');

        newGameBtn.addEventListener('click', () => {
            Gameboard.buildGameBoard();
            showBoard();
        })
    })();

    // Call to display the gameboard on screen for the first time
    showBoard();
    // Call to display the players' names on screen for the first time
    showPlayersNames();
    
    // Handles players' name change
    const playerOneNameModal = playerNameModal("playerOne");
    const playerTwoNameModal = playerNameModal("playerTwo");

    return {
        showBoard
    }
})();


// Jest testing
try {
    // module.exports = Gameboard;
    // module.exports = Gameboard.gameboard.addToken;
} catch (error) {
    console.log('we got a problem chief');
}
