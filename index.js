


const express = require("express");
const PORT = 3000;
const server = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const moviesRouter = require('./routes/movie.routes');
const cinemasRouter = require('./routes/cinema.routes');
const userRouter = require('./routes/user.routes');
const passport = require('passport');
require('./authentication/passport.js');
const {isAuthenticated} = require('./middleware/auth.middleware')

const {connect} = require("./utils/db.js");

connect();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(
  session({
    secret: 'upgradehub_node', // ¡Este secreto tendremos que cambiarlo en producción!
    resave: false, // Solo guardará la sesión si hay cambios en ella.
    saveUninitialized: false, // Lo usaremos como false debido a que gestionamos nuestra sesión con Passport
    cookie: {
      maxAge: 3600000 // Milisegundos de duración de nuestra cookie, en este caso será una hora.
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL
    })
  })
);
server.use(passport.initialize());
server.use(passport.session());

server.use('/movies',isAuthenticated, moviesRouter);
server.use('/cinemas',isAuthenticated, cinemasRouter);
server.use('/user', userRouter);

server.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

server.listen(PORT, () => {
    console.log(`Server started in http://localhost:${PORT}`);
  });