function calcularEdadPromedio(edades) {
  let suma = 0;

  for (let i = 0; i < edades.length; i++) {
    suma += edades[i];
  }

  let promedio = suma / edades.length;
  return promedio;
}

let edades = [];
let cantidad;

do {
  cantidad = parseInt(prompt("Ingrese la cantidad de personas:"));

  if (cantidad < 1 || cantidad > 10000 || isNaN(cantidad)) {
    alert("La cantidad ingresada no es válida. Debe ser un número entre 1 y 10000.");
  }
} while (cantidad < 1 || cantidad > 10000 || isNaN(cantidad));

let i = 0;
while (i < cantidad) {
  let edad = parseInt(prompt(`Ingrese la edad de la persona ${i + 1}:`));

  switch (true) {
    case isNaN(edad):
      alert("La edad ingresada no es un número válido.");
      break;
    case edad < 1:
      alert("La edad ingresada no puede ser menor a 1.");
      break;
    case edad > 1000:
      alert("La edad ingresada no puede ser mayor a 1000 años.");
      break;
    default:
      edades.push(edad);
      i++; 
  }
}

if (edades.length === cantidad) {
  let edadPromedio = calcularEdadPromedio(edades);
  
  let resultadoPromedio = document.createElement("p");
  resultadoPromedio.textContent = "La edad promedio de las personas registradas es de: " + edadPromedio + "años";

  let resultadoCantidad = document.createElement("p");
  resultadoCantidad.textContent = "Cantidad de personas registradas: " + cantidad;

  let listaEdades = document.createElement("ul");
  for (let j = 0; j < edades.length; j++) {
    let itemEdad = document.createElement("li");
    itemEdad.textContent = "Edad persona " + (j + 1) + ": " + edades[j] + "años" ;
    listaEdades.appendChild(itemEdad);
  }

  let lista = document.createElement("div");
  lista.appendChild(resultadoCantidad);
  lista.appendChild(listaEdades);
  lista.appendChild(resultadoPromedio);

  document.body.appendChild(lista);
}
