const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/ventas', authMiddleware, (req, res) => {
  const { id_cliente, id_vendedor } = req.body;

  if (!id_cliente || !id_vendedor) {
      return res.status(403).json({ status: 403, message: 'id_cliente e id_vendedor son requeridos.' });
  }

  const sql = `
      INSERT INTO ventas (id_vehiculo, id_cliente, id_vendedor, precio_final, impuestos, total)
      SELECT 
          v.id_vehiculo, 
          ?,  
          ?,  
          v.precio, 
          v.precio * 0.15,  
          v.precio * 1.15   
      FROM vehiculos v
      WHERE v.disponibilidad = TRUE
      ORDER BY v.fecha_publicacion ASC  
      LIMIT 1;
  `;

  const sqlUpdate = `
   UPDATE vehiculos 
   SET disponibilidad = FALSE 
   WHERE id_vehiculo = (
       SELECT id_vehiculo 
       FROM ventas 
       ORDER BY fecha_venta DESC 
       LIMIT 1
   );
`;

  pool.query(sql, [id_cliente, id_vendedor], (err, results) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ status: 500, message: 'Error al insertar la venta.' });
      }

      if (results.affectedRows === 0) {
          return res.status(400).json({ status: 400, message: 'No hay vehículos disponibles.' });
      }
      pool.query(sqlUpdate, (err, updateResults) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: 500, message: 'Error al actualizar la disponibilidad del vehículo.' });
        }

        res.status(201).json({ 
            status: 201, 
            message: 'Venta registrada con éxito y disponibilidad del vehículo actualizada.', 
            venta_id: results.insertId 
        });
    });
  });
});



module.exports=router;