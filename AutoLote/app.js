const express=require('express');
const app=express();

require('dotenv').config();

const PORT=process.env.PORT;

const vehiculoRoutes = require('./routes/vehiculos');
const clientesRoutes = require('./routes/clientes');
const ventasRouter = require('./routes/ventas');
const usuariosRoutes = require('./routes/usuarios');



app.use('/api', usuariosRoutes);
//const ventaRoutes=require('./routes/ventas');
app.use(express.json());
app.use('/api',vehiculoRoutes);
app.use('/api',clientesRoutes); // Api de clientes
app.use('/api', ventasRouter);


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})