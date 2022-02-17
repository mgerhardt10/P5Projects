let numPoints = 100;
let points;

function setup() {
  createCanvas(700, 700);
  points = new Array(numPoints).fill(0).map(() => new Array(numPoints).fill(0));
  for (let y = 0; y < numPoints; y++) {
    for (let x = 0; x < numPoints; x++) {
      let value = floor(random(2));
      points[y][x] = value;
    }
  }
  let out = createP('Click to change a pixel, SPACE to drop a bomb');
  out.position(10, 710);
}

function draw() {
  background(0);
  strokeWeight(1);
  stroke(0);
  let length = width / numPoints;
  for (let y = 0; y < numPoints; y++) {
    for (let x = 0; x < numPoints; x++) {
      points[y][x] == 0 ? noFill() : fill(255);
      rect(x * length, y * length, length - 1, length - 1);
    }
  }
  let nextPoints = new Array(numPoints)
    .fill(0)
    .map(() => new Array(numPoints).fill(0));
  for (let y = 0; y < numPoints; y++) {
    for (let x = 0; x < numPoints; x++) {
      nextPoints[y][x] = getPoint(points, x, y);
    }
  }
  points = nextPoints;
}

function getPoint(arr, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let col = (x + i + numPoints) % numPoints;
      let row = (y + j + numPoints) % numPoints;
      sum += arr[row][col];
    }
  }
  sum -= arr[y][x];
  if (arr[y][x] == 1 && sum < 2) return 0;
  else if (arr[y][x] == 1 && (sum == 2 || sum == 3)) return 1;
  else if (arr[y][x] == 1 && sum > 3) return 0;
  else if (arr[y][x] == 0 && sum == 3) return 1;
  return 0;
}

function mouseClicked() {
  if (mouseX < width && mouseY < height) {
    let scale = width / numPoints;
    points[floor(mouseY / scale)][floor(mouseX / scale)] =
      points[floor(mouseY / scale)][floor(mouseX / scale)] == 1 ? 0 : 1;
  }
}

function keyPressed() {
    if (keyCode == 32) { // SPACE
        let x = floor(random(numPoints));
        let y = floor(random(numPoints));
        console.log(x + ' ' + y);
        for (let i = -5; i <= 5; i++) {
            for (let j = -5; j <= 5; j++) {
              let col = (x + i + numPoints) % numPoints;
              let row = (y + j + numPoints) % numPoints;
              points[row][col] = 1;
            }
          }
    }
}
