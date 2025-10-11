//comision 3 grupo luca chiodini, tomas lopez vasquez
//https://www.youtube.com/watch?v=IRGISlFmuCE
//tocar click para que suene la musica
let pantalla = 0; 
let historia = []; 
let imagenes = {}; 
let botonReiniciar; 
let TOTAL_IMAGENES_NARRATIVAS = 15; 
let musicaFondo;
let CREDITOS_SCREEN;
let tiempoInicioFinal;
const DURACION_FINAL_SCREEN = 3000; 

function preload() {
  //cargar imagenes
  for (let i = 1; i <= TOTAL_IMAGENES_NARRATIVAS; i++) {
    imagenes[i] = loadImage(`Data/img${i}.png`);
  }

  imagenes["finaltragico"] = loadImage("Data/finaltragico.png");
  imagenes["finalheroico"] = loadImage("Data/finalheroico.png");
  imagenes["finalneutral"] = loadImage("Data/finalneutral.png");
  musicaFondo = loadSound('Data/musicaFondo.mp3');
}

function setup() {
  createCanvas(640, 480);
  textFont("Georgia");
  textAlign(CENTER, CENTER);
  noStroke();

  botonReiniciar = createButton('Reiniciar Historia');
  botonReiniciar.position(width - 130, 10);
  botonReiniciar.mousePressed(reiniciarJuego);
  botonReiniciar.style('background-color', '#444');
  botonReiniciar.style('color', '#FFF');
  botonReiniciar.style('border', 'none');
  botonReiniciar.style('padding', '8px 10px');
  botonReiniciar.style('cursor', 'pointer');
  botonReiniciar.style('font-size', '14px');
  botonReiniciar.hide(); 
  
  
  historia = [
    // Pantalla 1 
    {
      imgID: 1,
      texto: "Eres Thor, dios del trueno. Despiertas en tu palacio y descubres que Loki ha raptado a tus hijos, Magni y Modi. Solo encuentras risas burlonas resonando en las paredes. (Presiona la tecla numérica para elegir)",
      opciones: [
        { texto: "Seguir un rastro mágico hacia el Bosque de los Jotuns.", destino: 1 },
        { texto: "Dirigirte al Puente Bifröst.", destino: 2 }, 
      ],
    },
    // Pantalla 2 
    {
      imgID: 2,
      texto: "El bosque helado cruje bajo tus pasos. Los jotuns te rodean, liderados por un gigante con hacha de hielo.",
      opciones: [
        { texto: "Enfrentarlos con Mjölnir.", destino: 3 }, 
        { texto: "Usar un trueno como distracción y escapar.", destino: 4 }, 
      ],
    },
    // Pantalla 3 
    {
      imgID: 3,
      texto: "Heimdall aparece, pero sus ojos rojos revelan que Loki lo controla. Levanta su espada para bloquear tu paso.",
      opciones: [
        { texto: "Intentar liberarlo con el trueno.", destino: 5 }, 
      ],
    },
    // Pantalla 4
    {
      imgID: 4,
      texto: "El suelo tiembla cuando tus rayos impactan. Tras una batalla feroz, derrotas al líder jotun y los demás huyen. Encuentras un fragmento de ilusión mágica que apunta a Niflheim.",
      opciones: [{ texto: "Avanzar", destino: 6 }], 
    },
    // Pantalla 5 
    {
      imgID: 5,
      texto: "Lanzas un trueno al cielo, los jotuns se confunden y corres entre la niebla. Escapas, pero el fragmento de ilusión se rompe: tu camino a Niflheim queda incompleto.",
      opciones: [{ texto: "Avanzar", destino: 6 }],
    },
    // Pantalla 6 
    {
      imgID: 6,
      texto: "El trueno rompe el hechizo. Heimdall, libre, agradece tu ayuda y te señala el escondite de Loki: Niflheim.",
      opciones: [{ texto: "Avanzar", destino: 6 }],
    },
   
    // Pantalla 7 
    {
      imgID: 7,
      texto: "Ya sea por pistas del bosque o de Heimdall, descubres que Loki se oculta en las montañas heladas de Niflheim. El viaje es largo y peligroso.",
      opciones: [
        { texto: "Viajar volando con Mjölnir, rápido pero arriesgado.", destino: 7 }, 
        { texto: "Avanzar por tierra, más lento pero seguro.", destino: 7 }, 
      ],
    },
   
    // Pantalla 8 
    {
      imgID: 8,
      texto: "Sin guía clara, tomas la ruta más peligrosa: un desfiladero lleno de niebla oscura. Sombras ilusorias te confunden.",
      opciones: [
        { texto: "Seguir las voces de tus hijos.", destino: 14 }, 
        { texto: "Golpear el suelo con Mjölnir para disipar las ilusiones.", destino: 8 }, 
      ],
    },
  
    // Pantalla 9 
    {
      imgID: 9,
      texto: "Finalmente llegas a la fortaleza ilusoria de Loki. Sus paredes cambian de forma. Loki: “¿Listo para arriesgarlo todo, hermano?” Tres puertas se alzan: Fuego, Hielo, Espejos.",
      opciones: [
        { texto: "Elegir Puerta de Fuego.", destino: 9 },
        { texto: "Elegir Puerta de Hielo.", destino: 10 },
        { texto: "Elegir Puerta de Espejos.", destino: 11 },
      ],
    },
    
    // Pantalla 10 
    {
      imgID: 10,
      texto: "Avanzas entre llamas. El calor sofoca, pero Mjölnir abre paso. Al final, hallas una celda con un solo hijo. ¿Es real?",
      opciones: [
        { texto: "Liberarlo de inmediato.", destino: 12 }, 
        { texto: "Golpear con Mjölnir para probar si es ilusión.", destino: 12 }, 
      ],
    },
  
    // Pantalla 11 
    {
      imgID: 11,
      texto: "Cruzas un pasillo congelado. Y aparecen tus hijos, implorando: “¡Padre, ayúdanos!”",
      opciones: [
        { texto: "Creerles y abrazarlos.", destino: 14 }, 
        { texto: "Dudar y atacar al impostor.", destino: 12 }, 
      ],
    },
    
    // Pantalla 12 
    {
      imgID: 12,
      texto: "Los espejos multiplican tu reflejo. Uno te dice: “Solo uno puede vencer a Loki. ¿Cuál eres tú?”",
      opciones: [
        { texto: "Romper todos los espejos.", destino: 14 }, 
        { texto: "Confiar en tu reflejo verdadero y tocarlo.", destino: 12 }, 
      ],
    },
   
    // Pantalla 13 
    {
      imgID: 13,
      texto: "Superada una puerta, Loki aparece en su forma real.",
      opciones: [
        { texto: "Atacarlo con toda tu furia.", destino: 15 }, 
        { texto: "Retener tu golpe e intentar negociar.", destino: 16 }, 
      ],
    },
    
    // Pantalla 14 
    {
      imgID: 14,
      texto: "Logras liberarte para el enfrentamiento final. Si luchas bien, logras liberar a Magni y Modi.",
      opciones: [
        { texto: "Luchar con toda tu furia.", destino: 17 }, 
      ],
    },
    
    // Pantalla 15 
    {
      imgID: 15,
      texto: "Si te engañan las ilusiones, Loki escapa con uno de ellos o con ambos.",
      opciones: [
        { texto: "Eres engañado (Loki escapa con ambos).", destino: 16 }, 
        { texto: "Rescatas solo a uno.", destino: 18 }, 
      ],
    },
    
    // Pantalla 16 
    {
      imgID: "finaltragico",
      texto: "Final Trágico: Loki logra burlar a Thor. Ambos hijos se desvanecen en la nada. El dios del trueno, solo, jura venganza eterna.",
      opciones: [], 
    },
    
    // Pantalla 17 
    {
      imgID: "finalheroico",
      texto: "Final Heroico: Thor rescata a Magni y Modi. Loki huye herido. Asgard celebra tu triunfo y los relámpagos iluminan el cielo.",
      opciones: [], 
    },
    
    // Pantalla 18 
    {
      imgID: "finalneutral",
      texto: "Final Neutral: Thor salva a uno de sus hijos, pero el otro queda prisionero de Loki. La victoria sabe amarga, y la batalla aún no termina.",
      opciones: [], 
    },
    
    // PANTALLA DE CRÉDITOS 
    {
        imgID: "finalheroico", 
        texto: "¡Fin de la Historia!\n\n~ CRÉDITOS ~\n\nDesarrolladores:\n\n Luca Chiodini (Legajo 122655/3)\n\n Tomas Lopes Vasquez (Legajo 122760/3)\n\n¡Gracias por jugar! Presiona Reiniciar para comenzar de nuevo.",
        opciones: [],
    }
  ];

  
  CREDITOS_SCREEN = historia.length - 1;
}

