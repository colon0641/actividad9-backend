import Producto from "../models/Producto.js"
import Historial from "../models/Historial.js"
import Categoria from "../models/Categoria.js"


// Función helper para registrar movimiento
const registrarMovimiento = async (tipoAccion, productoId, usuarioId, detalles = "") => {
  try {
    const movimiento = new Historial({
      accion: tipoAccion,
      usuario: usuarioId,
      producto: productoId,
      detalles
    })

    await movimiento.save()
  } catch (error) {
    console.error("Error al registrar movimiento:", error.message)
  }
}

// 🔹 Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find()
    res.json(productos)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos" })
  }
}

// 🔹 Crear producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, cantidad, precio, categoria } = req.body

    const nuevoProducto = new Producto({
      nombre,
      cantidad,
      precio,
      categoria
    })

    await nuevoProducto.save()

    // Crear categoría automáticamente si no existe
    if (categoria && categoria.trim() !== "" && categoria !== "General") {
      const categoriaExistente = await Categoria.findOne({ nombre: categoria })
      if (!categoriaExistente) {
        const nuevaCategoria = new Categoria({ nombre: categoria })
        await nuevaCategoria.save()
      }
    }

    // Registrar movimiento
    await registrarMovimiento("Producto agregado", nuevoProducto._id, req.user.id)

    res.status(201).json(nuevoProducto)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear producto" })
  }
}

// 🔹 Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    // Registrar movimiento
    if (producto) {
      await registrarMovimiento("Producto actualizado", producto._id, req.user.id)
    }

    res.json(producto)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar producto" })
  }
}

// 🔹 Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id)

    if (producto) {
      await registrarMovimiento("Producto eliminado", producto._id, req.user.id, ` ${producto.nombre}`)
    }

    await Producto.findByIdAndDelete(req.params.id)
    res.json({ mensaje: "Producto eliminado" })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto" })
  }
}
