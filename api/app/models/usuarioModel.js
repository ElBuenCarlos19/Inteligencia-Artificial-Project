const connection = require("../config/db")

class UsuarioModel {
  static async crear(usuario, password) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO usuarios (usuario, password, fecha_creacion) VALUES (?, ?, NOW())"
      connection.query(query, [usuario, password], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  static async buscarPorUsuario(usuario) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM usuarios WHERE usuario = ?"
      connection.query(query, [usuario], (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results[0])
        }
      })
    })
  }

  static async obtenerTodos() {
    return new Promise((resolve, reject) => {
      const query = "SELECT id, usuario, fecha_creacion FROM usuarios"
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

module.exports = UsuarioModel
