const express = require("express")
const HistorialController = require("../controllers/historialController")

const router = express.Router()

// Ruta para almacenar nuevo registro
router.post("/almacenar", HistorialController.almacenar)

// Ruta para obtener historial por usuario
router.get("/usuario/:usuario_id", HistorialController.obtenerPorUsuario)

// Ruta para obtener todo el historial
router.get("/", HistorialController.obtenerTodos)

// Ruta para obtener estadísticas de combinaciones
router.get("/combinaciones", HistorialController.obtenerCombinaciones)

module.exports = router
