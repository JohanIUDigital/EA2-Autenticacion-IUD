const EstadoEquipo = require("../models/EstadoEquipo");
const { validationResult } = require("express-validator");

//función listar Estados de Equipo
const listarEstadosEq = async function (req, res) {
  try {
    const estadoEquipos = await EstadoEquipo.find(); //select * from estadoEquipos
    res.send(estadoEquipos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al intentar listar Estado de Equipo");
  }
};

//función crear Estados de Equipo
const crearEstadoEq = async function (req, res) {
  try {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ mensaje: errors.array() });
    }

    let estadoEquipo = EstadoEquipo();
    estadoEquipo.nombre = req.body.nombre;
    estadoEquipo.estado = req.body.estado;
    estadoEquipo.fechaCreacion = new Date(); //req.body.fechaCreacion;
    estadoEquipo.fechaActualizacion = new Date(); //req.body.fechaActualizacion;

    estadoEquipo = await estadoEquipo.save();
    res.json({
      mensaje: `El Estado de Equipo ${estadoEquipo.nombre} se creó correctamente`,
      data: estadoEquipo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al intentar crear Estado de Equipo");
  }
};

//función actualizar EstadoEquipo
const actualizarEstadoEq = async (req, res) => {
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

    const existeId = await EstadoEquipo.findOne({ _id: id });
    if (!existeId) {
      return res
        .status(400)
        .send(
          `El Estado con id ${id} no existe, por favor verifique e intente nuevamente`
        );
    }
    if (id && data) {
      await EstadoEquipo.findByIdAndUpdate(id, data);
      res.json({
        mensaje: `El estado ${data.nombre} (${id}) se actualizó Correctamente`,
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

//función eliminar EstadoEquipo
const eliminarEstadoEq = async (req, res) => {
  try {
    const id = req.params.id;
    await EstadoEquipo.findByIdAndDelete(id);
    //await EstadoEquipo.findByIdAndUpdate(id, { activo: false });
    res.status(200).json(`El estado ${id} se eliminó Correctamente`);
  } catch (error) {
    res
      .status(500)
      .json(`Error, no fue posible eliminar el estado de equipo ${id}`);
  }
};
module.exports = {
  listarEstadosEq,
  crearEstadoEq,
  actualizarEstadoEq,
  eliminarEstadoEq,
};
