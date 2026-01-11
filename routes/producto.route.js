import express from "express"
import { auth } from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/isAdmin.js"
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from "../controllers/producto.controller.js"

const router = express.Router()

// Obtener productos (cualquier usuario autenticado)
router.get("/", auth, obtenerProductos)

// Crear producto (solo admin)
router.post("/", auth, isAdmin, crearProducto)

// Actualizar producto (solo admin)
router.put("/:id", auth, isAdmin, actualizarProducto)

// Eliminar producto (solo admin)
router.delete("/:id", auth, isAdmin, eliminarProducto)

export default router
