var aux = require("./aux");

// función que evalúa la operación a realizar entre los operandos.
function evaluar (operadores, numeros) {
    let simbolos = aux.simplificar(operadores); // (ver función "simplificar" en "aux.js")
    let hayProd = simbolos.includes("*"); // consultar si existe la operación producto.
    let hayDiv = simbolos.includes("/");
    while (hayProd || hayDiv) {
        // primero resuelvo productos y divisiones.
        posProd = simbolos.indexOf("*"); // averiguo posición de la operación producto.
        posDiv = simbolos.indexOf("/");
        if (hayProd && hayDiv) {
        // si existe el producto y la división, entonces...
            if (posProd < posDiv) {
            // si el producto se encuentra antes que la división, entonces...
                res = multiplicar(numeros[posProd], numeros[posProd+1]); // realizo la multiplicación.
                numeros.splice(posProd, 2, res); // quito del array "numeros" los operandos que utilicé en la operación, y en esa posición añado el resultado.
                simbolos.splice(posProd, 1); // quito el símbolo utilizado en el array de "simbolos".
                hayProd = simbolos.includes("*");
            } else if (posProd > posDiv) {
                res = dividir(numeros[posDiv], numeros[posDiv+1]);
                numeros.splice(posDiv, 2, res);
                simbolos.splice(posDiv, 1);
                hayDiv = simbolos.includes("/");
            }
        } else if (hayProd) {
            res = multiplicar(numeros[posProd], numeros[posProd+1]);
            numeros.splice(posProd, 2, res);
            simbolos.splice(posProd, 1);
            hayProd = simbolos.includes("*");
        } else if (hayDiv) {
            res = dividir(numeros[posDiv], numeros[posDiv+1]);
            numeros.splice(posDiv, 2, res);
            simbolos.splice(posDiv, 1);
            hayDiv = simbolos.includes("/");
        }
    }
    let haySuma = simbolos.includes("+"); // consultar si existe la operación suma.
    let hayResta = simbolos.includes("-");
    if (haySuma || hayResta) {
    // si existe alguna de las dos (suma o resta), entonces...
        let i = 0;
        while (simbolos.length >= 1){
        // ejecutar mientras exista algún elemento dentro del array "simbolos"
            if (simbolos[i] == "-") {
            // si el primer elemento es "-", entonces...
                res = restar(numeros[i], numeros[i + 1]); // realizo la resta.
                numeros.splice(i, 2, res);
                simbolos.splice(i, 1);
            }
            if (simbolos[i] == "+") {
                res = sumar(numeros[i], numeros[i + 1]);
                numeros.splice(i, 2, res);
                simbolos.splice(i, 1);
            }
        }
    }
    return numeros[0]; // devuelve el único elemento que quedó en el array "numeros".
}

function multiplicar (primerNumero, segundoNumero) {
    return (primerNumero * segundoNumero);
}

function dividir (primerNumero, segundoNumero) {
    return (primerNumero / segundoNumero);
}

function sumar (primerNumero, segundoNumero) {
    return (primerNumero + segundoNumero);
}

function restar (primerNumero, segundoNumero) {
    return (primerNumero - segundoNumero);
}

module.exports = {
    evaluar: evaluar
}