import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3
  },
  descripcion: {
    type: String,
    default: ""
  }
});

export default mongoose.model("Categoria", categoriaSchema);
