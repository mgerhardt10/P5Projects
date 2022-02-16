let SEGMENTS = 5;
let WINDOW = 700;
let LENGTH;

let cells = [];
let startCell;
let endCell;

let p1;

let gameOver = false;
let resultP;

function setup() {
  createCanvas(WINDOW, WINDOW);
  LENGTH = WINDOW / SEGMENTS;
  createCells();
  p1 = new Player();
}

function createCells() {
  cells = [];
  for (let r = 0; r < SEGMENTS; r++) {
    for (let c = 0; c < SEGMENTS; c++) {
      let newCell = new Cell(r, c);
      cells.push(newCell);
    }
  }
  createMaze(cells[0]);
  createStartAndStop();
}

function draw() {
  background(255);
  cells.forEach((cell) => cell.show());
  p1.show();
  if (p1.pos.y == endCell.row && p1.pos.x == endCell.col) {
    gameOver = true;
    resultP = createP("");
    resultP.style("font-size", "32pt");
    resultP.position(10, WINDOW + 10);
    resultP.html("You Win! - SPACE to restart, ENTER to increase difficulty");
  }
}

function findNeighbors(currCell) {
  result = [];
  let index = getIndex(currCell.row, currCell.col);
  if (currCell.row > 0) {
    // look up
    let cellUp = cells[index - SEGMENTS];
    if (!cellUp.visited) result.push(cellUp);
  }
  if (currCell.row < SEGMENTS - 1) {
    // look down
    let cellDown = cells[index + SEGMENTS];
    if (!cellDown.visited) result.push(cellDown);
  }
  if (currCell.col > 0) {
    // look left
    let cellLeft = cells[index - 1];
    if (!cellLeft.visited) result.push(cellLeft);
  }
  if (currCell.col < SEGMENTS - 1) {
    // look right
    let cellRight = cells[index + 1];
    if (!cellRight.visited) result.push(cellRight);
  }
  return result;
}

function randomColor() {
  let r = random(255);
  let g = random(100, 200);
  let b = random(100);
  return color(r, g, b, 200);
}

function createMaze(currCell) {
  currCell.visited = true;
  let neighbors = findNeighbors(currCell);
  while (neighbors.length > 0) {
    let randomNeighbor = random(neighbors);
    removeWall(currCell, randomNeighbor);
    createMaze(randomNeighbor);
    neighbors = findNeighbors(currCell);
  }
}

function getIndex(row, col) {
  return SEGMENTS * row + col;
}

function removeWall(c1, c2) {
  let diff = getIndex(c1.row, c1.col) - getIndex(c2.row, c2.col);
  if (diff == 1) {
    // random is left
    c1.toggleWall("L");
    c2.toggleWall("R");
  } else if (diff == -1) {
    // random is right
    c1.toggleWall("R");
    c2.toggleWall("L");
  } else if (diff == -SEGMENTS) {
    // random is below
    c1.toggleWall("B");
    c2.toggleWall("T");
  } else {
    // random is above
    c1.toggleWall("T");
    c2.toggleWall("B");
  }
}

function createStartAndStop() {
  let start = random(["top", "left"]);
  let indicator = randomColor();
  if (start == "top") {
    // create start
    let col = floor(random(SEGMENTS));
    startCell = cells[col];
    startCell.toggleWall("T");
    startCell.color = indicator;
    // create end on bottom
    col = floor(random(SEGMENTS));
    endCell = cells[SEGMENTS * (SEGMENTS - 1) + col];
    endCell.toggleWall("B");
    endCell.color = indicator;
  } else {
    // create start
    let row = floor(random(SEGMENTS));
    startCell = cells[SEGMENTS * row];
    startCell.toggleWall("L");
    startCell.color = indicator;
    // create end on right
    row = floor(random(SEGMENTS));
    endCell = cells[SEGMENTS * row + (SEGMENTS - 1)];
    endCell.toggleWall("R");
    endCell.color = indicator;
  }
  startEndDistance = dist(
    startCell.row,
    startCell.col,
    endCell.row,
    endCell.col
  );
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) p1.movePlayer("L");
  else if (keyCode == RIGHT_ARROW) p1.movePlayer("R");
  else if (keyCode == UP_ARROW) p1.movePlayer("U");
  else if (keyCode == DOWN_ARROW) p1.movePlayer("D");
  else if (gameOver) {
    cells = [];
    resultP.hide();
    gameOver = false;
    if (keyCode == ENTER) {
      SEGMENTS += 5;
    }
    setup();
  }
}
