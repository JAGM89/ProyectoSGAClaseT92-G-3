const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/ventas', (req, res) => {
    const { id_cliente, id_vendedor } = req.body;
  
  
    if (!id_cliente || !id_vendedor) {
      console.log("Faltan campos.");
      return res.status(403).json({ status: 403, message: 'id_cliente e id_vendedor son requeridos.' });
    }
  
    const sql = `
      SELECT * FROM vehiculos
      WHERE disponibilidad = TRUE
      ORDER BY fecha_publicacion ASC
      LIMIT 1;
<<<<<<< Updated upstream
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
=======
    `;
  
    pool.query(sql, (err, vehiculos) => {
>>>>>>> Stashed changes
      if (err) {
        console.log("Error al consultar vehículos:", err);
        return res.status(500).json({ status: 500, message: 'Error al consultar vehículos.' });
      }
  
      console.log("Vehículos disponibles:", vehiculos);
  
      if (vehiculos.length === 0) {
        console.log("No hay vehículos disponibles.");
        return res.status(400).json({ status: 400, message: 'No hay vehículos disponibles.' });
      }
<<<<<<< Updated upstream
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
=======
  
      const vehiculo = vehiculos[0];
      const precio = vehiculo.precio;
      const impuestos = precio * 0.15;
      const total = precio + impuestos;
  
      console.log("Datos de la venta:", { precio, impuestos, total });
  
      const insertVenta = `
        INSERT INTO ventas (id_vehiculo, id_cliente, id_vendedor, precio_final, impuestos, total)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
  
      pool.query(insertVenta, [vehiculo.id_vehiculo, id_cliente, id_vendedor, precio, impuestos, total], (err2, result) => {
        if (err2) {
          console.error("ERROR AL INSERTAR LA VENTA:", err2);
          return res.status(500).json({ status: 500, message: 'Error al registrar la venta.' });
        }
  
        console.log("Venta registrada con ID:", result.insertId);
  
  
        res.status(201).json({ status: 201, message: 'Venta registrada con éxito.', id_venta: result.insertId });
      });
>>>>>>> Stashed changes
    });
  });


  router.get('/ventas',  (req, res) => {
    const sql = `
      SELECT 
        v.id_venta,
        v.fecha_venta,
        c.nombre AS cliente,
        u.nombre AS vendedor,
        ve.marca,
        ve.modelo,
        v.precio_final,
        v.impuestos,
        v.total
      FROM ventas v
      JOIN clientes c ON v.id_cliente = c.id_cliente
      JOIN usuarios u ON v.id_vendedor = u.id_usuario
      JOIN vehiculos ve ON v.id_vehiculo = ve.id_vehiculo
      ORDER BY v.fecha_venta DESC;
    `;
  
    pool.query(sql, (err, results) => {
      if (err) {
        console.error("Error al obtener ventas:", err);
        return res.status(500).json({ status: 500, message: 'Error al obtener ventas.' });
      }
  
      res.status(200).json({ status: 200, ventas: results });
    });
  });

    module.exports = router;