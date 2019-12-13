const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const cursoController = require('../app/controllers/curso');
const partidaController = require('../app/controllers/partida');

router.get("/", mainController.index);

router.get("/sobre", mainController.sobre);

router.get('/signup',mainController.signup);
 router.post('/signup',mainController.signup);
 router.get('/login',mainController.login);
 router.post('/login',mainController.login);
 router.get('/logout',mainController.logout);

router.get('/curso/index', cursoController.index);
router.get('/curso/create', cursoController.create);
router.post('/curso/create', cursoController.create);
router.get('/curso/read/:id'    , cursoController.read);
router.get('/curso/update/:id'  , cursoController.update);
router.post('/curso/update/:id' , cursoController.update);
router.get('/curso/remove/:id' , cursoController.remove);

router.get('/partida/:id',partidaController.partida);
router.get('/create',partidaController.create);
router.get('/partida',partidaController.partida);
router.get('/ranking',partidaController.ranking);

module.exports = router;