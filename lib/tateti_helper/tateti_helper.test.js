const { initBoard, markCell, rowWin, columnWin, diagonalsWin } = require('./tateti_helper');

describe('tateti_helper:', () => {
    test('initBoard', () => {
        const board = initBoard();
        expect(board.length).toBe(9);
        board.forEach(cell => {
            expect(cell.mark).toBe('');
            expect(cell.empty).toBe(true);
            expect(cell.i).not.toBeNull();
            expect(cell.j).not.toBeNull();
            expect(cell.i).not.toBeNaN();
            expect(cell.j).not.toBeNaN();
            expect(cell.i).toBeLessThanOrEqual(2);
            expect(cell.j).toBeLessThanOrEqual(2);
            expect(cell.j).toBeGreaterThanOrEqual(0);
            expect(cell.j).toBeGreaterThanOrEqual(0);
        });
    });

    test('markCell', () => {
        const board = initBoard();
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                markCell(board, i, j, 'x');
                expect(board[i * 3 + j].mark).toBe('x');
            }
        }
    });

    test('can\'t mark a not empty cell', () => {
        const board = initBoard();
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                markCell(board, i, j, 'x');
                expect(board[i * 3 + j].mark).toBe('x');
            }
        }
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                let errorThrown = false;
                let errorMessage = '';
                try {
                    markCell(board, i, j, 'x');
                } catch(e) {
                    errorThrown = true;
                    errorMessage = (e+'');
                }
                expect(errorThrown).toBe(true);
                expect(errorMessage.toLowerCase()).toMatch('error: can\'t put your mark on a not empty cell');
            }
        }
    });

    test('rowWin, columnWin and diagonalWin with empty board', () => {
        const board = initBoard();
        for(let i = 0; i < 3; i++) {
            expect(rowWin(board, i)).toBe('');
            expect(columnWin(board, i)).toBe('');
            expect(diagonalsWin(board)).toBe('');
        }
    });
    
    test('rowWin with 0 row wins and full board', () => {
        const board = initBoard();
        board.forEach(cell => markCell(board, cell.i, cell.j, cell.j % 2 === 0 ? 'x' : 'o'));
        for(let i = 0; i < 3; i++) {
            expect(rowWin(board, i)).toBe('');
        }
    });

    test('columnWin with 0 column wins and full board', () => {
        const board = initBoard();
        board.forEach(cell => markCell(board, cell.i, cell.j, cell.i % 2 === 0 ? 'x' : 'o'));
        for(let i = 0; i < 3; i++) {
            expect(columnWin(board, i)).toBe('');
        }
    });

    test('diagnoalsWin with 0 diagonal wins and full board', () => {
        const board = initBoard();
        board.forEach(cell => markCell(board, cell.i, cell.j, cell.i % 2 === 0 ? 'x' : 'o'));
        for(let i = 0; i < 3; i++) {
            expect(diagonalsWin(board)).toBe('');
        }
    });

    test('rowWin with one row win', () => {
        const board = initBoard();
        for(let i = 0; i < 3; i++) {
            markCell(board, 0, i, 'x');
        }
        expect(rowWin(board, 0)).toBe('x');
        expect(rowWin(board, 1)).toBe('');
        expect(rowWin(board, 2)).toBe('');
    });

    test('rowWin with two row wins', () => {
        const board = initBoard();
        for(let i = 0; i < 3; i++) {
            markCell(board, 0, i, 'x');
            markCell(board, 2, i, 'x');
        }
        expect(rowWin(board, 0)).toBe('x');
        expect(rowWin(board, 1)).toBe('');
        expect(rowWin(board, 2)).toBe('x');
    });

    test('rowWin with three row wins', () => {
        const board = initBoard();
        for(let i = 0; i < 3; i++) {
            markCell(board, 0, i, 'x');
            markCell(board, 1, i, 'x');
            markCell(board, 2, i, 'x');
        }
        expect(rowWin(board, 0)).toBe('x');
        expect(rowWin(board, 1)).toBe('x');
        expect(rowWin(board, 2)).toBe('x');
    });
    
    test('columnWin with one column win', () => {
        const board = initBoard();
        for(let i = 0; i < 3; i++) {
            markCell(board, i, 2, 'x');
        }
        expect(columnWin(board, 0)).toBe('');
        expect(columnWin(board, 1)).toBe('');
        expect(columnWin(board, 2)).toBe('x');
    });

    test('columnWin with two column wins', () => {
        const board = initBoard();
        for(let i = 0; i < 3; i++) {
            markCell(board, i, 2, 'x');
            markCell(board, i, 1, 'x');
        }
        expect(columnWin(board, 0)).toBe('');
        expect(columnWin(board, 1)).toBe('x');
        expect(columnWin(board, 2)).toBe('x');
    });

    test('columnWin with three column wins', () => {
        const board = initBoard();
        for(let i = 0; i < 3; i++) {
            markCell(board, i, 2, 'x');
            markCell(board, i, 1, 'x');
            markCell(board, i, 0, 'x');
        }
        expect(columnWin(board, 0)).toBe('x');
        expect(columnWin(board, 1)).toBe('x');
        expect(columnWin(board, 2)).toBe('x');
    });
});