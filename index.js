const express = require('express');
const { getConnection } = require('./db/db-conection-mongo');
require('dotenv').config();

const app = express();

const port = process.env.PORT;
getConnection();

app.use(express.json());

app.use('/auth', require('./router/auth'));
app.use('/usuario', require('./router/usuario'));
app.use('/marca', require('./router/marca'));
app.use('/estado-equipo', require('./router/estadoEquipo'));
app.use('/tipo-equipo', require('./router/tipoEquipo'));
app.use('/inventario', require('./router/inventario'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})