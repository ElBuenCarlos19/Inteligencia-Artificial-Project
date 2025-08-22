const PersonaModel = require('../models/personaModel');
const { engine } = require('../rules/rules');

module.exports = {
    async insertar(req, res) {
        const persona = new PersonaModel(req.body.id, req.body.nombre, req.body.apellido, req.body.cedula, req.body.edad, req.body.celular);
        await persona.insertar();
        res.status(201).json(persona);
    },
    async consultar(req, res) {
        const persona = new PersonaModel(id=req.params.id);
        await persona.consultar().then(result => {
            res.status(200).json(result);
        });
    },
    async esMayordeEdad (req, res) {
        const persona = new PersonaModel(req.params.id);
        await persona.consultar().then(result => {
            engine
            .run({ age: result.edad })
            .then(results => {
                
              results.events.map(event => res.status(200).json(event.params.message));
            });
        });
    },
    async actualizar(req, res) {
        const persona = new PersonaModel(req.params.id, req.body.nombre, req.body.apellido, req.body.cedula, req.body.edad, req.body.celular);
        await persona.actualizar();
        res.status(200).json(persona);
    },
    async eliminar(req, res) {
        const persona = new PersonaModel(req.params.id);
        await persona.eliminar();
        res.status(200).json(persona);
    }
};