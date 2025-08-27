const express = require("express")
const UsuarioController = require("../controllers/usuarioController")

const router = express.Router()

// Ruta para registrar usuario
router.post("/registrar", UsuarioController.registrar)

// Ruta para login
router.post("/login", UsuarioController.login)

// Ruta para obtener todos los usuarios
router.get("/", UsuarioController.obtenerTodos)

module.exports = router
