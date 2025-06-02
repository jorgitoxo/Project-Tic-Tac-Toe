const Game = (function () {
    
})();

const Gameboard = (function () {
    const gameboard = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    return { gameboard }
})();

const displayController = (function () {
    
    return {};
})();

function createPlayer(name, faction) {
    const name = name;
    const faction = faction; // there'll be 4 teams Red, Green, Blue and Yellow
    let score = 0;

    return { name, faction, score };
}
