const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middleware/validar-jwt");
const { validarRolAdmin } = require("../middleware/validar-rol-admin");
const {
  listarEstadosEq,
  actualizarEstadoEq,
  crearEstadoEq,
  eliminarEstadoEq,
} = require("../controllers/controllerEstadoEquipo");

const router = Router();

// GET method route
router.get("/", [validarJWT, validarRolAdmin], listarEstadosEq);

// POST method route
router.post(
  "/",
  [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
  ],
  [validarJWT, validarRolAdmin],
  crearEstadoEq
);

// PUT method route
router.put(
  "/:id",
  [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
  ],
  [validarJWT, validarRolAdmin],
  actualizarEstadoEq
);

// DELETE method route
router.delete("/:id", [validarJWT, validarRolAdmin], eliminarEstadoEq);

module.exports = router;
