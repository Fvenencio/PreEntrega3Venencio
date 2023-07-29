const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/js/storage.json', (req, res) => {
  fs.readFile('/js/storage.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Error al leer los datos.' });
    } else {
      try {
        const edades = JSON.parse(data);
        res.send(edades);
      } catch (error) {
        res.status(500).send({ error: 'Error al parsear los datos.' });
      }
    }
  });
});

app.post('/js/storage.json', (req, res) => {
  const persona = req.body;
  fs.readFile('/js/storage.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Error al leer los datos.' });
    } else {
      try {
        const edades = JSON.parse(data);
        edades.push(persona);
        fs.writeFile('/js/storage.json', JSON.stringify(edades), (err) => {
          if (err) {
            res.status(500).send({ error: 'Error al guardar los datos.' });
          } else {
            res.send({ message: 'Datos guardados correctamente.' });
          }
        });
      } catch (error) {
        res.status(500).send({ error: 'Error al parsear los datos.' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});