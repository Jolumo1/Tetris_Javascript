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

//

function generarPiezaAleatoria() {
    let numAleatorio = Math.floor(Math.random() * 7);
    let piezaAleatoria = Object.values(piezas)[numAleatorio];
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

/////////////////////////////////////////////////////////////////////////

function pintarPieza(pieza) {

    for (let i = 0; i < pieza.forma.length; i++) {
        for (let j = 0; j < pieza.forma[i].length; j++) {
            if (pieza.forma[i][j] === 1) {
                const fila = pieza.fila + i;
                const columna = pieza.columna + j;
                const celda = document.querySelector(`.x-${fila}.y-${columna}`);
                celda.classList.add(pieza.color);
                celda.classList.add("ocupada");
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
                celda.classList.remove(pieza.color);
                celda.classList.remove("ocupada");
            }
        }
    }
}

function bajarPieza() {
    
    if (puedeBajar(pieza)) {
        borrarPieza(pieza);
        pieza.fila += 1;  
        pintarPieza(pieza);
    } else {
        clearInterval(intervaloBajarPieza);
        
    }
}

function puedeBajar(pieza) {
    const altura = pieza.forma.length;
    const ancho = pieza.forma[0].length;

    for (let j = 0; j < ancho; j++) { // Recorremos columnas
        for (let i = altura - 1; i >= 0; i--) { // De abajo hacia arriba en cada columna
            if (pieza.forma[i][j] === 1) {
                const filaSiguiente = pieza.fila + i + 1;
                const columna = pieza.columna + j;

                if (filaSiguiente >= filas) {
                    return false;
                }

                const celdaAbajo = document.querySelector(`.x-${filaSiguiente}.y-${columna}`);
                if (celdaAbajo && celdaAbajo.classList.contains("ocupada")) {
                    return false;
                }

                break;
            }
        }
    }
    return true;
}


//////////////////////////////

let filas = 20;
let columnas = 10;
generarTablero(filas, columnas);

let pieza = generarPiezaAleatoria();
pintarPieza(pieza);

intervaloBajarPieza = setInterval(bajarPieza, 500);

