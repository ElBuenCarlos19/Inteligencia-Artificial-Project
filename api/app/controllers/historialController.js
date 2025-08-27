const HistorialModel = require("../models/historialModel")

class HistorialController {
  static async almacenar(req, res) {
    try {
      const { usuario_id, x1, x2, x3, x4 } = req.body

      // Validar que todos los campos estén presentes
      if (usuario_id === undefined || x1 === undefined || x2 === undefined || x3 === undefined || x4 === undefined) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son requeridos (usuario_id, x1, x2, x3, x4)",
        })
      }

      // Validar que x1, x2, x3, x4 sean booleanos
      if (typeof x1 !== "boolean" || typeof x2 !== "boolean" || typeof x3 !== "boolean" || typeof x4 !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "x1, x2, x3, x4 deben ser valores booleanos (true/false)",
        })
      }

      // Almacenar en historial
      const resultado = await HistorialModel.crear(usuario_id, x1, x2, x3, x4)

      res.status(201).json({
        success: true,
        message: "Registro almacenado exitosamente",
        data: {
          id: resultado.insertId,
          usuario_id,
          x1,
          x2,
          x3,
          x4,
          combinacion: `${x1 ? 1 : 0}${x2 ? 1 : 0}${x3 ? 1 : 0}${x4 ? 1 : 0}`,
        },
      })
    } catch (error) {
      console.error("Error al almacenar historial:", error)
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      })
    }
  }

  static async obtenerPorUsuario(req, res) {
    try {
      const { usuario_id } = req.params

      if (!usuario_id) {
        return res.status(400).json({
          success: false,
          message: "ID de usuario es requerido",
        })
      }

      const historial = await HistorialModel.obtenerPorUsuario(usuario_id)

      res.json({
        success: true,
        data: historial,
      })
    } catch (error) {
      console.error("Error al obtener historial:", error)
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      })
    }
  }

  static async obtenerTodos(req, res) {
    try {
      const historial = await HistorialModel.obtenerTodos()
      res.json({
        success: true,
        data: historial,
      })
    } catch (error) {
      console.error("Error al obtener historial:", error)
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      })
    }
  }

  static async obtenerCombinaciones(req, res) {
    try {
      const combinaciones = await HistorialModel.obtenerCombinaciones()
      res.json({
        success: true,
        data: combinaciones,
      })
    } catch (error) {
      console.error("Error al obtener combinaciones:", error)
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      })
    }
  }
}

module.exports = HistorialController
