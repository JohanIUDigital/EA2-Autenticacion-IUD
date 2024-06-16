
const Marca = require("../models/Marca");
const { validationResult } = require("express-validator");

//función listar Marcas
const listarMarcas = async function (req, res) {
  try {
    const marcas = await Marca.find(); //select * from marcas
    res.send(marcas);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al listar Marca");
  }
};

//función crear Marca
const crearMarca = async function (req, res) {
  try {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ mensaje: errors.array() });
    }

    let marca = Marca();
    marca.nombre = req.body.nombre;
    marca.estado = req.body.estado;
    marca.fechaCreacion = new Date(); //req.body.fechaCreacion;
    marca.fechaActualizacion = new Date(); //req.body.fechaActualizacion;

    marca = await marca.save();
    res.json({mensaje: `La Marca ${marca.nombre} se creó correctamente`, data: marca});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear Marca");
  }
};

//función actualizar Marca
const actualizarMarca = async (req, res) => {
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

    const existeId = await Marca.findOne({ _id: id });
    if (!existeId) {
      return res
        .status(400)
        .send(
          `La Marca con id ${id} no existe, por favor verifique e intente nuevamente`
        );
    }
    if (id && data) {

      await Marca.findByIdAndUpdate(id, data);
      res.json({
        mensaje: `La marca ${data.nombre} (${id}) se actualizó Correctamente`,
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

//función eliminar Marca
const eliminarMarca = async (req, res) => {
  try {
    const id = req.params.id;
    await Marca.findByIdAndDelete(id);
    //await Marca.findByIdAndUpdate(id, { activo: false });
    res.status(200).json(`La marca ${id} se eliminó Correctamente`);
  } catch (error) {
    res.status(500).json(`Error, no fue posible eliminar la Marca ${id}`);
  }
};
module.exports = {
  listarMarcas,
  crearMarca,
  actualizarMarca,
  eliminarMarca,
};
