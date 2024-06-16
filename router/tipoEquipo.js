const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middleware/validar-jwt");
const { validarRolAdmin } = require("../middleware/validar-rol-admin");
const {
  listarTipoEq,
  crearTipoEq,
  actualizarTipoEq,
  eliminarTipoEq,
} = require("../controllers/controllerTipoEquipo");

const router = Router();

// GET method route
router.get("/", [validarJWT, validarRolAdmin], listarTipoEq);

// POST method route
router.post(
  "/",
  [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
  ],
  [validarJWT, validarRolAdmin],
  crearTipoEq
);

// PUT method route
router.put(
  "/:id",
  [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
  ],
  [validarJWT, validarRolAdmin],
  actualizarTipoEq
);

// DELETE method route
router.delete("/:id", [validarJWT, validarRolAdmin], eliminarTipoEq);

module.exports = router;
