const express=require('express');
const jwt=require('jsonwebtoken');
const pool=require('../config/db');
const router=express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt=require('bcrypt'); 

require('dotenv').config();


router.post('/login',async (req,res)=>{
    const {nombre,contraseña} = req.body;

    const sql = 'select * from usuarios where nombre = ?';

    pool.query(sql,[nombre], async (err,resultado)=>{
        if(err){
            return res.status(500).json({status:500,message:'Error del servidor'});
        }

        if(resultado.length === 0){
            return res.status(401).json({status:401,message:'Credenciales invalidas...'});
        }

        let user = resultado[0];    

       const isMatch = await bcrypt.compare(contraseña, user.contraseña);

        if(!isMatch){
            return res.status(401).json({status:401,message:'Credenciales invalidas...'});
        }

        const token = jwt.sign(
            {id: user.codigo, username: user.username},
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        );
        res.json({status:200,message:'Success',token});
    });
});

router.post('/usuarios',authMiddleware ,async (req,res)=>{
    const {nombre,correo,contraseña,rol} = req.body;

    const sql = 'insert into usuarios (nombre,correo,contraseña,rol) values(?,?,?,?)';

    if (!nombre || !correo || !contraseña || !rol) {
        return res.status(400).json({ status: 400, message: "Faltan datos obligatorios" });
      }

    const saltRound = 10;
    const passwordEncrypt = await bcrypt.hash(contraseña, saltRound);

    pool.query(sql,[nombre,correo,passwordEncrypt,rol],  (err,resultado)=>{
        if(err){
            return res.status(500).json({status:500,message:'Error del servidor'});
        }

        res.json({status:200,message:'Success', codigo: resultado.insertId});
    });
});


module.exports=router;
