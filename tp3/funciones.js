function cuadrados(paso) {
  // cuadrados de menor a mayor
  for (let i = 0; i <= 150; i += paso) {
    noFill();
    stroke(0);
    strokeWeight(5);
    rect(i, i, 400 - 2 * i, 400 - 2 * i);
  }
}

function lineas() {
  push();
  strokeWeight(10);
  stroke(colorRandom);
  translate(200, 200);
  for (let repite = 0; repite < 4; repite++) {
    for (let i = 0; i < 10; i++) {
      line(0, 0, 200, map(i, 0, 9, -200, 200));
    }
    rotate(radians(90));
  }
  pop();
}

function keyPressed() {
  if (key === ' ') {
    colorRandom = generarColorRandom(255, 150, 200);
  }
  if (key === 'r') {
    colorRandom = color(0);
  }
}

function generarColorRandom(maxR, maxG, maxB) {
  let r = random(maxR);
  let g = random(maxG);
  let b = random(maxB);
  return color(r, g, b);
}
