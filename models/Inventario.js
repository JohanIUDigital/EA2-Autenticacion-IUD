const { Schema, model } = require("mongoose");

const InvenSchema = Schema({
  serial: { type: String, required: true, unique: true },
  modelo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fotoEquipo: { type: String, required: true },
  colorEquipo: { type: String, required: true },
  fechaCompra: { type: String, required: true },
  precioEquipo: { type: Number, required: true },

  usuarioEquipo: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: false,
  },
  marcaEquipo: { type: Schema.Types.ObjectId, ref: "Marca", required: true },
  estadoEquipo: {
    type: Schema.Types.ObjectId,
    ref: "EstadoEquipo",
    required: true,
  },
  tipoEquipo: {
    type: Schema.Types.ObjectId,
    ref: "TipoEquipo",
    required: true,
  },

  fechaCreacion: { type: Date, required: true },
  fechaActualizacion: { type: Date, required: true },
});

module.exports = model("Inventario", InvenSchema);
