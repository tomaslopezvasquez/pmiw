//COMISION 3 PMIW
//https://youtu.be/kNdqbn1hG1c
// TOMAS LOPEZ VASQUEZ
let juego;
let musicaFondo;

let thorImg, lokiImg, fondoImg, poderImg;

function preload() {
  thorImg = loadImage("data/thor.png");
  lokiImg = loadImage("data/loki.png");
  fondoImg = loadImage("data/fondo.png");
  poderImg = loadImage("data/poder.png");
  musicaFondo = loadSound('Data/musicaFondo.mp3');

  juego = new Juego();
  juego.preload();
}

function setup() {
  createCanvas(640, 480);
  noCursor();
  juego.setup();
}

function draw() {
  juego.draw();
}

function keyPressed() {
  juego.keyPressed(key);
}

class Fondo {
  constructor(img) {
    this.img = img;
  }
  draw() {
    image(this.img, 0, 0, width, height);
  }
}

class Personaje {
  constructor(img, w = 120, h = 120, x = 0, y = 0) {
    this.img = img;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
  }

  update(controlMouse = false) {
    if (controlMouse) {
      this.x = constrain(mouseX, this.w / 2, width - this.w / 2);
      this.y = constrain(mouseY, this.h / 2, height - this.h / 2);
    }
  }

  draw() {
    push();
    imageMode(CENTER);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = "black";
    image(this.img, this.x, this.y, this.w, this.h);
    pop();
  }
}

class Poder {
  constructor(x, y, img, velocidad = 2) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.velocidad = velocidad;
    this.tam = 40;
  }

  update() {
    this.y += this.velocidad;
    if (this.y > height) {
      this.y = random(-300, -50);
      this.x = random(width - this.tam);
    }
  }

  draw() {
    image(this.img, this.x, this.y, this.tam, this.tam);
  }

  colision(personaje) {
    let d = dist(this.x + this.tam / 2, this.y + this.tam / 2, personaje.x, personaje.y);
    return d < 50;
  }
}

class Juego {
  constructor() {
    this.pantalla = 4;   
    this.cantidadPoderes = 5;
    this.velocidadPoder = 4;
    this.poderes = [];

    this.tiempoInicio = 0;
    this.tiempoParaGanar = 15 * 1000; 
  }

  preload() {
    this.fondo = new Fondo(fondoImg);
    this.thor = new Personaje(thorImg, 100, 120, width / 2, height - 100);
    this.loki = new Personaje(lokiImg, 100, 120, 300, 60);
    this.poderImg = poderImg;
  }

  setup() {
    this.iniciarJuego();
  }

  draw() {

    if (this.pantalla === 4) {
      background(0);
      fill(255);
      textAlign(CENTER, CENTER);

      textSize(40);
      text("INSTRUCCIONES", width/2, 120);

      textSize(22);
      text(
        "• Mueve el mouse para controlar a Thor\n" +
        "• Esquiva los poderes que caen\n" +
        "• Si te tocan, pierdes\n" +
        "• Sobrevive el tiempo requerido\n\n" +
        "• Presiona R para reiniciar el juego \n" +
        "Presiona ENTER para comenzar",
        width/2, 260
      );
      return;
    }

    if (this.pantalla === 0) {
      this.fondo.draw();
      this.loki.draw();

      let tiempoJugado = millis() - this.tiempoInicio;
      if (tiempoJugado >= this.tiempoParaGanar) {
        this.pantalla = 2;
      }

      fill(255);
      textSize(24);
      textAlign(LEFT, TOP);
      text("Tiempo: " + floor((this.tiempoParaGanar - tiempoJugado) / 1000), 10, 10);

      for (let p of this.poderes) {
        p.update();
        p.draw();
        if (p.colision(this.thor)) {
          this.pantalla = 1;
        }
      }

      this.thor.update(true);
      this.thor.draw();
    }

    else if (this.pantalla === 1) {
      background(0);
      textAlign(CENTER, CENTER);
      fill(255, 0, 0);
      textSize(50);
      text("PERDISTE", width / 2, height / 2);
      textSize(20);
      text("Presiona R para reiniciar", width / 2, height / 2 + 50);
    }

    else if (this.pantalla === 2) {
      background(0, 180, 0);
      textAlign(CENTER, CENTER);
      fill(255);
      textSize(50);
      text("¡GANASTE!", width / 2, height / 2);
      textSize(20);
      text("Presiona ENTER para ver los créditos", width / 2, height / 2 + 60);
    }

    else if (this.pantalla === 3) {
      background(20);

      fill(255);
      textAlign(CENTER, CENTER);
      textSize(28);
      text("CRÉDITOS", width / 2, 80);

      textSize(18);
      text("Juego creado por: Luca Chiodini y tomas lopez vasquez", width / 2, 180);
      text("Arte y diseño: Luca chiodini y tomas lopez vasquez", width / 2, 220);

      text("Programación:Luca chiodini y tomas lopez vasquez", width / 2, 300);

      textSize(16);
      text("Gracias por jugar", width / 2, 400);
    }
  }

  iniciarJuego() {
    this.poderes = [];

    for (let i = 0; i < this.cantidadPoderes; i++) {
      this.poderes.push(
        new Poder(random(width - 40), random(-500, 0), this.poderImg, this.velocidadPoder)
      );
    }

    this.tiempoInicio = millis();
  }

  keyPressed(k) {

    if (this.pantalla === 4 && key === "Enter") {
      this.pantalla = 0;
      this.tiempoInicio = millis();
      return;
    }

    // ★ TECLA R PARA REINICIAR EN CUALQUIER MOMENTO ★
    if (k === 'r' || k === 'R') {
      this.pantalla = 4;
      this.iniciarJuego();
    }

    if (this.pantalla === 2 && (k === 'Enter')) {
      this.pantalla = 3;
    }
  }
}

function mousePressed() {
  if (musicaFondo.isLoaded() && !musicaFondo.isPlaying()) {
    musicaFondo.loop();
  }
}
