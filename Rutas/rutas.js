const express = require('express');
const rutas = express.Router();
const controller = require('../Controlador/controller');
const controllerCli = require('../Controlador/controllerCli');
const controllerEmple = require('../Controlador/controllerEmple');

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
rutas.get('/creditosCliV',controllerCli.consultaCreCli);
rutas.get('/creditosV',controllerCli.consultaLi);
rutas.get('/consignarCli',controllerCli.consignar);
rutas.post('/consignar',controllerCli.consignarnew);
rutas.get('/TransferirCli',controllerCli.trasnferir);
rutas.post('/transferir',controllerCli.transferirnew);
rutas.get('/retirarCli',controllerCli.retirar);
rutas.post('/retirar',controllerCli.retirarnew);


/* Empleado */
rutas.get('/Empleadomain',controllerEmple.Empleado);
rutas.get('/cuentaEmple',controllerEmple.UssinCuen);
rutas.post('/cuenta',controllerEmple.cuenta);
rutas.get('/asigCredEmple',controllerEmple.asicredito);
rutas.post('/asigcredito',controllerEmple.credito);
rutas.get('/lineasEmp',controllerEmple.consultaLi);
rutas.post('/crealinea',controllerEmple.crealinea);



module.exports = rutas;