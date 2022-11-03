const { initBoard } = require('../tateti_helper/tateti_helper');

const initGame = (players) => {
    return {
        board: initBoard(),
        players: pickStarter(players),
        movesCount: 0,
        gamesCount: 0,
        gameStarted: true,
        gameOver: false
    };
}

const pickStarter = (players) => {
    const randomNumb = Math.floor(Math.random() * players.length);
    return [
        players[randomNumb],
        players[randomNumb === 0 ? 1 : 0]
    ];
}

module.exports = {
    initGame,
}