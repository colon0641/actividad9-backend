import express from "express"
import Categoria from "../models/Categoria.js"
import { auth } from "../middlewares/auth.js"

const router = express.Router()

// 🔹 Obtener todas las categorías
router.get("/", auth, async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ nombre: 1 })
    res.json(categorias)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener categorías" })
  }
})

// 🔹 Crear categoría (solo admin)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ mensaje: "Acceso denegado" })
  }

  try {
    const categoria = new Categoria(req.body)
    await categoria.save()
    res.status(201).json(categoria)
  } catch (error) {
    res.status(400).json({ mensaje: "Categoría ya existe o datos inválidos" })
  }
})

// 🔹 Actualizar categoría (solo admin)
router.put("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ mensaje: "Acceso denegado" })
  }

  try {
    const categoria = await Categoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(categoria)
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar categoría" })
  }
})

// 🔹 Eliminar categoría (solo admin)
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ mensaje: "Acceso denegado" })
  }

  try {
    await Categoria.findByIdAndDelete(req.params.id)
    res.json({ mensaje: "Categoría eliminada" })
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar categoría" })
  }
})

export default router
