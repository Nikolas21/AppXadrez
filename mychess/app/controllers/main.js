var models = require('../models/index');
const bcrypt = require('bcryptjs');
const Curso = models.curso;
const Usuario = models.usuario;
const Partida = models.partida;


const index = async (req, res) => {
  const conteudo = 'Página principal da aplicação';
  const session = req.session;

  try{
    partida = await Partida.findAll({ where: { winner: null }, include: [{ model: Usuario, as: 'user1' }, { model: Usuario, as: 'user2' }] })
  console.log(session)
  console.log("testando acessar partido por id", partida);
  res.render('main/index', {
    conteudo: conteudo,
    partidas:partida,
    sessionName: session ? session.uid : undefined,
    layout: 'main'
  });
}catch(e){console.log(e)}
}



const sobre = (req, res) => {
  const session = req.session;
  const conteudo = 'Página sobre a aplicação';
  res.render('main/sobre', {
    conteudo: conteudo,
    sessionName: session ? session.uid : undefined,
    layout: 'main'
  });
}

const signup = async (req, res) => {
  const session = req.session;
  const cursos = await Curso.findAll();
  if (req.route.methods.get) {

    res.render('main/signup', {
      csrf: req.csrfToken(),
      sessionName: session ? session.uid : undefined,
      cursos,
      layout: 'main'
    });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.senha, salt, async (err, hash) => {
        try {
          await Usuario.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: hash,
            curso_id: req.body.curso_id
          });
          res.redirect('/login');
        } catch (errors) {
          console.log(errors);
          res.render('main/signup', {
            usuario: req.body,
            sessionName: session ? session.uid : undefined,
            csrf: req.csrfToken(),
            cursos,
            errors: errors.errors
          });
        }
      });
    });
  }
}


const login = async function (req, res) {
  const session = req.session;
  if (req.route.methods.get) {
    res.render('main/login', {
      sessionName: session ? session.uid : undefined,
      csrf: req.csrfToken()
    });
  } else {



    const usuario = await Usuario.findOne({ where: { email: req.body.email } });

    if (usuario) {
      bcrypt.compare(req.body.senha, usuario.senha, (errors, ok) => {
        console.log(errors);
        console.log(ok);
        if (ok) {
          req.session.uid = {usuario: usuario.nome, id: usuario.id};
          console.log(req.session.uid)
          res.redirect('/');
        } else {

          res.render('main/login', {
            csrf: req.csrfToken(),
            error: "Senha invalida",
            sessionName: session ? session.uid : undefined,
            email: req.body.email
          });
        }
      });
    } else {
      res.render('main/login', {
        csrf: req.csrfToken(),
        errors: "Email Invalido",
        sessionName: session ? session.uid : undefined,
        email: req.body.email
      });

    }
  }
}


const logout = (req, res) => {

  req.session.destroy(function (errors) {
    if (errors) {
      return console.log(errors);
    }
    res.redirect('/');
  });
}

module.exports = { index, sobre, login, signup, logout }