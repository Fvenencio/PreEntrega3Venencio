function imprimirNumerosHasta(n) {
  for (let i = 0; i <= n; i++) {
    console.log(i);
  }
}

function calcularEdadPromedio(edades) {
  let suma = 0;

  for (let i = 0; i < edades.length; i++) {
    suma += edades[i];
  }

  let promedio = suma / edades.length;
  return promedio;
}

let edades = [];

let cantidad = prompt("Ingrese la cantidad de personas:");

for (let i = 0; i < cantidad; i++) {
  let edad = parseInt(prompt(`Ingrese la edad de la persona ${i + 1}:`));
  edades.push(edad);
}

console.log(calcularEdadPromedio(edades));
let edadPromedio = calcularEdadPromedio(edades);
prompt("La edad promedio de las personas registradas es: " + edadPromedio);
