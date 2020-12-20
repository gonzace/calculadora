var aux = require("./aux");
var operaciones = require("./operaciones");

/* Esta calculadora -en principio- soporta n términos y las 4 operaciones básicas (suma, resta, producto y división).
Hasta el momento NO soporta términos entre paréntesis. */ 

// recibo el argumento
var operacionSolicitada = aux.reconocer(process.argv[2]);
// extraigo los operadores y su posión dentro del argumento (string)
var objetos = aux.extraer(operacionSolicitada);
// ordeno el array de operadores, según su posición (orden de aparición dentro del string)
var ordenados = aux.ordenar(objetos);
// obtengo todos los números del argumento (string)
var terminos = aux.cortar(ordenados, operacionSolicitada);
// evalúo la operación que hay que realizar con cada par de numeros (resuelvo la operación)
var resultado = operaciones.evaluar(ordenados, terminos);
// muestro el resultado
console.log("El resultado es: ", resultado);