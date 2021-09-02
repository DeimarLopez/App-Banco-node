const connection = require('../Conexion/conexion');
const cnn = connection();
const reder = require('ejs');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const controllerEmple = {};

controllerEmple.Empleado = (req, res, next) => {
    console.log('En la vista de Empleado');
    res.render('Empleadomain');
    res.redirect('Empleadomain');
}

controllerEmple.UssinCuen = (req, res, next) => {
    cnn.query(`select us.doccli from tb_usuarios us left join tb_cuentas cu on(us.doccli = cu.doccli) where cu.doccli is null and rol='Cliente';`,
        (err, resbd) => {
            if (err) {
                next(new Error(err));
            } else {
                console.log(resbd);
                res.render('cuentaEmple', { datos: resbd });
            }
        })
}

controllerEmple.cuenta = (req, res, next) => {
    const documento = req.body.doc;
    const tipo = req.body.tipo;

    cnn.query(`call creCuenta('${tipo}','${documento}');`,
        (err, resbd) => {
            if (err) {
                next(new Error(err));
            }
            else {
                console.log(resbd);
                res.redirect('/cuentaEmple');
            }
        }
    );
}

controllerEmple.asicredito = (req, res, next) => {
    cnn.query(`Select doccli from tb_usuarios where rol='Cliente'`,
        (err, resbd) => {
            if (err) {
                next(new Error(err));
            } else {
                docli = resbd;
                cnn.query(`SELECT codigolinea, nomlinea FROM db_banco.tb_lineas;`,
                    (err, resbd) => {
                        if (err) {
                            next(new Error(err));
                        } else {
                            res.render('asigCredEmple', { datos: resbd });
                        }
                    })
            }
        })
}

controllerEmple.credito = (req, res, next) => {
    const documento = req.body.documento;
    const codigo = req.body.codigo;
    const monto = req.body.monto;
    const plazo = req.body.plazo;

    cnn.query(`call asiCredi('${documento}','${codigo}','${monto}','${plazo}');`,
        (err, resbd) => {
            if (err) {
                next(new Error(err));
            }
            else {
                console.log(resbd);
                res.redirect('/asigCredEmple');
            }
        }
    );
}


controllerEmple.consultaLi = (req, res, next) => {
    cnn.query('SELECT * FROM tb_lineas;', (err, resbd) => {
        if (err) {
            next(new Error(err));
        } else {
            console.log(resbd);
            res.render('lineasEmp', { datosLi: resbd });
        }
    })
}

controllerEmple.crealinea = (req, res, next) => {
    const codigo = req.body.codigo;
    const nombre = req.body.nombre;
    const monto = req.body.monto;
    const plazo = req.body.plazo;

    cnn.query(`INSERT INTO tb_lineas VALUES('${codigo}','${nombre}','${monto}','${plazo}');`,
        (err, resbd) => {
            if (err) {
                next(new Error(err));
            }
            else {
                console.log(resbd);
                res.redirect('/lineasEmp');
            }
        }
    );
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

module.exports = controllerEmple;