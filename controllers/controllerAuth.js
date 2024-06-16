const Usuario = require("../models/Usuario");
const { validationResult } = require("express-validator");
const bycript = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const generarToken = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ mensaje: errors.array() });
    }

    const existeUser = await Usuario.findOne({ email: req.body.email });
    if (!existeUser) {
      return res
        .status(401)
        .send(
          `El usuario ${req.body.email} no existe en la BD, favor verifique e intente nuevamente`
        );
    }

    const esIgual = bycript.compareSync(req.body.password, existeUser.password);
    if (!esIgual) {
      return res.status(401).json({
        mensaje:
          "Error, la contraseña que ha ingresado es Incorrecta, favor verifique e intente nuevamente",
      });
    }

    const token = generarJWT(existeUser);
    res.json({
      _id: existeUser._id,
      nombre: existeUser.nombre,
      email: existeUser.email,
      rol: existeUser.rol,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al intentar generar token");
  }
};

module.exports = {
  generarToken,
};
