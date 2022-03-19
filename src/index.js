const express = require('express');
const bodyParser = require('body-parser');

const app = express();

 
//ENTENDER A REQUISIÇÃO PARA A API
app.use(bodyParser.json());
//ENTENDER OS PARAMETROS VIA URL
app.use(bodyParser.urlencoded({extended: false}))

require('./app/controllers/authController')(app);
require('./app/controllers/filmesController')(app);
require('./app/controllers/userController')(app);
require('./app/controllers/alugaController')(app);

app.listen(8080);