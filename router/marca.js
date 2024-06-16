const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middleware/validar-jwt");
const { validarRolAdmin } = require("../middleware/validar-rol-admin");
const {
  listarMarcas,
  crearMarca,
  actualizarMarca,
  eliminarMarca,
} = require("../controllers/controllerMarca");
const router = Router();

// GET method route
router.get("/", [validarJWT, validarRolAdmin], listarMarcas);

// POST method route
router.post(
  "/",
  [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
  ],
  [validarJWT, validarRolAdmin],
  crearMarca
);

// PUT method route
router.put(
  "/:id",
  [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
  ],
  [validarJWT, validarRolAdmin],
  actualizarMarca
);

// DELETE method route
router.delete("/:id", [validarJWT, validarRolAdmin], eliminarMarca);

module.exports = router;
