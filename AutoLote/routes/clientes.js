const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// Registrar nuevo cliente
router.post('/clientes', (req, res) => {
  const { nombre, correo, telefono } = req.body;

  if (!nombre || !correo || !telefono) {
    return res.status(400).json({ status: 400, message: 'Todos los campos son obligatorios.' });
  }

  const sql = `
    INSERT INTO clientes (nombre, correo, telefono)
    VALUES (?, ?, ?);
  `;

  pool.query(sql, [nombre, correo, telefono], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: 500, message: 'Error al registrar cliente.' });
    }

    res.status(201).json({ status: 201, message: 'Cliente registrado exitosamente.', id_cliente: result.insertId });
  });
});

// Guardar consulta o solicitud de prueba
router.post('/clientes/consulta', (req, res) => {
  const { id_cliente, tipo_consulta, mensaje } = req.body;

  if (!id_cliente || !tipo_consulta) {
    return res.status(400).json({ status: 400, message: 'id_cliente y tipo_consulta son requeridos.' });
  }

  const sql = `
    INSERT INTO consultas_clientes (id_cliente, tipo_consulta, mensaje)
    VALUES (?, ?, ?);
  `;

  pool.query(sql, [id_cliente, tipo_consulta, mensaje], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: 500, message: 'Error al guardar consulta.' });
    }

    res.status(201).json({ status: 201, message: 'Consulta guardada con éxito.', id_consulta: result.insertId });
  });
});

// Obtener historial de consultas de un cliente
router.get('/clientes/:id_cliente/consultas', (req, res) => {
  const { id_cliente } = req.params;

  const sql = `
    SELECT * FROM consultas_clientes
    WHERE id_cliente = ?
    ORDER BY fecha_consulta DESC;
  `;

  pool.query(sql, [id_cliente], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: 500, message: 'Error al obtener historial.' });
    }

    res.status(200).json({ status: 200, historial: results });
  });
});

module.exports = router;