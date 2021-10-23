//jshint esversion:6
const express = require ("express");
const https = require ("https");
const bodyParser = require("body-parser");
const request = require ("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/adduser.html");

app.post('/', function(req, res){
  const query = req.body;
  const usuario_id = req.body.usuario_id;
  const identificacion = req.body.identificacion;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const nacionalidad = req.body.nacionalidad;
  const telefono = req.body.telefono;

  const data = {
    usuario_id:usuario_id,
    identificacion:identificacion,
    nombre:nombre,
    apellido:apellido,
    nacionalidad: nacionalidad,
    telefono: telefono
  };
  var jsonData = JSON.stringify(data);
  console.log(jsonData);
  const url = "https://grupo10-p27.herokuapp.com/cliente/";
const options = {
  method:"POST"
};
  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });
request.write(jsonData);
request.end();
});

// app.post('https://grupo10-p27.herokuapp.com/cliente/', function(req, res){
//   const query = req.body;
//   console.log(query);
//
// });

});

app.listen('3000', function(){
console.log("Server running on port 3000.");

});
