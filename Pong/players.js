let MAX_SPEED = 5;

class Player {
  constructor() {
    this.pos = createVector(width - 25, height / 2);
  }
  show() {
    noStroke();
    fill(c);
    rect(this.pos.x, this.pos.y, 15, 70);
  }
  translate(dir) {
    if (dir == "U" && this.pos.y > 50) this.pos.y -= 5;
    else if (dir == "D" && this.pos.y < height - 50) this.pos.y += 5;
  }
}

class Ai {
  constructor() {
    this.pos = createVector(25, height / 2);
  }
  show() {
    noStroke();
    fill(c);
    rect(this.pos.x, this.pos.y, 15, 70);
  }
  move(desiredY) {
    if (desiredY > this.pos.y + 30 && this.pos.y < height - 50)
      this.pos.y += 5;
    else if (desiredY < this.pos.y - 30 && this.pos.y > 50)
      this.pos.y -= 5;
  }
}

class Ball {
  constructor(startDir, difficulty = 0.8) {
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(
      startDir * MAX_SPEED * difficulty,
      random(-MAX_SPEED * difficulty, MAX_SPEED * difficulty)
    );
    this.numHits = 0;
  }
  show() {
    noStroke();
    fill(c);
    rect(this.pos.x, this.pos.y, 15, 15);
  }
  update(playerPos, aiPos) {
    if (this.pos.y + this.vel.y < 10 || this.pos.y + this.vel.y > height - 15) {
      this.vel.y = -this.vel.y;
    }
    if (
      this.pos.x + 7 >= playerPos.x &&
      this.pos.y >= playerPos.y - 41 &&
      this.pos.y <= playerPos.y + 41
    ) {
      this.vel.x = -this.vel.x;
    } else if (
      this.pos.x - 7 <= aiPos.x &&
      this.pos.y >= aiPos.y - 41 &&
      this.pos.y <= aiPos.y + 41
    ) {
      this.numHits++;
      this.vel.x = -this.vel.x;
    }
    this.pos.add(this.vel);
  }
  pointScored() {
    if (this.pos.x < 0) return 1;
    else if (this.pos.x > width) return 2;
    else return -1;
  }
  calculateTrajectory() {
    let m = this.vel.y / this.vel.x;
    let yf = m * (32 - this.pos.x) + this.pos.y;
    return yf;
  }
}

// change log
// - add difficulty iwth ball speed, player sppeed, and player size
// - add restart
