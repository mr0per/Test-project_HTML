let circleSize, halfSize;
let circles = [];
let repelDist;
let canvas; 

function setup() {
  canvas = createCanvas(window.innerWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed'); // Ensure the canvas stays fixed

  colorMode(HSB);

  circleSize = height * 0.1; // Adjusted size for a better grid
  halfSize = circleSize / 2;
  repelDist = circleSize * 2; // Distance for repulsion effect
  background(220);
  noStroke();

  // Initialize circles array with their positions
  for (let x = halfSize; x <= width; x += circleSize) {
    for (let y = halfSize; y <= height - halfSize; y += circleSize) {
      circles.push({ x: x, y: y, originalX: x, originalY: y });
    }
  }

  mouseX = -width / 2;
  mouseY = -height / 2;
}

function draw() {
  background(300, 0.08);

  let c = color(500, 20, 100);
  let r = color(0, 10, 100);

  let fillR = lerpColor(c, r, 0.1);

  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];

    // Calculate the distance between the mouse and the circle
    let d = dist(mouseX, mouseY, circle.x, circle.y);

    // Apply repulsion force if within repelDist
    if (d < repelDist) {
      let angle = atan2(circle.y - mouseY, circle.x - mouseX);
      circle.x += cos(angle) * (repelDist - d) * 0.05;
      circle.y += sin(angle) * (repelDist - d) * 0.05;
      fill(fillR);
    } else {
      // Return to original position if not repelled
      circle.x = lerp(circle.x, circle.originalX, 0.05);
      circle.y = lerp(circle.y, circle.originalY, 0.05);
      fill(c);
    }

    // Draw the circle
    circleShape(circle.x, circle.y, circleSize);
  }
}

function circleShape(x, y, size) {
  rectMode(CENTER);
  rect(x, y, size, size);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);

    // Initialize circles array with their positions
    for (let x = halfSize; x <= width; x += circleSize) {
      for (let y = halfSize; y <= height - halfSize; y += circleSize + halfSize) {
        circles.push({ x: x, y: y, originalX: x, originalY: y });
      }
    }

    mouseX = -width / 2;
    mouseY = -height / 2;

}