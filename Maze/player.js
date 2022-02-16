class Player {
  constructor() {
    this.pos = createVector(startCell.col, startCell.row);
    this.trail = [this.pos.copy()];
  }
  show() {
    strokeWeight(5);
    stroke(color("red"));
    for (let i = 0; i < this.trail.length - 1; i++) {
      line(
        this.trail[i].x * LENGTH + LENGTH / 2,
        this.trail[i].y * LENGTH + LENGTH / 2,
        this.trail[i + 1].x * LENGTH + LENGTH / 2,
        this.trail[i + 1].y * LENGTH + LENGTH / 2
      );
    }
    strokeWeight(10);
    stroke(0);
    point(this.pos.x * LENGTH + LENGTH / 2, this.pos.y * LENGTH + LENGTH / 2);
  }
  movePlayer(direction) {
    if (this.canMove(direction)) {
        // Update position
      if (direction == "U") this.pos.y--;
      else if (direction == "L") this.pos.x--;
      else if (direction == "R") this.pos.x++;
      else if (direction == "D") this.pos.y++;
      // Update trail
      if (
        this.trail.length >= 2 &&
        this.trail[this.trail.length - 2].equals(this.pos)
      )
        this.trail.splice(this.trail.length - 1, 1);
      else this.trail.push(this.pos.copy());
    }
  }
  canMove(direction) {
    let cellWalls = cells[getIndex(this.pos.y, this.pos.x)].walls;
    if (direction == "U") {
      return this.pos.y > 0 && cellWalls[0] == false;
    } else if (direction == "R") {
      return this.pos.x < SEGMENTS - 1 && cellWalls[1] == false;
    } else if (direction == "D") {
      return this.pos.y < SEGMENTS - 1 && cellWalls[2] == false;
    } else {
      return this.pos.x > 0 && cellWalls[3] == false;
    }
  }
}
