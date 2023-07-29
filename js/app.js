let edades = [];

function borrarDatos() {
  edades.length > 0 ? edades.pop() : null;
  actualizarListaEdades();
}

function resetearDatos() {
  edades = [];
  actualizarListaEdades();
  document.getElementById('listaEdades').innerHTML = '';
  document.getElementById('resultadoPromedio').textContent = '0';
  document.getElementById('resultadoCantidad').textContent = '0';
  enviarDatosAlServidor();
}

function resetearDatos() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡Esta acción eliminará la lista completa!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarla'
  }).then((result) => {
    if (result.isConfirmed) {
      edades = [];
      actualizarListaEdades();
      document.getElementById('listaEdades').innerHTML = '';
      document.getElementById('resultadoPromedio').textContent = '0';
      document.getElementById('resultadoCantidad').textContent = '0';
      enviarDatosAlServidor();
      Swal.fire(
        '¡Eliminada!',
        'La lista ha sido eliminada.',
        'success'
      );
    }
  });
}


function enviarDatosAlServidor() {
  // Crea un objeto XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/guardarDatos', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Escucha el evento 'load' que indica que la solicitud se completó
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Datos guardados correctamente.');
    } else {
      console.error('Error al guardar los datos.');
    }
  };

  // Maneja el evento 'error' en caso de que ocurra un error de red
  xhr.onerror = function () {
    console.error('Error de red al intentar guardar los datos.');
  };

  // Envía los datos al servidor como un objeto JSON
  xhr.send(JSON.stringify(edades));
}

function cargarDatosDesdeJSON() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', '/obtenerDatos', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Parsea el contenido del archivo JSON y asigna los datos a la lista 'edades'
          edades = JSON.parse(xhr.responseText);
          actualizarListaEdades();
          resolve(); // Resuelve la promesa en caso de éxito
        } else {
          reject(new Error('Error al cargar datos desde JSON')); // Rechaza la promesa en caso de error
        }
      }
    };
    xhr.send(null);
  });
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
window.addEventListener('DOMContentLoaded', function () {
  cargarDatosDesdeJSON();
});

window.addEventListener('DOMContentLoaded', function () {
  // Utilizamos la promesa para cargar los datos desde el JSON
  cargarDatosDesdeJSON()
    .then(() => {
      console.log('Datos cargados exitosamente.');
    })
    .catch((error) => {
      console.error(error); // Manejamos el error en caso de que ocurra al cargar los datos
    });
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
  if (!generoSeleccionado) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Seleccione un género',
    });
    return; // Detiene la ejecución de la función si no se seleccionó un género
  }

  const genero = generoSeleccionado.value;
  const nombre = document.getElementById('nombre').value;
  const edad = parseInt(document.getElementById('edad').value);

  if (edad < 1 || edad > 150) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'La edad debe estar entre 1 y 150 años',
    });
    return; // Detiene la ejecución de la función si la edad no está en el rango válido
  }

  const persona = { nombre, genero, edad };
  edades.push(persona);

  document.getElementById('nombre').value = '';
  document.getElementById('edad').value = '';

  actualizarListaEdades();

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'La persona se cargó correctamente',
    showConfirmButton: false,
    timer: 1500
  });

});

// Utilizamos la promesa para cargar los datos desde el JSON
cargarDatosDesdeJSON()
  .then(() => {
    // Aquí se ejecuta después de que los datos se hayan cargado correctamente
    console.log('Datos cargados exitosamente.');
  })
  .catch((error) => {
    // Aquí se maneja el error en caso de que ocurra al cargar los datos
    console.error(error);
  });

// Obtenengo los datos guardados del LocalStorage al cargar la página de nuevo
window.addEventListener('DOMContentLoaded', function () {
  const edadesGuardadas = localStorage.getItem('edades');
  if (edadesGuardadas) {
    edades = JSON.parse(edadesGuardadas);
    actualizarListaEdades();
  }
});