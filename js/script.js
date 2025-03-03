// creamos un obnjeto piezas, formado por las distintas piezas y cada una tiene como propiedades fila, columna, forma y color.
const piezas = {
  I: {
    fila: 0,
    columna: 3,
    forma: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "cyan",
  },

  J: {
    fila: 0,
    columna: 3,
    forma: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "azul",
  },

  L: {
    fila: 0,
    columna: 3,
    forma: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "naranja",
  },

  O: {
    fila: 0,
    columna: 3,
    forma: [
      [1, 1],
      [1, 1],
    ],
    color: "amarillo",
  },

  S: {
    fila: 0,
    columna: 3,
    forma: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "verde",
  },

  T: {
    fila: 0,
    columna: 3,
    forma: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "morado",
  },

  Z: {
    fila: 0,
    columna: 3,
    forma: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: "rojo",
  },
};

function clonarPieza(pieza) {
  // para mostrar la próxima pieza en el html clonamos la pieza con todas sus propiedades.
  const nuevaPieza = {
    fila: pieza.fila,
    columna: pieza.columna,
    color: pieza.color,
    forma: [],
  };

  for (let i = 0; i < pieza.forma.length; i++) {
    nuevaPieza.forma[i] = [];
    for (let j = 0; j < pieza.forma[i].length; j++) {
      nuevaPieza.forma[i][j] = pieza.forma[i][j];
    }
  }

  return nuevaPieza;
}

function generarPiezaAleatoria() {
  // genera una pieza a partir de un número aleatorio y lo clona para mostrarla en el html.
  let numAleatorio = Math.floor(Math.random() * 7);
  let piezaOriginal = Object.values(piezas)[numAleatorio];
  let piezaAleatoria = clonarPieza(piezaOriginal);
  return piezaAleatoria;
}

function generarTablero(filas, columnas) {
  const tablero = document.getElementById("tablero");

  //X: fila(i) - Y:columna(j)
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      const celda = document.createElement("div");
      celda.classList.add("celda");
      celda.classList.add(`x-${i}`);
      celda.classList.add(`y-${j}`);
      tablero.appendChild(celda);
    }
  }
}

function generarTableroProximaPieza() {
  // genera las casillas para mostrar la próxima pieza en el html.
  const tableroProximaPieza = document.getElementById("tableroProximaPieza");

  tableroProximaPieza.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      const celda = document.createElement("div");
      celda.classList.add("celda");
      celda.classList.add(`proxima-x-${i}`);
      celda.classList.add(`proxima-y-${j}`);
      tableroProximaPieza.appendChild(celda);
    }
  }
}

function pintarProximaPieza(pieza) {
  // pinta la próxima pieza en el html mas o menos centrada, se puede controlar donde empieza a pintar la pieza.
  const offsetFila = 1;
  const offsetColumna = 1;

  for (let i = 0; i < pieza.forma.length; i++) {
    for (let j = 0; j < pieza.forma[i].length; j++) {
      if (pieza.forma[i][j] === 1) {
        const fila = offsetFila + i;
        const columna = offsetColumna + j;
        const celda = document.querySelector(
          `.proxima-x-${fila}.proxima-y-${columna}`
        );
        if (celda) {
          celda.classList.add(pieza.color);
        }
      }
    }
  }
}

function limpiarTableroProximaPieza() {
  // limpia la próxima pieza para que no se superponga con la siguiente quitando las clases de colores.
  const celdas = document.querySelectorAll("#tableroProximaPieza .celda");
  celdas.forEach((celda) => {
    celda.classList.remove(
      "cyan",
      "azul",
      "naranja",
      "amarillo",
      "verde",
      "morado",
      "rojo"
    );
  });
}

/////////////////////////////////////////////////////////////////////////

// ahora las funciones para pintar y borrar la pieza en el tablero principal, muy parecidas a las de la próxima pieza.
function pintarPieza(pieza) {
  for (let i = 0; i < pieza.forma.length; i++) {
    for (let j = 0; j < pieza.forma[i].length; j++) {
      if (pieza.forma[i][j] === 1) {
        const fila = pieza.fila + i;
        const columna = pieza.columna + j;
        const celda = document.querySelector(`.x-${fila}.y-${columna}`);
        if (celda) {
          celda.classList.add(pieza.color);
          celda.classList.add("ocupada");
        }
      }
    }
  }
}

function borrarPieza(pieza) {
  for (let i = 0; i < pieza.forma.length; i++) {
    for (let j = 0; j < pieza.forma[i].length; j++) {
      if (pieza.forma[i][j] === 1) {
        const fila = pieza.fila + i;
        const columna = pieza.columna + j;
        const celda = document.querySelector(`.x-${fila}.y-${columna}`);
        if (celda) {
          celda.classList.remove(pieza.color);
          celda.classList.remove("ocupada");
        }
      }
    }
  }
}

