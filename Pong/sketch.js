let playerScore = 0,
  aiScore = 0;
let MAX_SCORE = 5;
let gamePaused = false;
let gameOver = false;
let c;
let font;
let player, ai;
let startDir = -1; // 1 = left, -1 = right
let ball;
let difficulty = 0.8;

function preload() {
  font = loadFont("Attari_Font.ttf");
}

function setup() {
  createCanvas(700, 400);
  c = color(173, 176, 184);
  rectMode(CENTER);
  player = new Player();
  ai = new Ai();
  ball = new Ball(startDir, difficulty);
}

function draw() {
  background(0);
  createBoard();
  player.show();
  ai.show();
  ball.show();
  if (!gamePaused && !gameOver) {
    if (keyIsDown(DOWN_ARROW)) {
      player.translate("D");
    } else if (keyIsDown(UP_ARROW)) {
      player.translate("U");
    }
    ball.update(player.pos, ai.pos);
    if (ball.pos.x <= width / 2) {
      let desiredY = ball.calculateTrajectory();
      ai.move(desiredY);
    }
    let point = ball.pointScored();
    if (point != -1) {
      if (point == 1) playerScore++;
      else aiScore++;
      startDir = startDir == 1 ? -1 : 1;
      if (ball.numHits >= 5) difficulty += 0.1;
      ball = new Ball(startDir, difficulty);
    }
  }
  if (playerScore == 5 || aiScore == 5) {
    gameOver = true;
    textSize(32);
    textAlign(LEFT);
    let winner = playerScore == 5 ? 'Player wins! Press ENTER to play again' : 'AI wins! Press ENTER to play again';
    text(winner, 20, height - 20);
  }
}

function createBoard() {
  // Draw barrier
  for (let i = 0; i < height; i += 35) {
    fill(c);
    noStroke();
    rect(width / 2, i, 15, 20);
  }
  // Draw walls
  stroke(c);
  strokeWeight(15);
  line(0, 0, width, 0);
  line(0, 0, 0, height);
  line(width, 0, width, height);
  line(0, height, width, height);
  // Draw scores
  textSize(56);
  textAlign(CENTER);
  textFont(font);
  noStroke();
  // stroke(0);
  text(aiScore, width / 2 - 50, 55);
  text(playerScore, width / 2 + 50, 55);
  // If game is paused
  if (gamePaused && !gameOver) {
    textSize(32);
    textAlign(LEFT);
    text("Paused - press P to continue", 20, height - 20);
  }
}

function keyPressed() {
  if (key == "p" || key == "P") {
    gamePaused = !gamePaused;
  } else if (keyCode == ENTER) {
    gameOver = false;
    playerScore = 0;
    aiScore = 0;
  }
}
