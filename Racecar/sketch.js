let cycles;
let population1, population2, population3;
let p1 = 0, p2 = 0, p3 = 0;
let carRed, carPink, carGreen;
let maxLifespan = 5000;

let car;

let checkpoints = [];

let humanPlaying = false;

function preload() {
    carRed = loadImage('images/car_red.png');
    carPink = loadImage('images/car_pink.png');
    carGreen = loadImage('images/car_green.png');
}

function setup() {
    let canvas = createCanvas(700, 600);
    canvas.parent('canvascontainer');
    imageMode(CENTER);
    if (humanPlaying) car = new Car(random(['G', 'P', 'R']));
    else {
        population1 = new Population(10, 'G');
        population2 = new Population(10, 'P');
        population3 = new Population(10, 'R');
    }
    registerCheckpoints();
}

function draw() {
    cycles = document.getElementById('speedSlider').value;
    document.getElementById('speed').innerHTML = cycles;
    document.getElementById('fr').innerHTML = parseFloat(frameRate()).toFixed(0);

    if (!humanPlaying) {
        document.getElementById('currGen').innerHTML = population1.generation;
        document.getElementById('bestFitness').innerHTML = bestFitness;
    } else {
        document.getElementById('currGen').innerHTML = 'N/A';
        document.getElementById('bestFitness').innerHTML = 'N/A';
    }

    if (cycles != 0) {
        background(255);
        createRacetrack();
    }

    if (humanPlaying) {
        let vel = 0;
        let theta = 0;
        if (keyIsDown(UP_ARROW)) vel += 0.5;
        if (keyIsDown(RIGHT_ARROW)) theta += 0.05;
        if (keyIsDown(DOWN_ARROW)) vel -= 0.5;
        if (keyIsDown(LEFT_ARROW)) theta -= 0.05;
        if (car.vel > 0) vel -= 0.25;
        else if (car.vel < 0) vel += 0.25;
        car.updatePosition(vel, theta, true);
        car.show();
    } else {
        for (let i = 0; i < cycles; i++) {
            // ai takeover
            if (!population1.done()) population1.updateAlive(i == 0);
            if (!population2.done()) population2.updateAlive(i == 0);
            if (!population3.done()) population3.updateAlive(i == 0);
            else {

                let max = Math.max(population1.getAverageScore(), population2.getAverageScore(), population3.getAverageScore());
                if(max == population1.getAverageScore())
                    p1++;
                else if(max == population2.getAverageScore())
                    p2++;
                else if(max == population3.getAverageScore())
                    p3++;

                document.getElementById('red').innerHTML = p1;
                document.getElementById('green').innerHTML = p2;
                document.getElementById('pink').innerHTML = p3;

                population1.naturalSelection();
                population2.naturalSelection();
                population3.naturalSelection();

            }
        }
    }

}

function createRacetrack() {
    // Fill in track
    fill(color(127, 128, 153));
    noStroke();
    rect(100, 100, 500, 200);
    rect(100, 300, 400, 200);
    // Create borders
    strokeWeight(10);
    stroke(0);
    line(100, 100, 600, 100);
    line(600, 100, 600, 300);
    line(600, 300, 500, 300);
    line(500, 300, 500, 500);
    line(500, 500, 100, 500);
    line(100, 500, 100, 100);
    line(200, 200, 500, 200);
    line(200, 200, 200, 400);
    line(400, 200, 400, 400);
    line(300, 500, 300, 300);
    // Create start/finish
    stroke(color('red'));
    line(110, 300, 190, 300);
    checkpoints.forEach(cp => {
        stroke(color(255, 204, 0, 100));
        line(cp[0], cp[1], cp[2], cp[3]);
    });
}

function registerCheckpoints() {
    for (let y = 200; y <= 400; y += 50) {
        for (let x = 100; x <= 500; x += 100) {
            if ((x == 100 || x == 500) && y == 200) checkpoints.push([x + 10, y, x + 90, y]);
            else if(x < 500 && x > 100 && y >= 300) checkpoints.push([x + 10, y, x + 90, y]);
        }
    }
    checkpoints.push([110, 400, 190, 400]);
    checkpoints.push([110, 250, 190, 250]);
    checkpoints.push([110, 350, 190, 350]);
    for (let y = 100; y <= 400; y += 100) {
        for (let x = 200; x <= 500; x += 50) {
            if (y == 100 && x >= 200 && x <= 500) checkpoints.push([x, y + 10, x, y + 90]);
            else if (y == 400 && (x == 200 || x == 400)) checkpoints.push([x, y + 10, x, y + 90]);
            else if (y == 200 && (x == 300 || x == 500)) checkpoints.push([x, y + 10, x, y + 90]);
        }
    }
    // diagonals
    checkpoints.push([110, 110, 195, 195]);
    checkpoints.push([505, 195, 590, 110]);
    checkpoints.push([505, 205, 590, 290]);
    checkpoints.push([410, 210, 495, 295]);
    checkpoints.push([210, 210, 295, 295]);
    checkpoints.push([205, 405, 290, 490]);
    checkpoints.push([405, 405, 490, 490]);
    checkpoints.push([305, 295, 390, 210]);
    checkpoints.push([395, 405, 310, 490]);
    checkpoints.push([195, 405, 110, 490]);
}

function keyPressed() {
    if (keyCode == OPTION) {
        console.log(car.x + ' ' + (car.y));
    } else if (keyCode == ENTER) {
        console.log(car.sprite.width + ' ' + car.sprite.height);
    }
}
