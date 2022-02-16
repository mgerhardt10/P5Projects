// Mitch Gerhardt
// Feb. 2022
// Connect 4 with AI Minimax

let w = 7;
let h = 6;
let scale = 100;
let currentPlayer = 2; // human to start
let finished = false;
let board = new Array(h).fill(0).map(() => new Array(w).fill(0));
let resultP;

function setup() {
    createCanvas(700, 600);
    frameRate(60);
    ellipseMode(CORNER);
    textSize(32);
}

function draw() {
    background(255);
    generateBoard();
    let result = checkWinner();
    if (result !== null && !finished) {
        resultP = createP('');
        resultP.style('font-size', '32pt');
        let out = result == 0 ? 'Tie!' : result == 1 ? 'Player 1 Wins!' : 'Player 2 Wins!';
        resultP.html(out + ' - Press space to restart');
        finished = true;
    }
    bestMove();
}

function nextSpace(x) {
    for (let y = h - 1; y >= 0; y--) {
        if (board[y][x] == 0) return y;
    }
    return -1;
}

function mousePressed() {
    if (currentPlayer == 1) {
        let x = floor(mouseX / scale);
        let y = nextSpace(x)
        let onBoard = x < w && mouseY / scale < h;
        if (onBoard && y !== -1 && board[y][x] == 0) {
            board[y][x] = 1;
            currentPlayer = 2;
        }
    }
}

function keyPressed() {
    if (finished && key == ' ') {
        board = new Array(h).fill(0).map(() => new Array(w).fill(0));
        finished = false;
        resultP.hide();
        setup();
    }
}

function equal4(a, b, c, d) {
    return a == b && a == c && a == d;
}

function connect4(j, i, direction) {
    switch (direction) {
        case 'right':
            return equal4(board[j][i], board[j][i + 1], board[j][i + 2], board[j][i + 3]);
        case 'down':
            return equal4(board[j][i], board[j + 1][i], board[j + 2][i], board[j + 3][i]);
        case 'diag-right':
            return equal4(board[j][i], board[j + 1][i + 1], board[j + 2][i + 2], board[j + 3][i + 3]);
        case 'diag-left':
            return equal4(board[j][i], board[j + 1][i - 1], board[j + 2][i - 2], board[j + 3][i - 3]);
        default:
            console.error('Invalid direction provided');

    }
}

function checkWinner() {
    // Check if connect 4
    for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
            spot = board[j][i];
            if (spot !== 0) {
                if (i < w - 3 && connect4(j, i, 'right')) {
                    return spot;
                } else if (j < h - 3 && connect4(j, i, 'down')) {
                    return spot;
                } else if (j < h - 3 && i < w - 3 && connect4(j, i, 'diag-right')) {
                    return spot;
                } else if (j < h - 3 && i > 2 && connect4(j, i, 'diag-left')) {
                    return spot;
                }
            }
        }
    }
    // Check if available spaces
    let openSpots = 0;
    for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
            let spot = board[j][i];
            if (spot == 0) openSpots++;
        }
    }
    return openSpots == 0 ? 0 : null;
}

function generateBoard() {
    for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
            fill(255);
            rect(i*scale, j*scale, scale, scale);
            let spot = board[j][i];
            let offset = scale / 10;
            if (spot > 0) {
                fill(spot == 1 ? color('yellow') : color('red'));
                ellipse(i*scale + (offset / 2), j*scale + (offset / 2), scale - offset);
            }
        }
    }
}

