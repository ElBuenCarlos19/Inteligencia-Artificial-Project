const router = require('express').Router();
const personaController = require('../controllers/personaController');

router.post('/', personaController.insertar);
router.get('/:id', personaController.consultar);
router.put('/actualizar/:id', personaController.actualizar);
router.delete('/delete/:id', personaController.eliminar);
router.get('/mayorde/:id', personaController.esMayordeEdad);

module.exports = router;
