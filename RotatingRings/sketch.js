// let numRings = 5;
let rings = [];
let LENGTH = 15;
let TOTAL_FRAMES = 500;
let counter = 0;
let numRings;
let checkbox;
let WINDOW = 700;
let totalFrames;

function setup() {
  createCanvas(WINDOW, WINDOW);
  numRings = windowWidth / LENGTH;
  for (let i = 0; i < numRings; i++) {
    rings.push(new Ring(i));
  }
  checkbox = createCheckbox("Colored", false);
  checkbox.position(10, WINDOW + 15);
  let dialog = createP('Frame scale: ');
  dialog.style('font-size', '13pt');
  dialog.position(15, WINDOW + 20);
  totalFrames = createSlider(120, 1000, 120, 10);
  totalFrames.position(110, WINDOW + 40);
}

function draw() {
  background(0);
  let percent = float(counter % totalFrames.value()) / totalFrames.value();
  let dir = 1;
  for (let i = 0; i < numRings; i++) {
    rings[i].show(percent, dir, checkbox.checked());
    dir = dir == 1 ? -1 : 1;
  }
  counter++;
}

class Ring {
  constructor(index) {
    this.numSegments = 6 * (index + 1);
    this.offset = index * LENGTH;
    this.color = this.randomColor();
  }
  show(percent, direction, colored) {
    push();
    strokeWeight(2);
    colored ? stroke(this.color) : stroke(255);
    translate(WINDOW / 2, WINDOW / 2);
    let angle = direction * map(percent, 0, 1, 0, TWO_PI);
    rotate(angle);
    for (let i = 0; i <= 2 * PI; i += (2 * PI) / this.numSegments) {
      let origin = createVector(this.offset * sin(i), this.offset * cos(i));
      let endPoint = createVector(
        (this.offset + LENGTH) * sin(i),
        (this.offset + LENGTH) * cos(i)
      );
      line(origin.x, origin.y, endPoint.x, endPoint.y);
    }
    pop();
  }
  randomColor() {
    let r = 255;
    let g = random(100, 200);
    let b = random(100, 200);
    let a = 200;
    return color(r, g, b, a);
  }
}
