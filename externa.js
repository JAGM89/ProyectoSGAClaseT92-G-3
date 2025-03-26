const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const API_KEY = '0a507f5af2ee11611f5406a4'; 

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'AutoloteDB'
});

pool.getConnection()
.then(() => console.log('Conexión exitosa...'))
.catch(err => console.error('Error de conexión a MySQL:', err));

app.get('/api/vehiculos/:moneda', async (req, res) => {
    const { moneda } = req.params;

    try {
        const [vehiculos] = await pool.query("SELECT id_vehiculo, marca, modelo, año, precio FROM vehiculos");

        if (vehiculos.length === 0) {
            return res.status(404).json({ status: 404, message: "No hay vehículos disponibles" });
        }

        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/HNL`);
        const tasas = response.data.conversion_rates;

        if (!tasas[moneda]) {
            return res.status(400).json({ status: 400, message: "Moneda no válida" });
        }

        const vehiculosConvertidos = vehiculos.map(v => ({
            id: v.id_vehiculo,
            marca: v.marca,
            modelo: v.modelo,
            año: v.año,
            precioOriginal: `${v.precio} HNL`,
            precioConvertido: `${(v.precio * tasas[moneda]).toFixed(2)} ${moneda}`
        }));

        res.status(200).json({ status: 200, message: "success", data: vehiculosConvertidos });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Error al obtener los datos", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
