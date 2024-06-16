const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ mensaje: "Error, No se encuentra el token de Autenticación en la cabecera de la petición" });
  }

  try {
    const payload = jwt.verify(token, "1234567");
    req.payload = payload;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Error, el token de cabecera que ingreso expiró o no es válido" });
  }
};

module.exports = {
    validarJWT
};
