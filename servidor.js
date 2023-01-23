const express = require('express');

const app = express();

app.get('/modelos',(req,res)=>{

    res.send("Lista de resultados");
    console.log("solicitando modelos");
});

app.post('/modelos',(req,res)=>{

    res.send("Modelo reibido");
    console.log("recibiendo modelos");
});

app.patch('/modelos',(req,res)=>{

    res.send("Peticion de modificación exitosa");
    console.log("Se recibio el id del objeto a modificar y se modificara");
});

app.delete('/modelos',(req,res)=>{
    res.send("ID recibido, elemento borrado");
    console.log("Se recibio el id del objeto a modificar y se eliminara");
});




app.listen(8080,()=>{
    console.log(`El servidor esta escuchando en el puerto:  8080`);
});