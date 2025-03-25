const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');





router.post('/vehiculos',authMiddleware,(req, res)=>{
    let vehiculo = req.body;

    if(!vehiculo.marca || !vehiculo.modelo || !vehiculo.año || !vehiculo.precio || !vehiculo.descripcion){
        return res.status(403).json({status:403,message:'Todos los campos son requeridos...'});
    }
    
    const sql ="INSERT INTO vehiculos (marca,modelo,año,precio,descripcion) VALUES(?,?,?,?,?)";
    pool.query(sql,[vehiculo.marca,vehiculo.modelo,vehiculo.año,vehiculo.precio,vehiculo.descripcion],(err, results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({status:500,message:'Error al insertar el registro...'});
        }
        vehiculo.codigo = results.insertId;
        res.status(201).json({status:201,message:'Success',vehiculo});        
    });

});


module.exports = router;