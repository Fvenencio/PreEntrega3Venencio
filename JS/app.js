let edades = [];

function borrarDatos() {
  edades.length > 0 ? edades.pop() : null; // Elimina la última persona cargada
  actualizarListaEdades();
}

function resetearDatos() {
  edades = [];
  actualizarListaEdades();
  document.getElementById('listaEdades').innerHTML = '';
  document.getElementById('resultadoPromedio').textContent = '0';
  document.getElementById('resultadoCantidad').textContent = '0';
  localStorage.removeItem('edades');
}

function calcularPromedio() {
  const generoSeleccionado = document.querySelector('input[name="genero"]:checked');
  !generoSeleccionado ? (alert('Seleccione un género'), false) : null;

  let grupoEdades = edades; // Inicialmente, considero todas las edades ingresadas

  const asunto = document.getElementById('asunto').value;
  const genero = generoSeleccionado.value;
  if (genero === 'Mujer' && asunto === 'laboral') {
    grupoEdades = edades.filter(persona => persona.genero === 'Mujer' && persona.edad >= 18 && persona.edad <= 60); // Filtra las edades entre 18 y 60 (inclusive) para mujeres en etapa laboral
  } else if (genero === 'Mujer' && asunto === 'jubilados') {
    grupoEdades = edades.filter(persona => persona.genero === 'Mujer' && persona.edad >= 61 && persona.edad <= 150); // Filtra las edades entre 61 y 150 (inclusive) para mujeres jubiladas
  } else if (asunto === 'menores') {
    grupoEdades = edades.filter(persona => persona.edad < 18); // Filtra solo las edades menores de 18
  } else if (asunto === 'laboral') {
    grupoEdades = edades.filter(persona => persona.edad >= 18 && persona.edad <= 65); // Filtra las edades entre 18 y 65 (inclusive)
  } else if (asunto === 'jubilados') {
    grupoEdades = edades.filter(persona => persona.edad > 65 && persona.edad <= 150); // Filtra las edades entre 65 y 150 (inclusive)
  }

  grupoEdades.length > 0 ? (
    document.getElementById('resultadoPromedio').textContent = (grupoEdades.reduce((acumulador, persona) => acumulador + persona.edad, 0) / grupoEdades.length).toFixed(2),
    document.getElementById('resultadoCantidad').textContent = grupoEdades.length
  ) : (
    document.getElementById('resultadoPromedio').textContent = '0',
    document.getElementById('resultadoCantidad').textContent = '0'
  );
  // Guarda los datos en el LocalStorage
  localStorage.setItem('edades', JSON.stringify(edades));
}
// Obtenengo los datos guardados del LocalStorage al cargar la página de nuevo
window.addEventListener('DOMContentLoaded', function () {
  const edadesGuardadas = localStorage.getItem('edades');
  edadesGuardadas ? (
    edades = JSON.parse(edadesGuardadas),
    actualizarListaEdades()
  ) : null;
});

function actualizarListaEdades() {
  const listaEdades = document.getElementById('listaEdades');
  listaEdades.innerHTML = ''; // Limpia la lista
  for (const persona of edades) {
    const itemEdad = document.createElement('li');
    itemEdad.textContent = "Nombre: " + persona.nombre + " | Género: " + persona.genero + " | Edad: " + persona.edad + " años";
    itemEdad.classList.add('list-group-item');
    listaEdades.appendChild(itemEdad);
  }
  // Guarda los datos en el LocalStorage
  localStorage.setItem('edades', JSON.stringify(edades));
}

document.getElementById('formularioPersonas').addEventListener('submit', function (e) {
  e.preventDefault();

  const generoSeleccionado = document.querySelector('input[name="genero"]:checked');
  !generoSeleccionado ? (alert('Seleccione un género'), false) : null; // Detieme la ejecución de la función si no se selecciono un género

  const genero = generoSeleccionado.value;
  const nombre = document.getElementById('nombre').value;
  const edad = parseInt(document.getElementById('edad').value);

  (edad < 1 || edad > 150) ? (alert('La edad debe ser entre 1 y 150 años'), false) : null; // Detiene la ejecución de la función, si la edad no está en el rango válido

  const persona = { nombre, genero, edad };
  edades.push(persona);

  document.getElementById('nombre').value = '';
  document.getElementById('edad').value = '';

  actualizarListaEdades();
});

document.getElementById('btnBorrar').addEventListener('click', function () {
  borrarDatos();
});

document.getElementById('btnResetear').addEventListener('click', function () {
  resetearDatos();
});
