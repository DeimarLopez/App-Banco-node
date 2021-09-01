const connection = require('../Conexion/conexion');
const cnn = connection();
const reder = require('ejs');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const controller = {};

controller.index = (req, res, next) => {
    res.render('login');
}

controller.consultaUsu = (req, res, next) => {
    if (req.session.login) {

        cnn.query('SELECT * FROM tb_usuarios', (err, resbd) => {
            if (err) {
                next(new Error(err));
            } else {
                console.log(resbd);
                res.render('usuario', { datosUs: resbd });
            }
        })
    } else {
        res.redirect('/');
    }
}

controller.consultaCli = (req, res, next) => {
    cnn.query('SELECT * FROM tb_cliente', (err, resbd) => {
        if (err) {
            next(new Error(err));
        } else {
            console.log(resbd);
            console.log('sieestassss');
            resbd.forEach(dato => {
                dato.fechanacicli = fecha(dato.fechanacicli);
            });
            console.log(resbd);
            res.render('Cliente', { datosCl: resbd });
        }
    })
}

controller.consultaLi = (req, res, next) => {
    cnn.query('SELECT * FROM tb_lineas;', (err, resbd) => {
        if (err) {
            next(new Error(err));
        } else {
            console.log(resbd);
            res.render('Lineas', { datosLi: resbd });
        }
    })
}

controller.consultaCre = (req, res, next) => {
    cnn.query('SELECT * FROM db_banco.tb_credito;', (err, resbd) => {
        if (err) {
            next(new Error(err));
        } else {
            console.log(resbd);
            resbd.forEach(dato => {
                dato.fechaaproba = fecha(dato.fechaaproba);
            });
            res.render('Creditos', { datosCre: resbd });
        }
    })
}

controller.insertar = async (req, res, next) => {
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
                res.redirect('/');
            }
        }
    );
}

controller.insertarLineas = (req, res, next) => {
    const codigo = req.body.codigo;
    const nombre = req.body.nombre;
    const monto = req.body.monto;
    const plazo = req.body.plazo;
    cnn.query('INSERT INTO tb_lineas SET?',
        {
            codigolinea: codigo,
            nomlinea: nombre,
            montomaximocredito: monto,
            plazomaxcred: plazo
        },
        (err, resbd) => {
            if (err) {
                next(new Error(err));
            }
            else {
                console.log(resbd);
                res.redirect('/lineas');
            }
        }
    );
}

controller.insertarClientes = (req, res, next) => {
    const documento = req.body.documento;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const celular = req.body.celular;
    const sexo = req.body.sexo;
    const FechaNaci = req.body.FechaNaci;
    cnn.query('INSERT INTO tb_cliente SET?',
        {
            doccli: documento,
            nomcli: nombre,
            apecli: apellido,
            correocli: correo,
            celularcli: celular,
            sexo: sexo,
            fechanacicli: FechaNaci
        }, (err, resbd) => {
            if (err) {
                next(new Error(err));
            }
            else {
                console.log(resbd);
                res.redirect('/clientes');
            }
        }
    );
}

controller.insertarCreditos = (req, res, next) => {
    const codigo = req.body.codigo;
    const documento = req.body.documento;
    const linea = req.body.linea;
    const monto = req.body.monto;
    const fecha = req.body.fecha;
    const plazo = req.body.plazo;
    cnn.query('INSERT INTO tb_credito SET?',
        {
            codigocredito: codigo,
            doccli: documento,
            codigolinea: linea,
            montotoprestado: monto,
            fechaaproba: fecha,
            plazo: plazo
        }, (err, resbd) => {
            if (err) {
                next(new Error(err));
            }
            else {
                console.log(resbd);
                res.redirect('/creditos');
            }
        }
    );
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
                    res.redirect('Lineas');
                    break;

                case 'Administrador':
                    res.redirect('Adminmain');
                    break;
            }
        }
    });
}

controller.admin = (req, res, next) => {
    console.log('En la vista de Usuario');
    res.render('Adminmain');
    res.redirect('Adminmain');
}

controller.actualizar = async (req, res, next) => {
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

controller.eliminar = (req, res, next) => {
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