const { initBoard } = require('../tateti_helper/tateti_helper');

const initGame = (users) => {
    return {
        board: initBoard(),
        users,
        movesCount: 0,
        gamesCount: 0,
        gameStarted: true,
        gameOver: false
    };
}

module.exports = {
    initGame,
}