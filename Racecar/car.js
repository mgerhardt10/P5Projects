let MAX_SPEED = 2;
let max_score = 0;

class Car {
    constructor(color) {
        this.x = 150;
        this.y = 300;
        this.vel = 0;
        this.theta = 0;
        this.hitWall = false;
        this.color = color;
        this.brain = new Genome(genomeInputsN, genomeOutputsN);
        this.fitness;
        this.score = 1;
        this.lifespan = 0;
        this.dead = false;
        this.decisions = [];
        this.vision = [];
        this.linesHit = [];
        this.setImage();
    }
    clone() {
        let clone = new Car(this.color);
        clone.brain = this.brain.clone();
        return clone;
    }
    setImage() {
        if (this.color == 'G') this.sprite = carGreen;
        else if (this.color == 'P') this.sprite = carPink;
        else this.sprite = carRed;
    }
    show() {
        push();
        imageMode(CENTER);
        translate(this.x, this.y);
        rotate(this.theta);
        image(this.sprite, 0, 0, 20, 30);
        pop();
    }
    updatePosition(vel, theta, humanPlaying) {
        let speed = (this.vel + vel) > MAX_SPEED ? MAX_SPEED : (this.vel + vel) < -MAX_SPEED ? -MAX_SPEED : (this.vel + vel);
        // Find displacements
        let dx = speed * Math.sin(this.theta + theta);
        let dy = speed * -Math.cos(this.theta + theta);
        // Check valid move
        if (this.inBounds(dx, dy)) {
            // Append to position and speed
            if (this.x + dx == this.x && this.y + dy == this.y) this.dead = true;
            this.x += dx;
            this.y += dy;
            this.vel = speed;
            this.theta += theta;
            let lineHit = this.onLine();
            if (lineHit != -1 && !this.linesHit.includes(lineHit)) {
                if (lineHit == 0 && this.linesHit.length == 17) this.score += 100;
                else {
                    this.score += 10;
                    this.linesHit.push(lineHit);
                }
            } else if (lineHit != -1 && this.linesHit.includes(lineHit)) this.score--;
        } else if (humanPlaying) {
            this.vel = 0;
        } else {
            this.dead = true;
        }
    }
    inBounds(dx, dy) {
        let x = this.x + dx;
        let y = this.y + dy;
        let pixels = [
            get(x + 10, y), 
            get(x - 10, y), 
            get(x, y + 15), 
            get(x, y - 15),
        ];
        for (let i = 0; i < pixels.length; i++) {
            if (pixels[i][0] == 0 && pixels[i][1] == 0 && pixels[i][2] == 0) return false;
        }
        return true;
    }
    crossover(parent) {
        let child = new Car(this.color);
        if (parent.fitness < this.fitness) {
            child.brain = this.brain.crossover(parent.brain);
        } else {
            child.brain = parent.brain.crossover(this.brain);
        }
        child.brain.mutate();
        return child;
    }
    look () {
        this.vision = [this.x, this.y, this.theta, this.vel];
    }
    think() {
        this.decisions = this.brain.feedForward(this.vision);
    }
    move() {
        // make it based off the cubic function
        let vel = round(this.decisions[0]) > 0 ? 0.5 : round(this.decisions[0]) < 0 ? -0.5: 0;
        let theta = round(this.decisions[1]) > 0 ? 0.05 : round(this.decisions[1]) < 0 ? -0.05 : 0;
        // update the positions
        this.updatePosition(vel, theta, false);
    }
    update() {
        this.lifespan++;
        if (this.lifespan > maxLifespan) this.dead = true;
    }
    calculateFitness() {
        this.fitness = this.score;
        // this.fitness *= this.vel;
        // this.score = this.fitness;
    }
    onLine() {
        for (let i = 1; i <= checkpoints.length; i++) {
            if (checkpoints[i - 1][0] - 5 <= this.x && 
                this.x <= checkpoints[i - 1][2] + 5 && 
                checkpoints[i - 1][1] - 5 <= this.y && 
                this.y <= checkpoints[i - 1][3] + 5) {
                    return i;
            }
        }
        if (110 <= this.x && this.x <= 190 && this.y == 300) {
                return 0;
        }
        return -1;
    }
}
    