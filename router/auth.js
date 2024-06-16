const { Router } = require("express");
const { check } = require("express-validator");
const { generarToken } = require("../controllers/controllerAuth");
const router = Router();

// POST method route
router.post(
  "/",
  [
    check("email", "invalid.email").isEmail(),
    check("password", "invalid.nombre").not().isEmpty(),
  ],
  generarToken
);

module.exports = router;
