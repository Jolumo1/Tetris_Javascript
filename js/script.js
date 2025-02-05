const piezas = {
    I: {
        nombre: "I",
        forma: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        color: "cyan",
    },

    J: {
        nombre: "J",
        forma: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        color: "azul",
    },

    L: {
        nombre: "L",
        forma: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0],
        ],
        color: "naranja",
    },

    O: {
        nombre: "O",
        forma: [
            [1, 1],
            [1, 1],
        ],
        color: "amarillo",
    },

    S: {
        nombre: "S",
        forma: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ],
        color: "verde",
    },

    T: {
        nombre: "T",
        forma: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        color: "morado",
    },

    Z: {
        nombre: "Z",
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


function posicionarPieza(pieza) {
    const columnas = 10;
    const filas = 20;

    let fila = 0;
    // let columna = 3;
    let columna = Math.floor(columnas / 2) - Math.floor(pieza.forma[0].length / 2); 
    
    // Recorrer la forma de la pieza y colocarla en el tablero
    for (let i = 0; i < pieza.forma.length; i++) {
        for (let j = 0; j < pieza.forma[i].length; j++) {
            if (pieza.forma[i][j] === 1) { 
                // Busca la celda con ese valor x e y y le añade la clase del color de la pieza
                const celda = document.querySelector(`#tablero .x-${fila + i}.y-${columna + j}`);
                celda.classList.add(pieza.color); 
            }
        }
    }
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

let filas = 20;
let columnas = 10;
generarTablero(filas, columnas);


let pieza = generarPiezaAleatoria();
posicionarPieza(pieza);