function draw() {
  background(0);

  let escena = historia[pantalla];
  let img = typeof escena.imgID === 'number' ? imagenes[escena.imgID] : imagenes[escena.imgID];

  if (pantalla >= 15 && pantalla <= 17) { // Pantallas de final (15, 16, 17)
    
    if (tiempoInicioFinal === undefined) {
      tiempoInicioFinal = millis();
    }
   
    if (millis() - tiempoInicioFinal > DURACION_FINAL_SCREEN) {
      pantalla = CREDITOS_SCREEN;
      tiempoInicioFinal = undefined; 
    }
  }
 
  
  if (pantalla === CREDITOS_SCREEN) {
    botonReiniciar.show();
  } else {
    botonReiniciar.hide();
  }

 
  if (!escena || !img || !img.width) {
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Cargando imagen de la escena...", width / 2, height / 2);
    return;
  }

  if (pantalla !== CREDITOS_SCREEN) {
    let w = width;
    let h = (img.height / img.width) * width;
    imageMode(CENTER);
    image(img, width / 2, height / 2, w, h);
  }
 
  let cuadroAltura = 180;
  

  if (pantalla !== CREDITOS_SCREEN) {
    fill(0, 190);
    rectMode(CORNER);
    rect(0, height - cuadroAltura, width, cuadroAltura);
  } else {
    background(0); 
  }

  fill(255);
  textAlign(CENTER, TOP);
  
  if (pantalla === CREDITOS_SCREEN) {
   
    textSize(24);
    text(
      escena.texto,
      50,
      height / 2 - 120,
      width - 100,
      300
    );
  } else {
   
    textSize(18);
    let margenTexto = 60;
    text(
      escena.texto,
      margenTexto,
      height - cuadroAltura + 20,
      width - margenTexto * 2,
      cuadroAltura - 70
    );
  }

  textAlign(CENTER, TOP);
  textSize(16);
  let yInicio = height - 70;
    
  if (escena.opciones.length > 0) {
    for (let i = 0; i < escena.opciones.length; i++) {
      let y = yInicio + i * 28;
      text(`[${i + 1}] ${escena.opciones[i].texto}`, width / 2, y);
    }
  }
}


function keyPressed() {
  let escena = historia[pantalla];
  if (!escena) return;
  if (pantalla < 15) { 
   
    let indice = parseInt(key) - 1;

    if (indice >= 0 && indice < escena.opciones.length) {
      pantalla = escena.opciones[indice].destino;
    }
  }
}

function reiniciarJuego() {
  pantalla = 0; 
}

function mousePressed() {
  if (musicaFondo.isLoaded() && !musicaFondo.isPlaying()) {
    musicaFondo.loop(); 
  }
 } 
