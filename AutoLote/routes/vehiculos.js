const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/vehiculos-disponibles', (req, res) => {
  const sql = `
    SELECT 
      v.id_vehiculo,
      v.marca,
      v.modelo,
      v.anio,
      v.precio,
      v.fecha_publicacion
    FROM vehiculos v
    WHERE v.disponibilidad = TRUE
    ORDER BY v.fecha_publicacion ASC;
  `;

  pool.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: 500, message: 'Error al consultar los vehículos.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ status: 404, message: 'No hay vehículos disponibles.' });
    }

    res.status(200).json({ status: 200, message: 'Vehículo disponible', vehiculos: results });
  });
});

router.post('/vehiculos', (req, res) => {
    const { marca, modelo, anio, precio, disponibilidad, descripcion } = req.body;
  
  
    if (!req.body || !marca || !modelo || anio == null || precio == null) {
      return res.status(400).json({ status: 400, message: 'Faltan campos obligatorios.' });
    }
  
    const sql = `
      INSERT INTO vehiculos (marca, modelo, anio, precio, disponibilidad, descripcion)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    const values = [marca, modelo, anio, precio, disponibilidad ?? true, descripcion ?? null];
  
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ status: 500, message: 'Error al registrar el vehículo.' });
      }
  
      res.status(201).json({ status: 201, message: 'Vehículo registrado correctamente.' });
    });
  });

  router.delete('/vehiculos/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM vehiculos WHERE id_vehiculo = ?`;
  
    pool.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ status: 500, message: 'Error al eliminar.' });
      res.status(200).json({ status: 200, message: 'Vehículo eliminado.' });
    });
  });

  router.get('/vehiculos', (req, res) => {
    const sql = `SELECT * FROM vehiculos ORDER BY fecha_publicacion DESC`;
  
    pool.query(sql, (err, results) => {
      if (err) {
        console.error(" Error al obtener vehículos:", err);
        return res.status(500).json({ status: 500, message: 'Error al obtener vehículos.' });
      }
  
      res.status(200).json({ status: 200, vehiculos: results });
    });
  });

module.exports = router;