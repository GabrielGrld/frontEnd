//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const axios = require('axios');


const app = express();

var clientesJSON = []; // Here we save the clientes objects

app.use(bodyParser.urlencoded({  extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/menu.html");
  });

app.get('/adduser', function(req, res){
  res.sendFile(__dirname+"/adduser.html");
});

app.get('/finduser', function(req, res){
  res.sendFile(__dirname+"/cliente.html");
});

//this get is for get the clientes and display them in a table using EJS template
app.get('/seeusers', function (req, res){
  axios.get('https://grupo10-p27.herokuapp.com/cliente/')
    .then(function(response){
      clientesJSON = response.data;   // Aqui obtengo el Objeto JSON con todos los clientes
      for (let i = 1; i<10;i++){
        console.log(clientesJSON[i]);
      }

      console.log(response.status);
      if (response.status === 201) {
        console.log("Status is");
      }

    })
    .catch(function(error){
      console.log(error);

    });
  res.render('clientes', {  clientesJSON: clientesJSON });
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



app.listen('3000', function() {
  console.log("Server running on port 3000.");
});
