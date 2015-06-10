var express = require('express');       
var path = require('path');
var favicon = require('serve-favicon');         //Importar paquetes con middlewares
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');         //importar enrutadores
//var users = require('./routes/users');

var app = express();    //creamos la aplicacion con factoría de objetos

// view engine setup
app.set('views', path.join(__dirname, 'views'));    //instala generador de vistas EJS
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));        //instala middlewares
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);       //instala enrutadores
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {          //resto de rutas, genera error 404 HTTP
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {     //gestión de errores durante el desarrollo
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {         //gestión de errores de producción
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;       //exportar app para comando de arranque