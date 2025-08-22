const express = require('express');
const PersonaModel = require('./models/personaModel');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const personaRoute = require('./routes/personaRoute');

app.use('/api/persona', personaRoute);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});