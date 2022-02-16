class Cell {
    constructor(row, col) {
        // Set row, col, and visited
        this.row = row;
        this.col = col;
        this.visited = false;
        this.color = color(255);
        this.walls = [true, true, true, true];
    }
    toggleWall(wall) {
        if (wall == 'T') this.walls[0] = !this.walls[0];
        else if (wall == 'R') this.walls[1] = !this.walls[1];
        else if (wall == 'B') this.walls[2] = !this.walls[2];
        else this.walls[3] = !this.walls[3];
    }
    show() {
        noStroke();
        fill(this.color);
        rect(this.col * LENGTH, this.row * LENGTH, LENGTH, LENGTH);
        stroke(color('black'));
        strokeWeight(4);
        if (this.walls[0]) line(this.col * LENGTH, this.row * LENGTH, this.col * LENGTH + LENGTH, this.row * LENGTH);
        if (this.walls[1]) line(this.col * LENGTH + LENGTH, this.row * LENGTH, this.col * LENGTH + LENGTH, this.row * LENGTH + LENGTH);
        if (this.walls[2]) line(this.col * LENGTH, this.row * LENGTH + LENGTH, this.col * LENGTH + LENGTH, this.row * LENGTH + LENGTH);
        if (this.walls[3]) line(this.col * LENGTH, this.row * LENGTH, this.col * LENGTH, this.row * LENGTH + LENGTH);
    }
}