const express = require('express');
const rutas = express.Router();
const controller = require('../Controlador/controller');
const controllerCli = require('../Controlador/controllerCli');
const controllerEmple = require('../Controlador/controllerEmple');
const controllerAdmin = require('../Controlador/controllerAdmin');


/* Login */
rutas.get('/', controller.index);
rutas.post('/login',controller.login);
rutas.get('/cerrar',controller.cerrar),

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
rutas.post('/actualizarLi',controllerEmple.actulinea);
rutas.post('/eliminarLi',controllerEmple.elilinea);
rutas.get('/datosEmpCli',controllerEmple.insertCli);
rutas.post('/insertCli',controllerEmple.insertClinew);
rutas.get('/clientesEmp',controllerEmple.consultaCli);
rutas.post('/actualizarCli',controllerEmple.actuaCli);
rutas.post('/eliminarCli',controllerEmple.eliminarCli);
rutas.get('/creditosEmp',controllerEmple.consultaCre);
rutas.post('/actualizarCre',controllerEmple.actuaCre);
rutas.post('/eliminarCre',controllerEmple.eliminarCre);

/* Administrador */
rutas.get('/Administradormain',controllerAdmin.consultaUsu);
rutas.get('/usuariosAdm',controllerAdmin.consultaUsu);
rutas.post('/crearUsuario',controllerAdmin.insertar);
rutas.post('/actualizarUsu',controllerAdmin.actualizar);
rutas.post('/eliminarUsu',controllerAdmin.eliminar);

module.exports = rutas;