// empiezan las funciones de movimiento de las piezas.
function bajarPieza() {
  // comprueba si la pieza puede bajar, si puede la borra y la pinta en la siguiente fila, si no la fija en su posición final.
  if (puedeBajar(pieza)) {
    borrarPieza(pieza);
    pieza.fila += 1;
    pintarPieza(pieza);
  } else {
    clearInterval(intervaloBajarPieza);
    pieza = proximaPieza;

    // verifica si se completaron líneas
    verificarLineas();

    // genera una nueva próxima pieza
    proximaPieza = generarPiezaAleatoria();

    // Actualiza la visualización de la próxima pieza
    limpiarTableroProximaPieza();
    pintarProximaPieza(proximaPieza);

    // reinicia la pieza en la fila superior
    pieza.fila = 0;
    pieza.columna = 3;

    // verifica si la posición inicial ya está ocupada y muestra un sweet alert con el mensaje de game over.
    if (!puedeBajar(pieza)) {
      //alert("Game Over!");

      musicaFondo.pause();
      sonidoFinal.play();


      Swal.fire({
        title: "Game over!",
        text: "Has acabado la partida con " + puntos + " puntos!",
        icon: "success",
      });

      return;
    }

    pintarPieza(pieza);

    // reinicia el intervalo
    intervaloBajarPieza = setInterval(bajarPieza, velocidadActual);
  }
}

function puedeBajar(pieza) {
  const altura = pieza.forma.length;
  const ancho = pieza.forma[0].length;

  for (let j = 0; j < ancho; j++) {
    for (let i = altura - 1; i >= 0; i--) {
      if (pieza.forma[i][j] === 1) {
        const filaSiguiente = pieza.fila + i + 1;
        const columna = pieza.columna + j;

        if (filaSiguiente >= filas) {
          return false;
        }

        const celdaAbajo = document.querySelector(
          `.x-${filaSiguiente}.y-${columna}`
        );
        if (celdaAbajo && celdaAbajo.classList.contains("ocupada")) {
          return false;
        }

        break;
      }
    }
  }
  return true;
}

function moverPieza(direccion) {
  if (puedeMover(pieza, direccion)) {
    borrarPieza(pieza);
    pieza.columna += direccion;
    pintarPieza(pieza);
  }
}

function puedeMover(pieza, direccion) {
  borrarPieza(pieza);
  let movimientoValido = true;

  for (let i = 0; i < pieza.forma.length; i++) {
    for (let j = 0; j < pieza.forma[i].length; j++) {
      if (pieza.forma[i][j] === 1) {
        let nuevaColumna = pieza.columna + j + direccion;
        let filaActual = pieza.fila + i;

        // Verifica si se sale del tablero
        if (nuevaColumna < 0 || nuevaColumna >= columnas) {
          movimientoValido = false;
          break;
        }

        // Verifica si hay otra pieza ocupando la nueva posición
        let celda = document.querySelector(
          `.x-${filaActual}.y-${nuevaColumna}`
        );
        if (celda && celda.classList.contains("ocupada")) {
          movimientoValido = false;
          break;
        }
      }
    }
    if (!movimientoValido) break;
  }

  pintarPieza(pieza);
  return movimientoValido;
}

function rotarPieza() {
  let nuevaForma = [];
  for (let j = 0; j < pieza.forma[0].length; j++) {
    nuevaForma[j] = [];
    for (let i = pieza.forma.length - 1; i >= 0; i--) {
      nuevaForma[j].push(pieza.forma[i][j]);
    }
  }
  // si no se puede rotar mantiene la forma original
  let formaOriginal = [];
  for (let i = 0; i < pieza.forma.length; i++) {
    formaOriginal[i] = [];
    for (let j = 0; j < pieza.forma[i].length; j++) {
      formaOriginal[i][j] = pieza.forma[i][j];
    }
  }
  // borra la pieza y la pinta en la nueva posición si puede rotar.
  borrarPieza(pieza);

  pieza.forma = nuevaForma;

  if (puedeRotar(pieza)) {
    pintarPieza(pieza);
  } else {
    pieza.forma = formaOriginal;
    pintarPieza(pieza);
  }
}

function puedeRotar(pieza) {
  for (let i = 0; i < pieza.forma.length; i++) {
    for (let j = 0; j < pieza.forma[i].length; j++) {
      if (pieza.forma[i][j] === 1) {
        let nuevaFila = pieza.fila + i;
        let nuevaColumna = pieza.columna + j;

        // esto evita que la rotación salga del tablero o choque con otra pieza.
        if (
          nuevaColumna < 0 ||
          nuevaColumna >= columnas ||
          nuevaFila >= filas
        ) {
          return false;
        }

        let celda = document.querySelector(`.x-${nuevaFila}.y-${nuevaColumna}`);
        if (celda && celda.classList.contains("ocupada")) {
          return false;
        }
      }
    }
  }
  return true;
}

