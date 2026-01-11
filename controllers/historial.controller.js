import Historial from "../models/Historial.js"

// 🔹 Obtener todos los movimientos de historial
export const obtenerHistorial = async (req, res) => {
  try {
    const query = {}
    if (req.query.producto) {
      query.producto = req.query.producto
    }

    const movimientos = await Historial.find(query)
      .populate("usuario", "nombre email")
      .populate("producto", "nombre")
      .sort({ fecha: -1 }) // Ordenar por fecha descendente

    res.json(movimientos)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener historial" })
  }
}

// 🔹 Registrar un nuevo movimiento
export const registrarMovimiento = async (req, res) => {
  try {
    const { accion, producto, detalles } = req.body

    const nuevoMovimiento = new Historial({
      accion,
      producto,
      usuario: req.user.id,
      detalles
    })

    await nuevoMovimiento.save()
    res.status(201).json(nuevoMovimiento)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar movimiento" })
  }
}

// 🔹 Eliminar un movimiento (solo admin)
export const eliminarMovimiento = async (req, res) => {
  try {
    const { id } = req.params
    const movimiento = await Historial.findByIdAndDelete(id)
    if (!movimiento) {
      return res.status(404).json({ error: "Movimiento no encontrado" })
    }
    res.status(200).json({ mensaje: "Movimiento eliminado exitosamente" })
  } catch (error) {
    console.error("Error al eliminar movimiento:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

// 🔹 Eliminar todos los movimientos (solo admin)
export const eliminarTodosLosMovimientos = async (req, res) => {
  try {
    await Historial.deleteMany({})
    res.status(200).json({ mensaje: "Todos los movimientos eliminados exitosamente" })
  } catch (error) {
    console.error("Error al eliminar todos los movimientos:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}