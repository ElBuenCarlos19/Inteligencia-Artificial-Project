const express = require("express")
const cors = require("cors")

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Importar las nuevas rutas
const usuarioRoute = require("./routes/usuarioRoute")
const historialRoute = require("./routes/historialRoute")

// Configurar las rutas
app.use("/api/usuario", usuarioRoute)
app.use("/api/historial", historialRoute)

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    message: "API de Inteligencia Artificial - Sistema de 4 Variables",
    version: "2.0.0",
    endpoints: {
      usuarios: "/api/usuario",
      historial: "/api/historial",
    },
  })
})

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`)
  console.log(`📊 API lista para manejar las 4 variables (x1, x2, x3, x4)`)
})
