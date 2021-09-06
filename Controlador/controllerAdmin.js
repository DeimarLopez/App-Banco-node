const connection = require('../Conexion/conexion');
const cnn = connection();
const reder = require('ejs');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const controllerAdmin = {};


controllerAdmin.administrador = (req, res, next) => {
    console.log('En la vista de Administrador');
    res.render('Administradormain');
    res.redirect('Administradormain');
}

controllerAdmin.consultaUsu = (req, res, next) => {
    if (req.session.login) {

        cnn.query('SELECT * FROM tb_usuarios', (err, resbd) => {
            if (err) {
                next(new Error(err));
            } else {
                console.log(resbd);
                res.render('usuariosAdm', { datosUs: resbd });
            }
        })
    } else {
        res.redirect('/usuariosAdm');
    }
}



controllerAdmin.insertar = async (req, res, next) => {
    const documento = req.body.documento;
    const usuario = req.body.usuario;
    const clave = req.body.clave;
    const rol = req.body.rol;
    const estado = req.body.estado;
    const imagen = req.body.imagen;
    const pass = await bcryptjs.hash(clave, 8);
    cnn.query('INSERT INTO tb_usuarios SET?',
        {
            doccli: documento,
            nomusu: usuario,
            clave: pass,
            rol: rol,
            estado: estado,
            imagen: imagen
        },
        (err, resbd) => {
            if (err) {
                next(new Error(err));
            }
            else {
                console.log(resbd);
                res.redirect('/usuariosAdm');
            }
        }
    );
}



controllerAdmin.actualizar = async (req, res, next) => {
    const doc = req.body.do;
    const usu = req.body.us;
    const cla = req.body.cl;
    const rol = req.body.ro;
    const est = req.body.es;
    const img = req.body.im;
    const password = await bcryptjs.hash(cla, 8);

    cnn.query('UPDATE tb_usuarios SET nomusu="' + usu + '",clave="' + password + '",rol="' + rol + '",estado="' + est + '",imagen="' + img + '" WHERE doccli="' + doc + '"', async (err, respbd) => {

        if (err) {
            next(new Error(err));
        } else {
            console.log(respbd);
            res.redirect('/usuario');
        }

    });
}

controllerAdmin.eliminar = (req, res, next) => {
    const doc = req.body.do;
    cnn.query('DELETE FROM tb_usuarios WHERE doccli="' + doc + '"', async (err, respbd) => {

        if (err) {
            next(new Error(err));
        } else {
            console.log(respbd);
            res.redirect('/usuario');
        }

    });
}

module.exports = controllerAdmin;