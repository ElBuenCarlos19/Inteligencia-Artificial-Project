const connection = require("../config/db")

class HistorialModel {
  static async crear(usuario_id, x1, x2, x3, x4) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO historial (usuario_id, x1, x2, x3, x4, fecha_registro) VALUES (?, ?, ?, ?, ?, NOW())"
      connection.query(query, [usuario_id, x1, x2, x3, x4], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  static async obtenerPorUsuario(usuario_id) {
    return new Promise((resolve, reject) => {
      const query = `
                SELECT h.*, u.usuario 
                FROM historial h 
                JOIN usuarios u ON h.usuario_id = u.id 
                WHERE h.usuario_id = ? 
                ORDER BY h.fecha_registro DESC
            `
      connection.query(query, [usuario_id], (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }

  static async obtenerTodos() {
    return new Promise((resolve, reject) => {
      const query = `
                SELECT h.*, u.usuario 
                FROM historial h 
                JOIN usuarios u ON h.usuario_id = u.id 
                ORDER BY h.fecha_registro DESC
            `
      connection.query(query, (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }

  static async obtenerCombinaciones() {
    return new Promise((resolve, reject) => {
      const query = `
                SELECT x1, x2, x3, x4, COUNT(*) as cantidad 
                FROM historial 
                GROUP BY x1, x2, x3, x4 
                ORDER BY cantidad DESC
            `
      connection.query(query, (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
}

module.exports = HistorialModel
