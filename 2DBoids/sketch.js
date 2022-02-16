// Mitch Gerhardt
// Feb 2022
// Boids

let SIDE = 400;
let flock = [];

function setup() {
  // Create canvas
  let canvas = createCanvas(SIDE * 2, SIDE);
  canvas.parent("canvascontainer");
  // Create flock
  for (let i = 0; i <= 100; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(255);
  createBox();
  // Get slider values
  let perceptionValue = parseFloat(
    document.getElementById("perceptionSlider").value
  );
  document.getElementById("percep").innerHTML = perceptionValue;
  let separationValue = parseFloat(
    document.getElementById("separationSlider").value
  );
  document.getElementById("sep").innerHTML = separationValue;
  let cohesionValue = parseFloat(
    document.getElementById("cohesionSlider").value
  );
  document.getElementById("cohes").innerHTML = cohesionValue;
  let alignmentValue = parseFloat(
    document.getElementById("alignmentSlider").value
  );
  document.getElementById("align").innerHTML = alignmentValue;
  // Update flock
  for (let boid of flock) {
    boid.update(
      flock,
      perceptionValue,
      cohesionValue,
      separationValue,
      alignmentValue
    );
    boid.show();
  }
}

function createBox() {
  rectMode(CORNER);
  strokeWeight(5);
  stroke(0);
  noFill();
  rect(0, 0, SIDE * 2, SIDE);
}
