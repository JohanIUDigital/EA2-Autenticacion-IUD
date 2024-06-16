const jwt = require("jsonwebtoken");

const validarRolAdmin = (req, res, next) => {
  if (req.payload.rol != "Administrador") {
    return res.status(401).json({
      mensaje: `Error, para acceder a este recurso requiere rol Administrador, rol actual: "${req.payload.rol}"`
    });
  }
  next();
};

module.exports = {
  validarRolAdmin,
};
