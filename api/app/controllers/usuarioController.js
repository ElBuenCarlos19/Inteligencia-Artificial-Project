const UsuarioModel = require("../models/usuarioModel")
const bcrypt = require("bcrypt")

class UsuarioController {
  static async registrar(req, res) {
    try {
      const { usuario, password } = req.body

      if (!usuario || !password) {
        return res.status(400).json({
          success: false,
          message: "Usuario y contraseña son requeridos",
        })
      }

      // Verificar si el usuario ya existe
      const usuarioExistente = await UsuarioModel.buscarPorUsuario(usuario)
      if (usuarioExistente) {
        return res.status(400).json({
          success: false,
          message: "El usuario ya existe",
        })
      }

      // Encriptar contraseña
      const passwordHash = await bcrypt.hash(password, 10)

      // Crear usuario
      const resultado = await UsuarioModel.crear(usuario, passwordHash)

      res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente",
        data: { id: resultado.insertId, usuario },
      })
    } catch (error) {
      console.error("Error al registrar usuario:", error)
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      })
    }
  }

  static async login(req, res) {
    try {
      const { usuario, password } = req.body

      if (!usuario || !password) {
        return res.status(400).json({
          success: false,
          message: "Usuario y contraseña son requeridos",
        })
      }

      // Buscar usuario
      const usuarioEncontrado = await UsuarioModel.buscarPorUsuario(usuario)
      if (!usuarioEncontrado) {
        return res.status(401).json({
          success: false,
          message: "Credenciales inválidas",
        })
      }

      // Verificar contraseña
      const passwordValida = await bcrypt.compare(password, usuarioEncontrado.password)
      if (!passwordValida) {
        return res.status(401).json({
          success: false,
          message: "Credenciales inválidas",
        })
      }

      res.json({
        success: true,
        message: "Login exitoso",
        data: {
          id: usuarioEncontrado.id,
          usuario: usuarioEncontrado.usuario,
        },
      })
    } catch (error) {
      console.error("Error en login:", error)
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      })
    }
  }

  static async obtenerTodos(req, res) {
    try {
      const usuarios = await UsuarioModel.obtenerTodos()
      res.json({
        success: true,
        data: usuarios,
      })
    } catch (error) {
      console.error("Error al obtener usuarios:", error)
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      })
    }
  }
}

module.exports = UsuarioController
