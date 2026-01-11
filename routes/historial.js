import express from "express"
import { obtenerHistorial, registrarMovimiento, eliminarMovimiento, eliminarTodosLosMovimientos } from "../controllers/historial.controller.js"
import { auth } from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/isAdmin.js"

const router = express.Router()

console.log("Historial routes loaded")

router.get("/", auth, obtenerHistorial)
router.post("/", auth, registrarMovimiento)
router.delete("/:id", auth, isAdmin, eliminarMovimiento)
router.delete("/", auth, isAdmin, eliminarTodosLosMovimientos)

export default router