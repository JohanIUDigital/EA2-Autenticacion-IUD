const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middleware/validar-jwt");
const { validarRolAdmin } = require("../middleware/validar-rol-admin");
const {
  listarInventario,
  crearInventario,
  actualizarInventario,
  eliminarInventario,
} = require("../controllers/controllerInventario");

const router = Router();

// GET method route
router.get("/", [validarJWT], listarInventario);

// POST method route
router.post(
  "/",
  [
    check("serial", "invalid.serial").not().isEmpty(),
    check("modelo", "invalid.modelo").not().isEmpty(),
    check("descripcion", "invalid.descripcion").not().isEmpty(),
    check("fotoEquipo", "invalid.fotoEquipo").not().isEmpty(),
    check("colorEquipo", "invalid.colorEquipo").not().isEmpty(),
    check("fechaCompra", "invalid.fechaCompra").not().isEmpty(),
    check("precioEquipo", "invalid.precioEquipo").not().isEmpty(),
    //check("usuarioEquipo", "invalid.usuarioEquipo").not().isEmpty(),
    check("marcaEquipo", "invalid.marcaEquipo").not().isEmpty(),
    check("estadoEquipo", "invalid.estadoEquipo").not().isEmpty(),
    check("tipoEquipo", "invalid.tipoEquipo").not().isEmpty(),
  ],
  [validarJWT, validarRolAdmin],
  crearInventario
);

// PUT method route
router.put("/:id", [validarJWT, validarRolAdmin], actualizarInventario);

// DELETE method route
router.delete("/:id", [validarJWT, validarRolAdmin], eliminarInventario);

module.exports = router;
