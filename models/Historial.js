import mongoose from "mongoose"

const historialSchema = new mongoose.Schema({
  accion: {
    type: String,
    required: true,
    enum: ["Producto agregado", "Producto actualizado", "Producto eliminado"]
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true
  },
  detalles: {
    type: String,
    default: ""
  }
})

export default mongoose.model("Historial", historialSchema)