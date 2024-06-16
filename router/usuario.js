const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middleware/validar-jwt");
const { validarRolAdmin } = require("../middleware/validar-rol-admin");
const {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/controllerUsuario");

const router = Router();

// método GET de la ruta /usuario
router.get("/", [validarJWT, validarRolAdmin], listarUsuarios);

// método CREATE de la ruta /usuario
router.post(
  "/",
  [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("email", "invalid.email").isEmail(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
    check("password", "invalid.nombre").not().isEmpty(),
    check("rol", "invalid.rol").isIn(["Administrador", "Docente"]),
  ], 
  [validarJWT, validarRolAdmin],
  crearUsuario
);

//método UPDATE de la ruta /usuario
router.put(
  "/:id", 
  [validarJWT, validarRolAdmin],
  actualizarUsuario
);

//método DELETE de la ruta /usuario
router.delete("/:id", [validarJWT, validarRolAdmin], eliminarUsuario);

module.exports = router;
