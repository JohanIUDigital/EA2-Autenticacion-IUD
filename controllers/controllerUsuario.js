const Usuario = require("../models/Usuario");
const { validationResult } = require("express-validator");
const bycript = require("bcryptjs");

//función listar usuarios
const listarUsuarios = async function (req, res) {
  try {
    const usuarios = await Usuario.find();
    res.send(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error");
  }
};

//función creación de usuario
const crearUsuario = async function (req, res) {
  try {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ mensaje: errors.array() });
    }

    const existeUser = await Usuario.findOne({ email: req.body.email });
    if (existeUser) {
      return res.status(400).send("Email ya existe");
    }

    let usuario = Usuario();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    const salt = bycript.genSaltSync();
    const pass = bycript.hashSync(req.body.password, salt);
    usuario.password = pass;
    usuario.rol = req.body.rol;
    usuario.fechaCreacion = new Date(); //req.body.fechaCreacion;
    usuario.fechaActualizacion = new Date(); //req.body.fechaActualizacion;

    usuario = await usuario.save();
    res.send(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocurrio un error");
  }
};

//función actualizar usuario
const actualizarUsuario = async (req, res) => {
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

    const existeId = await Usuario.findOne({ _id: id });
    if (!existeId) {
      return res
        .status(400)
        .send(
          `El usuario con id ${id} no existe, por favor verifique e intente nuevamente`
        );
    }
    if (id && data) {
      if (data.password) {
        const salt = bycript.genSaltSync();
        const pass = bycript.hashSync(data.password, salt);
        data.password = pass;
      }

      await Usuario.findByIdAndUpdate(id, data);
      res.json({
        mensaje: `El usuario ${data.nombre} (${id}) se actualizó Correctamente`,
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

//función eliminar usuario
const eliminarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    await Usuario.findByIdAndDelete(id);
    //await Usuario.findByIdAndUpdate(id, { activo: false });
    res.status(200).json(`El usuario ${id} se eliminó Correctamente`);
  } catch (error) {
    res.status(500).json(`Error, no fue posible eliminar el usuario ${id}`);
  }
};

module.exports = {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
