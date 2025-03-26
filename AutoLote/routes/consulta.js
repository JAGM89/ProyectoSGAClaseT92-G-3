const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/vehiculos-disponibles', authMiddleware, (req, res) => {
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

    res.status(200).json({ status: 200, mesagge: 'vehiculo diponible', vehiculos: results });
  });
});

module.exports = router;