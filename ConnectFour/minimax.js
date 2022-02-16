// Mitch Gerhardt
// Feb. 2022
// Connect 4 with AI Minimax

function findAvailableSpaces() {
    let spaces = [];
    for (let y = h - 1; y >= 0; y--) {
        for (let x = 0; x < w; x++) {
            // Either piece below and space empty or bottom row and space empty
            if (board[y][x] == 0 && y == h - 1) spaces.push({y, x});
            else if (board[y][x] == 0 && y < h - 1 && board[y + 1][x] !== 0) spaces.push({y, x});
        }
    }
    // console.log(spaces);
    return spaces;
}

function bestMove() {
    if (currentPlayer == 2) {
        let move;
        let spaces = findAvailableSpaces();
        console.log(spaces);
        let bestScore = -Infinity;
        spaces.forEach(space => {
            board[space.y][space.x] = 2;
            let score = minimax(board, 5, -Infinity, Infinity, 1, false);
            board[space.y][space.x] = 0;
            if (score > bestScore) {
                bestScore = score;
                move = space;
            }
        });
        board[move.y][move.x] = 2;
        currentPlayer = 1;
    }   
}

function scoreWindow(window) {
    let score = 0, aiCount = 0, humanCount = 0, emptyCount = 0;
    window.forEach(item => {
        if (item == 0) emptyCount++;
        else if (item == 1) humanCount++;
        else aiCount++;
    });
    // Count total ai in the window
    if (aiCount == 4) score += 10000
    else if (aiCount == 3 && emptyCount == 1) score += 100;
    else if (aiCount == 2 && emptyCount == 2) score += 10;
    else if (aiCount == 1 && emptyCount == 3) score += 1;
    // Count total human in the window
    if (humanCount == 4) score -= 10000;
    else if (humanCount == 3 && emptyCount == 1) score -= 100;
    else if (humanCount == 2 && emptyCount == 2) score -= 10;
    else if (humanCount == 1 && emptyCount == 3) score -= 1;
    // Return the score
    return score;
}

function scoreBoard(board) {
    let score = 0;
    // score the center column
    let centerColumn = board.map(values => values[floor(w/2)]);
    let centerCount = centerColumn.filter(item => item == 2).length;
    score += centerCount * 3;
    // score vertical
    for (let x = 0; x < w; x++) {
        let column = board.map(value => value[x]);
        for (let y = 0; y < h - 3; y++) {
            let window = column.slice(y, y + 4);
            score += scoreWindow(window);
        }
    }
    // score horizontal
    for (let y = 0; y < h; y++) {
        let row = board[y];
        for (let x = 0; x < w - 3; x++) {
            let window = row.slice(x, x + 4);
            score += scoreWindow(window);
        }
    }
    // score diagonal right
    for (let y = 0; y < h - 3; y++) {
        for (let x = 0; x < w - 3; x++) {
            let window = [board[y][x], board[y + 1][x + 1], board[y + 2][x + 2], board[y + 3][x + 3]];
            score += scoreWindow(window);
        }
    }
    // score diagonal left
    for (let y = 0; y < h - 3; y++) {
        for (let x = w - 1; x > 2; x--) {
            let window = [board[y][x], board[y + 1][x - 1], board[y + 2][x - 2], board[y + 3][x - 3]];
            score += scoreWindow(window);
        }
    }

    return score;
}

let scores = {
    0: 0,
    1: -1000000000,
    2: 1000000000,
};

function minimax(board, depth, alpha, beta, num_moves, isMax) {
    let result = checkWinner();
    if (result !== null) {
        return result == 0 ? -50 * num_moves : scores[result] - 20 * num_moves;
    } else if (depth == 0) {
        return scoreBoard(board);
    }
    let spaces = findAvailableSpaces();
    if (isMax) {
        let bestScore = -Infinity;
        for (let i = 0; i < spaces.length; i++) {
            let x = spaces[i].x;
            let y = spaces[i].y;
            board[y][x] = 2;
            let score = minimax(board, depth - 1, alpha, beta, num_moves + 1, false);
            board[y][x] = 0;
            score = max(score, bestScore);
            alpha = max(alpha, bestScore);
            if (alpha >= beta) break;
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < spaces.length; i++) {
            let x = spaces[i].x;
            let y = spaces[i].y;
            board[y][x] = 1;
            let score = minimax(board, depth - 1, alpha, beta, num_moves + 1, true);
            board[y][x] = 0;
            score = min(score, bestScore);
            beta = min(beta, bestScore);
            if (alpha >= beta) break;
        }
        return bestScore;
    }

}
