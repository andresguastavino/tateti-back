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

const markCell = (board, i, j, mark) => {
    const cellIndex = i * 3 + j;
    if(!board[cellIndex].empty) throw new Error('Can\'t put your mark on a not empty cell');
    board[cellIndex].empty = false;
    board[cellIndex].mark = mark;
}

const rowWin = (board, row) => {
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

const columnWin = (board, col) => {
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

const diagonalsWin = (board) => {
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

module.exports = {
    initBoard,
    markCell,
    rowWin,
    columnWin,
    diagonalsWin
}