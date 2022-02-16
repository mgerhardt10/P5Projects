// Mitch Gerhardt
// Feb 2022
// Boids

let MAX_SPEED = 5;
let MAX_FORCE = 0.5;

class Boid {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(1, MAX_SPEED));
    this.acc = createVector();
    this.color = this.randomColor();
  }
  randomColor() {
    let r = random(255);
    let g = random(100, 200);
    let b = random(100);
    return color(r, g, b, 200);
  }
  show() {
    this.move();
    strokeWeight(10);
    stroke(this.color);
    point(this.pos);
  }
  move() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(MAX_SPEED);
    if (this.pos.x > width) this.pos.x = 0;
    else if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    else if (this.pos.y < 0) this.pos.y = height;
    this.acc.mult(0);
  }
  update(
    flock,
    perceptionValue,
    cohesionValue,
    separationValue,
    alignmentValue
  ) {
    let alignVector = createVector();
    let cohVector = createVector();
    let sepVector = createVector();
    let total = 0;
    for (let other of flock) {
      let distance = p5.Vector.dist(this.pos, other.pos);
      if (distance < perceptionValue && other != this) {
        alignVector.add(other.vel);
        cohVector.add(other.pos);
        let diff = p5.Vector.sub(this.pos, other.pos);
        diff.div(distance * distance);
        sepVector.add(diff);
        total++;
      }
    }
    if (total > 0) {
      alignVector.div(total);
      alignVector.setMag(MAX_SPEED);
      alignVector.sub(this.vel);
      alignVector.limit(MAX_FORCE);
      alignVector.mult(alignmentValue);

      cohVector.div(total);
      cohVector.sub(this.pos);
      cohVector.setMag(MAX_SPEED);
      cohVector.sub(this.vel);
      cohVector.limit(MAX_FORCE);
      cohVector.mult(cohesionValue);

      sepVector.div(total);
      sepVector.setMag(MAX_SPEED);
      sepVector.sub(this.vel);
      sepVector.limit(MAX_FORCE);
      sepVector.mult(separationValue);

      this.acc.add(alignVector);
      this.acc.add(cohVector);
      this.acc.add(sepVector);
    }
  }
}
