const TipoEquipo = require("../models/TipoEquipo");
const { validationResult } = require("express-validator");

const listarTipoEq = async function (req, res) {
  try {
    const tipoEquipos = await TipoEquipo.find(); //select * from tipoEquipos
    res.send(tipoEquipos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error al listar tipo de Equipo");
  }
};

const crearTipoEq = async function (req, res) {
  try {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ mensaje: errors.array() });
    }

    let tipoEquipo = TipoEquipo();
    tipoEquipo.nombre = req.body.nombre;
    tipoEquipo.estado = req.body.estado;
    tipoEquipo.fechaCreacion = new Date(); //req.body.fechaCreacion;
    tipoEquipo.fechaActualizacion = new Date(); //req.body.fechaActualizacion;

    tipoEquipo = await tipoEquipo.save();
    res.json({mensaje: `El tipo de Equipo ${tipoEquipo.nombre} se creó correctamente`, data: tipoEquipo});
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocurrio un error al crear Tipo de Equipo");
  }
};

//función actualizar TipoEquipo
const actualizarTipoEq = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ mensaje: errors.array() });
    }

    const existeId = await TipoEquipo.findOne({ _id: id });
    if (!existeId) {
      return res
        .status(400)
        .send(
          `El Tipo Equipo con id ${id} no existe, por favor verifique e intente nuevamente`
        );
    }
    if (id && data) {
      await TipoEquipo.findByIdAndUpdate(id, data);
      res.json({
        mensaje: `El tipo de Equipo ${data.nombre} (${id}) se actualizó Correctamente`,
        data: data,
      });
    } else {
      res.json({
        mensaje: "Error, datos incompletos, favor válidar e intente nuevamente",
      });
    }
  } catch (error) {
    res.json(error);
  }
};

//función eliminar TipoEquipo
const eliminarTipoEq = async (req, res) => {
  try {
    const id = req.params.id;
    await TipoEquipo.findByIdAndDelete(id);
    //await TipoEquipo.findByIdAndUpdate(id, { activo: false });
    res.status(200).json(`El tipo de equipo ${id} se eliminó Correctamente`);
  } catch (error) {
    res
      .status(500)
      .json(`Error, no fue posible eliminar el Tipo de Equipo ${id}`);
  }
};
module.exports = {
  listarTipoEq,
  crearTipoEq,
  actualizarTipoEq,
  eliminarTipoEq,
};
