const mongoose = require("mongoose");

// Definimos la función para la conexión
const getConnection = async () => {
  const url = 'mongodb+srv://johanholguinaa:04cB9ogTOXUfTWjh@clusteriudigital.q4yt934.mongodb.net/EA3-Inventarios-IUDigital';
  try {
    console.log("Intentando conectar...");
    await mongoose.connect(url);
    console.log("Conexión exitosa");
  } catch (error) {
    console.error("Error en la conexión:", error);
  }
};

// Exportamos la función de conexión
module.exports = {
  getConnection
};