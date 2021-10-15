const express = require("express");
const mysql      = require('mysql');
const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json());

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'meso',
  password : 'mesoxela',
  database : 'satmeso'
});

//Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a la API SAT')
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
      fecha: req.body.fecha,
      hora: req.body.hora
    };
  
    connection.query(sql, lectura, error => {
      if (error) throw error;
      res.send('Lectura guardada!');
    });
});

app.post('/obtener', (req, res) => {
  const sql = 'SELECT * FROM lectura WHERE fecha=?';

  const lectura = {    
    fecha: req.body.fecha,    
  };

  connection.query(sql, lectura, error => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Sin resultados');
    }
  });
});

app.get('/ver/:fecha', (request, res) => {
  let select = 'SELECT * FROM lectura WHERE fecha = ?'
  connection.query(select, request.params.fecha, (error, result) => {
      if(error){
          console.log(error)
      }
      res.send(result)
  })
})


//Conexion
connection.connect( error => {
    if(error)throw error;
    console.log("Conexion BD exitosa");
});

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en puerto: ${PORT}`)
})