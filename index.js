const express = require("express");
const mysql      = require('mysql');
const PORT = process.evn.PORT || 3050;
const app = express()

app.use(express.json());

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mesosat',
  password : 'ACITRoom',
  database : 'satmeso'
});

//Rutas
app.get('/', (res, req) => {
    res.send('Bienvenido a la API')
})

app.get('/leer', (req, res) => {
    const sql = 'SELECT * FROM lectura';
  
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('Sin resultados');
      }
    });
});

app.post('/guardar', (req, res) => {
    const sql = 'INSERT INTO lectura SET ?';
  
    const lectura = {
      valor: req.body.valor,
      fecha: new Date()
    };
  
    connection.query(sql, lectura, error => {
      if (error) throw error;
      res.send('Lectura guardada!');
    });
});


//Conexion
connection.connect( error => {
    if(error)throw error;
    console.log("Conexion BD exitosa");
});

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en puerto: ${PORT}`)
})