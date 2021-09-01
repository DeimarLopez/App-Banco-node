const express = require('express');
const rutas = express.Router();
const controller = require('../Controlador/controller');
const controllerCli = require('../Controlador/controllerCli');
rutas.get('/usuario',controller.consultaUsu);
rutas.get('/Cliente',controller.consultaCli);
rutas.get('/Adminmain',controller.admin);
rutas.get('/lineas',controller.consultaLi); 
rutas.get('/clientes',controller.consultaCli); 
rutas.get('/creditos',controller.consultaCre);
rutas.get('/cerrar',controller.cerrar),
/* rutas.get('/',controller.consultaCre); */
/* rutas.post('/insertLineas',controller.insertarLineas); */
/* rutas.post('/insertarClientes',controller.insertarClientes); */
rutas.post('/frminsertar',controller.insertar);
rutas.post('/actualizar',controller.actualizar);
rutas.post('/eliminar',controller.eliminar);
/* rutas.post('/insertarCreditos',controller.insertarCreditos) */


/* Login */
rutas.get('/', controller.index);
rutas.post('/login',controller.login);

/* Cliente  */
rutas.get('/Clientemain',controllerCli.cliente);
rutas.get('/seguridadCli',controllerCli.seguridad);
rutas.post('/seguridad',controllerCli.seguridadnew);
rutas.get('/datosCli',controllerCli.datos);
rutas.post('/datos',controllerCli.datosnew);


module.exports = rutas;