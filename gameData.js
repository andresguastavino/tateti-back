const initBoard = () => {
    const board = [];
    for(let i = 0; i < 9; i++) {
        board[i] = {
            mark: '',
            empty: true,
            i: Math.floor(i / 3),
            j: i % 3
        }
    }

    return board;
}

const initGameData = () => {
    return {
        players: [],
        board: initBoard(),
        moves: 0,
        games: 0,
        winner: '',
        winnerMark: '',
        isGameReady: false,
        isGameStarted: false,
        isGameOver: false
    };
}

const updateGameData = (gameData, playerMoveData) => {
    const { i, j, mark } = playerMoveData;
    const { board, isGameReady, isGameOver } = gameData;

    // if(isGameReady) {
    //     throw new Error('Invalid move: Game has not started yet');
    // }
    // if(isGameOver) {
    //     throw new Error('Invalid move: Game is already over');
    // }
    if(!board[i][j].empty) {
        throw new Error('Invalid move: That cell is not empty');
    }

    gameData.board[i][j] = mark;
    gameData.moves = gameData.moves+1;
    for(let i = 0; i < 3; i++) {
        let winnerMark = rowWin(i) || columnWin(i) || diagonalsWin();
        if(winnerMark) {
            gameData.isGameOver = true;
            gameData.winnerMark = winnerMark;
            break;
        }
    }

    return gameData;
}

const rowWin = (row) => {
    if(!board.length) return;
    const frstCellRow = row * 3;
    const scndCellRow = row * 3 + 1;
    const thrdCellRow = row * 3 + 2;
    if((!board[frstCellRow].empty && !board[scndCellRow].empty && !board[thrdCellRow].empty)
        && ((board[frstCellRow].mark === board[scndCellRow].mark) 
            && (board[frstCellRow].mark === board[thrdCellRow].mark))
    ) {
        return board[frstCellRow].mark;
    }

    return '';
}

const columnWin = (col) => {
    if(!board.length) return;
    const frstCellCol = col;
    const scndCellCol = col + 3;
    const thrdCellCol = col + 6;
    if((!board[frstCellCol].empty && !board[scndCellCol].empty && !board[thrdCellCol].empty)
        && ((board[frstCellCol].mark === board[scndCellCol].mark) 
            && (board[frstCellCol].mark === board[thrdCellCol].mark))
    ) {
        return board[frstCellCol].mark;
    }

    return '';
}

const diagonalsWin = () => {
    if(!board.length) return;
    if((!board[0].empty && !board[4].empty && !board[8].empty) 
        && ((board[0].mark === board[4].mark) 
            && (board[0]?.mark === board[8]?.mark)) 
    )  {
        return board[0].mark;
    } 
    if((!board[2].empty && !board[4].empty && !board[6].empty) 
        && ((board[2].mark === board[4].mark) 
            && (board[2]?.mark === board[6]?.mark)) 
    )  {
        return board[2].mark;
    } 
    return '';
}

const choosePlayerStarts = (gameData) => {
    const { isGameReady } = gameData; 

    if(isGameReady) {
        throw new Error('Can\'t select which player starts becuase game is not ready yet');
    }
    const randomPlayer = Math.floor(Math.random() * 2);
    gameData.players[randomPlayer].starts = true;
    return gameData;
}

module.exports = {
    initGameData,
}