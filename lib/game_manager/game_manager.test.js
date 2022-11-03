const { initGame } = require('./game_manager');

describe('game_manager:', () => {
    test('initGame without users', () => {
        const gameData = initGame();
        expect(gameData.board).toHaveLength(9);
        expect(gameData.users).toHaveLength(0);
        expect(gameData.movesCount).toBe(0);
        expect(gameData.gamesCount).toBe(0);
        expect(gameData.gameReady).toBe(false);
        expect(gameData.gameStarted).toBe(false);
        expect(gameData.gameOver).toBe(false);
    });

    test('initGame with one user', () => {
        const users = [ { name: 'john' } ];
        const gameData = initGame(users);
        expect(gameData.board).toHaveLength(9);
        expect(gameData.users).toHaveLength(1);
        expect(gameData.movesCount).toBe(0);
        expect(gameData.gamesCount).toBe(0);
        expect(gameData.gameReady).toBe(false);
        expect(gameData.gameStarted).toBe(false);
        expect(gameData.gameOver).toBe(false);
    });

    test('initGame with users', () => {
        const users = [ { name: 'john' }, { name: 'pepe' } ];
        const gameData = initGame(users);
        expect(gameData.board).toHaveLength(9);
        expect(gameData.users).toHaveLength(2);
        expect(gameData.movesCount).toBe(0);
        expect(gameData.gamesCount).toBe(0);
        expect(gameData.gameReady).toBe(true);
        expect(gameData.gameStarted).toBe(false);
        expect(gameData.gameOver).toBe(false);
    });

    test('startGame', () => {
        const users = [ { name: 'john' }, { name: 'pepe' } ];
        const gameData = initGame(users);
        startGame(gameData);
        setTimeout(() => expect(gameData.gameStarted).toBe(true), 5000);
    });

    test('gameUpdate', () => {
        const users = [ { name: 'john' }, { name: 'pepe' } ];
        const gameData = initGame(users);
    });
});