// Verificar líneas completas y eliminarlas
function verificarLineas() {
  let lineasEliminadas = 0;

  // Recorre todas las filas desde abajo hacia arriba
  for (let i = filas - 1; i >= 0; i--) {
    // Verifica si la fila está completa
    let filaCompleta = true;
    for (let j = 0; j < columnas; j++) {
      const celda = document.querySelector(`.x-${i}.y-${j}`);
      if (!celda || !celda.classList.contains("ocupada")) {
        filaCompleta = false;
        break;
      }
    }

    // Si la fila está completa la elimina
    if (filaCompleta) {
      eliminarFila(i);
      bajarFilasSuperiores(i);
      lineasEliminadas++;

      i++;
    }
  }

  // Actualiza puntuación
  if (lineasEliminadas > 0) {
    actualizarPuntuacion(lineasEliminadas);
  }

  return lineasEliminadas;
}

// Eliminar una fila completa
function eliminarFila(fila) {
  for (let j = 0; j < columnas; j++) {
    const celda = document.querySelector(`.x-${fila}.y-${j}`);
    if (celda) {
      celda.className = `celda x-${fila} y-${j}`;
    }
  }
}

// Baja todas las filas superiores a la fila eliminada
function bajarFilasSuperiores(filaEliminada) {
  for (let i = filaEliminada - 1; i >= 0; i--) {
    for (let j = 0; j < columnas; j++) {
      const celdaActual = document.querySelector(`.x-${i}.y-${j}`);
      const celdaAbajo = document.querySelector(`.x-${i + 1}.y-${j}`);

      if (celdaActual && celdaAbajo) {
        // se transfieren clases de la celda actual a la celda de abajo
        if (celdaActual.classList.contains("ocupada")) {
          const colorClase = Array.from(celdaActual.classList).find((clase) =>
            [
              "cyan",
              "azul",
              "naranja",
              "amarillo",
              "verde",
              "morado",
              "rojo",
            ].includes(clase)
          );

          celdaAbajo.classList.add("ocupada");
          if (colorClase) {
            celdaAbajo.classList.add(colorClase);
          }

          celdaActual.className = `celda x-${i} y-${j}`;
        }
      }
    }
  }
}

// Actualiza puntuación
function actualizarPuntuacion(lineasEliminadas) {
  lineasHechas += lineasEliminadas;
  document.getElementById("lineasHechas").textContent = lineasHechas;

  // calcula puntos según número de líneas eliminadas a la vez
  let puntosPorLinea;
  switch (lineasEliminadas) {
    case 1:
      puntosPorLinea = 40;
      break;
    case 2:
      puntosPorLinea = 100;
      break;
    case 3:
      puntosPorLinea = 300;
      break;
    case 4:
      puntosPorLinea = 1200;
      break;
    default:
      puntosPorLinea = 0;
  }

  // multiplica por nivel actual
  puntos += puntosPorLinea * nivelActual;
  document.getElementById("puntos").textContent = puntos;

  // comprobamos si se debe subir de nivel
  if (lineasHechas >= nivelActual * 10) {
    subirNivel();
  }
}

function subirNivel() {
  nivelActual++;
  document.getElementById("nivelActual").textContent = nivelActual;

  velocidadActual = velocidadInicial - (nivelActual - 1) * 50;
  if (velocidadActual < 100) velocidadActual = 100; // Velocidad mínima

  clearInterval(intervaloBajarPieza);
  intervaloBajarPieza = setInterval(bajarPieza, velocidadActual);
}

function controlarMusica(audio) {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}


//////////////////////////////
//// Inicio del juego //////////
//////////////////////////////

const musicaFondo = new Audio("./audio/tetris.mp3");
musicaFondo.loop = true;
const sonidoFinal = new Audio("./audio/gameOver.mp3");




let filas = 20;
let columnas = 10;
let puntos = 0;
let lineasHechas = 0;
let nivelActual = 1;
let velocidadInicial = 500;
let velocidadActual = velocidadInicial;

generarTablero(filas, columnas);
generarTableroProximaPieza();

let pieza = generarPiezaAleatoria();
let proximaPieza = generarPiezaAleatoria();

pintarPieza(pieza);

pintarProximaPieza(proximaPieza);

let intervaloBajarPieza = setInterval(bajarPieza, velocidadActual);

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      moverPieza(-1);
      break;
    case "ArrowRight":
      moverPieza(1);
      break;
    case "ArrowDown":
      bajarPieza();
      break;
    case " ":
      rotarPieza();
      break;
    case "p":
      if (intervaloBajarPieza) {
        clearInterval(intervaloBajarPieza);
        intervaloBajarPieza = null;
      } else {
        intervaloBajarPieza = setInterval(bajarPieza, velocidadActual);
      }
      break;
    case "r":
      location.reload();
      break;
    case "m":
      controlarMusica(musicaFondo);
      break;
  }
});

document.getElementById("btnPausa").addEventListener("click", function () {
  if (intervaloBajarPieza) {
    clearInterval(intervaloBajarPieza);
    intervaloBajarPieza = null;
  } else {
    intervaloBajarPieza = setInterval(bajarPieza, velocidadActual);
  }
});

document.getElementById("btnReiniciar").addEventListener("click", function () {
  location.reload();
});
