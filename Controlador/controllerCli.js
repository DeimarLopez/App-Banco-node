const connection = require('../Conexion/conexion');
const cnn = connection();
const reder = require('ejs');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const controllerCli = {};

controllerCli.cliente = (req, res, next) => {
    if (req.session.login) {
        console.log('En la vista de Usuario');
        res.render('Clientemain');
        res.redirect('Clientemain');
    } else {
        res.redirect('/');
    }
}

controllerCli.seguridad = (req, res, next) => {
    if (req.session.login) {
        console.log('En la vista de Seguridad');
        res.render('SeguridadCli');
        res.redirect('SeguridadCli');
    } else {
        res.redirect('/');
    }
}

controllerCli.seguridadnew = async (req, res, next) => {
    if (req.session.login) {
        const documento = doc;
        const clave = req.body.newpass;
        const user = req.body.newuser;
        const pass = await bcryptjs.hash(clave, 8);

        cnn.query(`UPDATE tb_usuarios SET nomusu = '${user}', clave = '${pass}' WHERE (doccli = '${documento}');`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                }
                else {
                    console.log(resbd);
                    res.redirect('/SeguridadCli');
                }
            }
        );
    } else {
        res.redirect('/');
    }
}

controllerCli.datos = (req, res, next) => {
    if (req.session.login) {
        console.log('En la vista de Seguridad');
        res.render('datosCli');
        res.redirect('datosCli');
    } else {
        res.redirect('/');
    }
}

controllerCli.datosnew = (req, res, next) => {
    if (req.session.login) {
        const documeto = doc;
        const nom = req.body.nombre;
        const ape = req.body.apellido;
        const correo = req.body.correo;
        const celular = req.body.celular;
        const gen = req.body.genero;
        const fecha = req.body.fechanaci;


        cnn.query(`UPDATE tb_cliente SET nomcli = '${nom}', apecli = '${ape}', correocli = '${correo}', celularcli = '${celular}', sexo = '${gen}', fechanacicli = '${fecha}' WHERE (doccli = '${documeto}');`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                }
                else {
                    console.log(resbd);
                    res.redirect('/datosCli');
                }
            }
        );
    } else {
        res.redirect('/');
    }
}

controllerCli.consultaCreCli = (req, res, next) => {
    if (req.session.login) {
        const documento = doc;
        console.log('si esta entrenaods');
        console.log(doc);
        cnn.query(`SELECT * FROM db_banco.tb_credito WHERE doccli='${documento}'`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                } else {
                    console.log(resbd);
                    resbd.forEach(dato => {
                        dato.fechaaproba = fecha(dato.fechaaproba);
                    });
                    res.render('CreditosCliV', { datosCre: resbd });
                    /*  res.redirect('CreditosCliV'); */
                }
            })
    } else {
        res.redirect('/');
    }
}

controllerCli.consultaLi = (req, res, next) => {
    if (req.session.login) {
        cnn.query('SELECT * FROM tb_lineas;', (err, resbd) => {
            if (err) {
                next(new Error(err));
            } else {
                console.log(resbd);
                res.render('creditosV', { datosLi: resbd });
            }
        })
    } else {
        res.redirect('/');
    }
}



controllerCli.consignar = (req, res, next) => {
    if (req.session.login) {
        const documento = doc;
        cnn.query(`SELECT * FROM db_banco.tb_cuentas WHERE doccli='${documento}'`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                } else {
                    monto = resbd[0].monto;
                    console.log(resbd);
                    res.render('consignarCli');
                }
            })
    } else {
        res.redirect('/');
    }
}


controllerCli.consignarnew = async (req, res, next) => {
    if (req.session.login) {
        const documento = req.body.doc;
        const monto = req.body.monto;

        cnn.query(`call actionin('${documento}','${monto}');`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                }
                else {
                    console.log(resbd);
                    res.redirect('/consignarCli');
                }
            }
        );
    } else {
        res.redirect('/');
    }
}

controllerCli.trasnferir = (req, res, next) => {
    if (req.session.login) {
        const documento = doc;
        cnn.query(`SELECT * FROM db_banco.tb_cuentas WHERE doccli='${documento}'`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                } else {
                    monto = resbd[0].monto;
                    console.log(resbd);
                    res.render('TransferirCli');
                }
            })
    } else {
        res.redirect('/');
    }
}

controllerCli.transferirnew = async (req, res, next) => {
    if (req.session.login) {
        const docum = doc;
        const documento = req.body.doc;
        const monto = req.body.monto;

        cnn.query(`call actionTrans('${docum}','${documento}','${monto}')`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                }
                else {
                    console.log(resbd);
                    res.redirect('/TransferirCli');
                }
            }
        );
    } else {
        res.redirect('/');
    }
}

controllerCli.retirar = (req, res, next) => {
    if (req.session.login) {
        const documento = doc;
        cnn.query(`SELECT * FROM db_banco.tb_cuentas WHERE doccli='${documento}'`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                } else {
                    monto = resbd[0].monto;
                    console.log(resbd);
                    res.render('retirarCli');
                }
            })
    } else {
        res.redirect('/');
    }
}

controllerCli.retirarnew = async (req, res, next) => {
    if (req.session.login) {
        const docum = doc;
        const monto = req.body.monto;

        cnn.query(`call actionre('${docum}','${monto}')`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                }
                else {
                    console.log(resbd);
                    res.redirect('/retirarCli');
                }
            }
        );
    } else {
        res.redirect('/');
    }
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

module.exports = controllerCli;