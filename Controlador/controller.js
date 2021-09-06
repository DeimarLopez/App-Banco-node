const connection = require('../Conexion/conexion');
const cnn = connection();
const reder = require('ejs');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const controller = {};

controller.index = (req, res, next) => {
    res.render('login');
}


controller.login = async (req, res, next) => {
    const usu = await req.body.usu;
    const cla = await req.body.password;
    cnn.query('SELECT * FROM db_banco.tb_usuarios u inner join db_banco.tb_cliente c using(doccli) WHERE u.nomusu=?', [usu], async (err, resultado) => {
        if (err) {
            next(new Error(err));
        } else if (resultado != 0 && await (bcryptjs.compare(cla, resultado[0].clave))) {
            console.log('Datos Correctos');
            doc = resultado[0].doccli;
            rol = resultado[0].rol;
            user = resultado[0].nomusu;
            uss = resultado[0].nomcli;
            ape = resultado[0].apecli;
            correo = resultado[0].correocli;
            celular = resultado[0].celularcli;
            genero = resultado[0].sexo;
            fechanaci = fecha(resultado[0].fechanacicli);
            if (resultado[0].sexo == 'F') {
                saludo = "Bienvenida Señorita"
            } else {
                saludo = "Bienvenido Señor"
            }
            req.session.login = true;
            switch (rol) {
                case 'Cliente':
                    res.redirect('Clientemain');
                    break;

                case 'Empleado':
                    res.redirect('Empleadomain');
                    break;

                case 'Administrador':
                    res.redirect('Administradormain');
                    break;
            }
        }
    });
}


controller.cerrar = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}

function fecha(dato) {
    let fech = dato.toLocaleDateString();
    let fechas = fech.split('/').reverse();

    if (fechas[1].length <= 1 && fechas[2].length <= 1) {
        fech = fechas.join('-0');
    } else if (fechas[1].length > 1 && fechas[2].length <= 1) {
        fech = `${fechas[0]}-${fechas[1]}-0${fechas[2]}`;
    } else if (fechas[2].length > 1 && fechas[1].length <= 1) {
        fech = `${fechas[0]}-0${fechas[1]}-${fechas[2]}`;
    } else {
        fech = fechas.join('-');
    }
    return fech;
}

module.exports = controller;