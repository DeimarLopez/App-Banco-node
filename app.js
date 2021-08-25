const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');

app.use(session({
    secret:'123',
    resave: true,
    saveUninitialized:true
}));

app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(require('./Rutas/rutas'));


app.use((err, req, res, next)=>{
    res.send({err:err.message});
}); 


app.use(express.static(path.join(__dirname, './public')))

app.set('view engine','ejs');
app.set('views', path.join(__dirname, './Vistas'));



//Serever
app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'), ()=>{
    console.log(`En el server ${app.get('port')}`);
});