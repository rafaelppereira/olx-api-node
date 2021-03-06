require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

const apiRoutes = require('./src/routes');

const PORTSERVER = process.env.PORT || 3000;

//Connecting to database
mongoose.connect("mongodb://127.0.0.1:27017/olx", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.log("Erro: ", error.message);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(fileupload());

server.use(express.static(__dirname+'/public'));

server.use('/', apiRoutes);

server.listen(process.env.PORTSERVER, () => {
  console.log(`- Rodando no endereço: http://localhost:5000`);
})