// **importaciones de express
const { json } = require('express');
const express = require('express');
const app = express();

//*importaciones sqlite3

const sqlite3 = require('sqlite3').verbose();

// ** CONEXION A SQL
const db = new sqlite3.Database('./ejemplo.db',(err)=>{
    if(err){   return console.error(err.message);}
    //si todo va bien dira: 
    console.log("Conection succesfully");
});

function closeDB(){
  db.close((err)=>{
    if(err){   return console.error(err.message);}
    console.log("Cerrado sin problemas");
    
  });
}
 
// ** Para crear una tabla
/* db.run("CREATE TABLE  motocicletas(id INTEGER NOT NULL, modelo TEXT,año INTEGER,variante TEXT )",(err)=>{
  if (err) {return console.error(err.message);}
}); */

  // ** CONSULTA LA PRIMERA FILA O A UN SOLO RESULTADO COMO UN SUM COUNT ETC...

  /* let consultaEspecifico = `SELECT modelo FROM motocicletas WHERE id  = ?`;
  let id = 2;
  
  // first row only
 db.get(consultaEspecifico, [id], (err, row) => {
  if (err) {return console.error(err.message);
  }
  return row
    ? console.log("modelo: ",row.modelo)
    : console.log(`No se encontro la motocicleta con ID: ${id}`);

}); */

  // ** CONSULTA PARA TODA LA COLUMNA

  /* const consultaSelect= "Select * FROM motocicletas;"
  var Resultados = "";
  db.all(consultaSelect, (err, rows) => {
    if (err) {return console.error(err.message);}

    Resultados= row
    
  }); */






// **INSERTANDO DATOS -CREATE
app.post('/motocicletas/',(req,res)=>{
  let parametrosQuery = req.query;
  

 sql = `INSERT INTO motocicletas(id,modelo, año,variante) VALUES ( ${parametrosQuery.id} ,"${parametrosQuery.modelo}", ${parametrosQuery.año}, "${parametrosQuery.variante}")`
 

db.run(sql, function(err) { if (err) {
      return console.error(err.message);}
      console.log(`Sucessfully--Rows inserted ${this.changes}`);
      res.send(`se añadio la siguiente información: ${parametrosQuery}`)
  }); 
});

// **CONSULTA DE DATO ESPECIFICO --READ
app.get('/modelos/:id',(req,res)=>{
    const idParam = req.params.id;   
    let querySelect = `SELECT modelo FROM motocicletas WHERE id= ${idParam}`
   
     db.get(querySelect,(err,row)=> {

     if(err){return console.error();} 
     console.log(`Modelo: ${row.modelo}`);
     res.send(`Modelo: ${row.modelo}`);
     
    })

 
  
});


// **CONSULTA DE TODOS LOS DATOS --READ
app.get('/modelos',(req,res)=>{
   
  let querySelect = `SELECT * FROM motocicletas;`
 
   db.all(querySelect,(err,rows)=> {

   if(err){return console.error();} 
    // ** para recorrese 
   rows.forEach((rows) => {
   // console.log(rows);
  });

  
   
   res.send(rows);
   
  })



});
 

// ** ACTUALIZANDO DATOS -- UPDATE
app.patch('/modelos/:id',(req,res)=>{
/* const parametros = req.params;
  
const sqlUpdate ="UPDATE motocicletas SET variante='SPORT' WHERE id=3"
db.run(sqlUpdate,(err)=>{
  if (err) {return console.error(err.message);}

  console.log(`Datos actualizados`);
}); */
});

  // ** BORRANDO DATOS -- DELETE
app.delete('/modelos',(req,res)=>{
/* const consultaDelete = "DELETE FROM motocicletas WHERE id =4"
db.run(consultaDelete,(err)=>{
  if (err) { return console.error(err.message);}
  console.log("Elemento borrado");
})
 */

});







app.listen(8080,()=>{
    console.log(`El servidor esta escuchando en el puerto:  8080`);
}); 

// ** Cerrando la conexión
