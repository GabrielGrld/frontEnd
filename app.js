//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const axios = require('axios');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
app.use(express.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/menu.html");

app.get('/adduser', function(req, res){
  res.sendFile(__dirname+"/adduser.html");
});

app.get('/finduser', function(req, res){
  res.sendFile(__dirname+"/cliente.html");
});

app.get('/seeusers', function (req, res){
  res.sendFile(__dirname+"/clientes.html");
});


  app.post('/create', function(req, res) {
    const query = req.body;
    const usuario_id = req.body.usuario_id;
    const identificacion = req.body.identificacion;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const nacionalidad = req.body.nacionalidad;
    const telefono = req.body.telefono;

    const data = {
      usuario_id: usuario_id,
      identificacion: identificacion,
      nombre: nombre,
      apellido: apellido,
      nacionalidad: nacionalidad,
      telefono: telefono
    };
    axios.post('https://grupo10-p27.herokuapp.com/cliente/', data)
    .then(function(response){
      console.log(response.status);

      if (response.status === 201) {
        res.sendFile(__dirname+"/success.html");
      }

    })
    .catch(function(error){
      console.log(error);
      res.sendFile(__dirname+"/failure.html");
    });

    
  });

  app.post("/menu", function(req, res){
    res.redirect("/");
  });

});

app.listen('3000', function() {
  console.log("Server running on port 3000.");

});
