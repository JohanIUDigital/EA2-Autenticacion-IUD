const Inventario = require("../models/Inventario");
const { validationResult } = require("express-validator");

const listarInventario = async function (req, res) {
  try {
    const inventarios = await Inventario.find().populate([
      {
        path: "usuarioEquipo",
        select: "nombre email estado",
      },
      {
        path: "marcaEquipo",
        select: "nombre estado",
      },
      {
        path: "estadoEquipo",
        select: "nombre estado",
      },
      {
        path: "tipoEquipo",
        select: "nombre estado",
      },
    ]); //select * from inventarios
    res.send(inventarios);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error al listar el inventario");
  }
};

const crearInventario = async function (req, res) {
  try {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ mensaje: errors.array() });
    }

    const existeInvSerial = await Inventario.findOne({
      serial: req.body.serial,
    });
    if (existeInvSerial) {
      return res.status(400).send("Ya existe este serial para otro equipo");
    }

    let inventario = Inventario();
    inventario.serial = req.body.serial;
    inventario.modelo = req.body.modelo;
    inventario.descripcion = req.body.descripcion;
    inventario.fotoEquipo = req.body.modelo;
    inventario.colorEquipo = req.body.colorEquipo;
    inventario.fechaCompra = req.body.fechaCompra;
    inventario.precioEquipo = req.body.precioEquipo;
    inventario.usuarioEquipo = req.body.usuarioEquipo;
    inventario.marcaEquipo = req.body.marcaEquipo;
    inventario.estadoEquipo = req.body.estadoEquipo;
    inventario.tipoEquipo = req.body.tipoEquipo;
    inventario.fechaCreacion = new Date(); //req.body.fechaCreacion;
    inventario.fechaActualizacion = new Date(); //req.body.fechaActualizacion;

    inventario = await inventario.save();
    res.send(inventario);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocurrio un error al crear el inventario");
  }
};

//función actualizar Inventario
const actualizarInventario = async (req, res) => {
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

    const existeId = await Inventario.findOne({ _id: id });
    if (!existeId) {
      return res
        .status(400)
        .send(
          `El Inventario con id ${id} no existe, por favor verifique e intente nuevamente`
        );
    }
    if (id && data) {
      await Inventario.findByIdAndUpdate(id, data);
      res.json({
        mensaje: `El inventario se actualizó Correctamente`,
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

//función eliminar Inventario
const eliminarInventario = async (req, res) => {
  try {
    const id = req.params.id;
    await Inventario.findByIdAndDelete(id);
    //await Inventario.findByIdAndUpdate(id, { activo: false });
    res.status(200).json(`El inventario ${id} se eliminó Correctamente`);
  } catch (error) {
    res.status(500).json(`Error, no fue posible eliminar el Inventario ${id}`);
  }
};

module.exports = {
  listarInventario,
  crearInventario,
  actualizarInventario,
  eliminarInventario,
};
