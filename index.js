const express = require('express');
const bodyParser = require('body-parser');
// const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Modificado para soportar la asignación de puerto por Vercel
// const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Habilitar CORS
app.use(cors());

// Manejador de ruta POST para la ruta raíz
app.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Guardar los datos en la base de datos utilizando Prisma
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    console.log('Usuario creado:', newUser);

    // Enviar una respuesta al cliente
    res.status(200).send('Datos del formulario almacenados correctamente');
  } catch (error) {
    console.error('Error al guardar los datos en la base de datos:', error);
    // Enviar una respuesta de error al cliente
    res.status(500).send('Error al procesar la solicitud');
  }
});

// Manejador de ruta GET para la ruta raíz
app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});

