const express=require('express');
const app=express();

require('dotenv').config();

const PORT=process.env.PORT;

const vehiculoRoutes = require('./routes/vehiculos');
const clientesRoutes = require('./routes/clientes');
const ventasRouter = require('./routes/ventas');



//const ventaRoutes=require('./routes/ventas');

app.use(express.json());
app.use('/api',vehiculoRoutes);
app.use('/api',clientesRoutes);
app.use('/api', ventasRouter);

//app.use('/api',ventaRoutes);



app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})