// función que agrega un cero al inicio del string en caso que el string original comience con "+" ó "-", para que la operación sea posible.
function reconocer (argumento) {
    if (argumento[0] == "+" || argumento[0] == "-") {
        argumento = "0" + argumento;
    }
    return argumento;
}

// función para extraer los operadores y su posición dentro del string.
function extraer (arg) {
    var posOperadores = []; // array donde voy a guardar los operadores y su posición.
    let haySuma = arg.includes("+"); // consulta si el argumento incluye el símbolo "+".
    let hayResta = arg.includes("-");
    let hayProd = arg.includes("*");
    let hayDiv = arg.includes("/");
    let idxSuma = 0; // variable auxiliar que guarda la posición a partir de la cual se debe buscar el operador suma.
    let idxResta = 0;
    let idxProd = 0;
    let idxDiv = 0;
    while (haySuma || hayResta || hayProd || hayDiv) {
    // mientras exista alguna de las operaciones (suma, resta, producto ó división), ejecuto...
        if (haySuma) {
        // si existe suma, entonces...
            posSuma = arg.indexOf("+", idxSuma); // guarda la posición del símbolo suma.
            idxSuma = posSuma+1;
            haySuma = arg.includes("+", idxSuma);
            posOperadores.push({pos: posSuma, op: "+"}); // agrega al array de operadores un elemento (objeto) que contiene la posición y el operador.
        }
        if (hayResta){
            posResta = arg.indexOf("-", idxResta);
            idxResta = posResta+1;
            hayResta = arg.includes("-", idxResta);
            posOperadores.push({pos: posResta, op: "-"});
        }
        if (hayProd){
            posProd = arg.indexOf("*", idxProd);
            idxProd = posProd+1;
            hayProd = arg.includes("*", idxProd);
            posOperadores.push({pos: posProd, op: "*"});
        }
        if (hayDiv){
            posDiv = arg.indexOf("/", idxDiv);
            idxDiv = posDiv+1;
            hayDiv = arg.includes("/", idxDiv);
            posOperadores.push({pos: posDiv, op: "/"}); 
        }
    }
    return posOperadores;
}

// función para ordenar el arreglo de operadores según su posición, en orden de aparición en el string.
function ordenar (arreglo) {
    for (i = 0; i < arreglo.length-1; i++){
        for (j = 1; j < arreglo.length; j++){
            if (arreglo[j].pos < arreglo[j-1].pos){
                // si el elemento anterior es mayor, hacemos el cambio
                aux = arreglo[j];
                arreglo[j] = arreglo[j-1];
                arreglo[j-1] = aux;
            }
        }
    }
    return arreglo;
}

// función para extraer los operandos del string.
function cortar (arreglo, operacion) {
    var numeros = []; // array donde voy a guardar sólo los números del string.
    var inicio = 0;
    for (i = 0; i < arreglo.length; i++) {
        fin = arreglo[i].pos; // posición donde debe finalizar el corte de la cadena.
        num = parseInt(operacion.slice(inicio, fin)); // extraer el operando (número) de la cadena.
        numeros.push(num); // guarda el número en el array.
        inicio = arreglo[i].pos + 1; // establece la posición donde comienza el corte de la cadena.
    }
    numeros.push(parseInt(operacion.slice(inicio))); // toma también el último operando, que no es tomado por el bucle for.
    return numeros;
}

// función que se queda solo con los símbolos (sin incluir su posición), partiendo de un array ya ordenado.
function simplificar (array) {
    var nuevoArreglo = [];
    for (i = 0; i < array.length; i++) {
        nuevoArreglo.push(array[i].op);
    }
    return nuevoArreglo;
}

module.exports = {
    reconocer: reconocer,
    extraer: extraer,
    ordenar: ordenar,
    cortar: cortar,
    simplificar: simplificar
}