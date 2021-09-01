const connection = require('../Conexion/conexion');
const cnn = connection();
const reder = require('ejs');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const controllerCli = {};

controllerCli.cliente=(req,res,next)=>{
    console.log('En la vista de Usuario');
    res.render('Clientemain');
    res.redirect('Clientemain');
}

controllerCli.seguridad=(req,res,next)=>{
    console.log('En la vista de Seguridad');
    res.render('SeguridadCli');
    res.redirect('SeguridadCli');
}

controllerCli.seguridadnew = async (req,res,next)=>{
    const documento = doc;
    const clave = req.body.newpass;
    const user = req.body.newuser;
    const pass = await bcryptjs.hash(clave,8);

    cnn.query(`UPDATE tb_usuarios SET nomusu = '${user}', clave = '${pass}' WHERE (doccli = '${documento}');`,
    (err, resbd)=>{
            if(err){
                next(new Error(err));
            }
            else{
                console.log(resbd); 
                res.redirect('/SeguridadCli');
            }
        }
    );  
}

controllerCli.datos=(req,res,next)=>{
    console.log('En la vista de Seguridad');
    res.render('datosCli');
    res.redirect('datosCli');
}

controllerCli.datosnew=(req,res,next)=>{
    const documeto = doc;
    const nom = req.body.nombre;
    const ape = req.body.apellido;
    const correo = req.body.correro;
    const celular = req.body.celular;
    const gen = req.body.genero;
    const fecha = req.body.fechanaci;

    cnn.query(`UPDATE tb_cliente SET nomcli = '${nom}', apecli = '${ape}', correocli = '${correo}', celularcli = '${celular}', sexo = '${gen}', fechanacicli = '${fecha}' WHERE (doccli = '${documeto}');`,
    (err, resbd)=>{
        if(err){
            next(new Error(err));
        }
        else{
            console.log(resbd); 
            res.redirect('/datosCli');
        }
    }
    );
}

module.exports = controllerCli;