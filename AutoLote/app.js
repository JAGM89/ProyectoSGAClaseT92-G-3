const express=require('express');
const app=express();

require('dotenv').config();

const PORT=process.env.PORT;

const vehiculoRoutes = require('./routes/vehiculos');
const userRoutes = require('./routes/users');
//const ventaRoutes=require('./routes/ventas');

app.use(express.json());

app.use('/api',userRoutes);
app.use('/api',vehiculoRoutes); 
//app.use('/api',ventaRoutes);










app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})