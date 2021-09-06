const connection = require('../Conexion/conexion');
const cnn = connection();
const reder = require('ejs');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const controllerEmple = {};

controllerEmple.Empleado = (req, res, next) => {
    if (req.session.login) {
        console.log('En la vista de Empleado');
        res.render('Empleadomain');
        res.redirect('Empleadomain');
    } else {
        res.redirect('/');
    }
}

controllerEmple.UssinCuen = (req, res, next) => {
    if (req.session.login) {
        cnn.query(`select us.doccli from tb_usuarios us left join tb_cuentas cu on(us.doccli = cu.doccli) where cu.doccli is null and rol='Cliente';`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                } else {
                    console.log(resbd);
                    res.render('cuentaEmple', { datos: resbd });
                }
            })
    } else {
        res.redirect('/');
    }
}

controllerEmple.cuenta = (req, res, next) => {
    if (req.session.login) {
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
    } else {
        res.redirect('/');
    }
}

controllerEmple.asicredito = (req, res, next) => {
    if (req.session.login) {
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
    } else {
        res.redirect('/');
    }
}

controllerEmple.credito = (req, res, next) => {
    if (req.session.login) {
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
    } else {
        res.redirect('/');
    }
}


controllerEmple.consultaLi = (req, res, next) => {
    if (req.session.login) {
        cnn.query('SELECT * FROM tb_lineas;', (err, resbd) => {
            if (err) {
                next(new Error(err));
            } else {
                console.log(resbd);
                res.render('lineasEmp', { datosLi: resbd });
            }
        })
    } else {
        res.redirect('/');
    }
}

controllerEmple.crealinea = (req, res, next) => {
    if (req.session.login) {
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
    } else {
        res.redirect('/');
    }
}

controllerEmple.actulinea = (req, res, next) => {
    if (req.session.login) {
        const codigo = req.body.do;
        const nombre = req.body.no;
        const monto = req.body.mo;
        const plazo = req.body.pl;


        cnn.query(`UPDATE tb_lineas SET nomlinea = '${nombre}', montomaximocredito = '${monto}', plazomaxcre = '${plazo}' WHERE (codigolinea = '${codigo}');`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                }
                else {
                    res.redirect('/lineasEmp');
                }
            }
        );
    } else {
        res.redirect('/');
    }
}

controllerEmple.elilinea = (req, res, next) => {
    if (req.session.login) {
        const codigo = req.body.do;

        cnn.query(`DELETE FROM tb_lineas WHERE (codigolinea = '${codigo}');`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                }
                else {
                    res.redirect('/lineasEmp');
                }
            }
        );
    } else {
        res.redirect('/');
    }
}

controllerEmple.insertCli = (req, res, next) => {
    if (req.session.login) {
        console.log('En la vista de datosEmpCli');
        res.render('datosEmpCli');
        res.redirect('datosEmpCli');
    } else {
        res.redirect('/');
    }
}

controllerEmple.insertClinew = (req, res, next) => {
    if (req.session.login) {
        const codigo = req.body.codigo;
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const correo = req.body.correo;
        const celular = req.body.celular;
        const genero = req.body.genero;
        const fechanaci = req.body.fechanaci;

        cnn.query(`INSERT INTO tb_cliente VALUES ('${codigo}', '${nombre}', '${apellido}', '${correo}', '${celular}', '${genero}', '${fechanaci}');`,
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
    } else {
        res.redirect('/');
    }
}

controllerEmple.consultaCli = (req, res, next) => {
    if (req.session.login) {
        cnn.query('SELECT * FROM tb_cliente', (err, resbd) => {
            if (err) {
                next(new Error(err));
            } else {
                console.log(resbd);
                resbd.forEach(dato => {
                    dato.fechanacicli = fecha(dato.fechanacicli);
                });
                console.log(resbd);
                res.render('clientesEmp', { datosCli: resbd });
            }
        })
    } else {
        res.redirect('/');
    }
}


controllerEmple.actuaCli = (req, res, next) => {
    if (req.session.login) {
        const codigo = req.body.do;
        const nombre = req.body.no;
        const apellido = req.body.ap;
        const correo = req.body.em;
        const celular = req.body.ce;
        const genero = req.body.ge;
        const fechanaci = req.body.fe;

        cnn.query(`UPDATE tb_cliente SET nomcli = '${nombre}', apecli = '${apellido}', correocli = '${correo}', celularcli = '${celular}', sexo = '${genero}', fechanacicli = '${fechanaci}' WHERE (doccli = '${codigo}');`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                }
                else {
                    console.log(resbd);
                    res.redirect('/clientesEmp');
                }
            }
        );
    } else {
        res.redirect('/');
    }
}

controllerEmple.eliminarCli = (req, res, next) => {

    if (req.session.login) {
        const codigo = req.body.do;
        cnn.query(`DELETE FROM tb_cliente WHERE (doccli = '${codigo}');`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                }
                else {
                    console.log(resbd);
                    res.redirect('/clientesEmp');
                }
            }
        );
    } else {
        res.redirect('/');
    }
}


controllerEmple.consultaCre = (req, res, next) => {
    if (req.session.login) {
        cnn.query('SELECT * FROM tb_credito;', (err, resbd) => {
            if (err) {
                next(new Error(err));
            } else {
                console.log(resbd);
                resbd.forEach(dato => {
                    dato.fechaaproba = fecha(dato.fechaaproba);
                });
                res.render('creditosEmp', { datosCre: resbd });
            }
        })
    } else {
        res.redirect('/');
    }
}

controllerEmple.actuaCre = (req, res, next) => {
    if (req.session.login) {
        const documento = req.body.do;
        const codigoL = req.body.col;
        const nombre = req.body.no;
        const fech = req.body.fe;
        const plazo = req.body.pl;
        const codigo = req.body.co;

        console.log(documento);
        console.log(codigoL);
        console.log(nombre);
        console.log(fech);
        console.log(plazo);
        console.log(codigo);

        cnn.query(`UPDATE tb_credito SET doccli = '${documento}', codigolinea = '${codigoL}', montotoprestado = '${nombre}', fechaaproba = '${fech}', plazo = '${plazo}' WHERE (codigocredito = '${codigo}');`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                }
                else {
                    res.redirect('/creditosEmp');
                }
            }
        );
    } else {
        res.redirect('/');
    }
}

controllerEmple.eliminarCre = (req, res, next) => {
    if (req.session.login) {
        const codigo = req.body.co;

        cnn.query(`DELETE FROM tb_credito WHERE (codigocredito = '${codigo}');`,
            (err, resbd) => {
                if (err) {
                    next(new Error(err));
                }
                else {
                    res.redirect('/creditosEmp');
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

module.exports = controllerEmple;