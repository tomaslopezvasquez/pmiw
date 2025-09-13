let colorRandom;
let foto;
function preload() {
  foto = loadImage("data/ilusion.png");
}

function setup() {
  createCanvas(800, 400);
  colorRandom = color(0);
}

function draw() {
  translate(400, 0);
  background(255);
  cuadrados(30); // función para generar los cuadrados
  lineas();     // función para generar las líneas
  image(foto, -400, 0, 400, 400);
  strokeWeight(5);
  fill(255);
  rect(150, 150, 100, 100); // rectángulo blanco del medio
}
