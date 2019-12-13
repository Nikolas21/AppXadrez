const express = require("express");
const logger = require("morgan");
const router = require('./config/routes');
const app = express();
const handlebars = require('express-handlebars');
const sass = require('node-sass-middleware');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const uuid = require('uuid/v4');
const session = require('express-session');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

require('./app/controllers/socket')(io)

const PORT = 4567;

 app.use(logger("common"));

 app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use(sass({
    src: __dirname + '/public/scss',
    dest: __dirname + '/public/css',
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css',
    force: true
}));

app.use('/img', [
    express.static(__dirname + '/public/img'),

]);

app.use('/webfonts', [
    express.static(__dirname + '/public/webfonts')
]);

app.use('/css', [
    express.static(__dirname + '/public/css'),
    express.static(__dirname + '/node_modules/@chrisoakman/chessboardjs/dist/'),

]);


app.use('/js', [
    
    express.static(__dirname + '/node_modules/jquery/dist/'),
    express.static(__dirname + '/node_modules/popper.js/dist/umd/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
    express.static(__dirname + '/node_modules/@fortawesome//fontawesome-free/js/'),
    express.static(__dirname + '/node_modules/@chrisoakman/chessboardjs/dist/'),
    express.static(__dirname + '/node_modules/chess.js/'),
    express.static(__dirname + '/public/js')
]);

app.engine('handlebars', handlebars({
    helpers: require( __dirname + '/app/views/helpers/helpers.js')
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/app/views');

app.use(session({
    genid: (req) => {
        return uuid();
    },
    secret: 'Hi9Cf#mK98',
    resave: false,
    saveUninitialized: true
}))


app.use(function (req, res, next) {
   
    if (!req.session.uid) {
        if (req.url == '/login' || req.url == '/sobre' || req.url == '/signup') {
           
            next();
        } else {
            res.redirect('/login');
        } 
    } else {
        if (req.url == '/login' || req.url == '/signup') {
        
            res.redirect('/');
        } else {
            next();
        } 
    }

});

app.use(router);


http.listen(PORT, function() {
    console.log("Express iniciado na porta " + PORT);
});