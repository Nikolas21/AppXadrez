var models = require('../models/index');
var Curso = models.curso;
var Area = models.area;
var layout = 'main';

const index = async (req, res) => {
    const  session  = req.session;
    const cursos = await Curso.findAll();
    res.render('curso/index', {
        sessionName: session ? session.uid : undefined,
        cursos,
        layout
    });
};

const read  = async (req, res) => {
    const  session  = req.session;
    const curso = await Curso.findByPk(req.params.id, {
        include: [{
            model: Area,
            as: 'area'
        }]
    });
    console.log(curso)
    res.render('curso/read', {
        curso,
        sessionName: session ? session.uid : undefined,
        layout
    })
};

const create = async (req, res) => {
    const  session  = req.session;
    console.log(req)
    const areas = await Area.findAll();
    if (req.route.methods.get) {
        res.render('curso/create', {
            areas,
            sessionName: session ? session.uid : undefined,
            csrf: req.csrfToken(),
            layout
        });
    } else {
        try {
            await Curso.create(req.body);
            res.redirect('/curso/index')
        } catch (errors) {
            res.render('curso/create', {
                curso: req.body,
                areas,
                csrf: req.csrfToken(), 
                sessionName: session ? session.uid : undefined,
                errors: errors.errors
            });
        }
    }
};

const update = async (req, res) => {
    const  session  = req.session.uid;
    const curso = await Curso.findByPk(req.params.id);
    const areas = await Area.findAll();
    if (req.route.methods.get) {
        res.render('curso/update', {
            curso,
            csrf: req.csrfToken(), 
            sessionName: session ? session.uid : undefined,
            areas,
            layout
        });
    } else {
        try {
            await curso.update(req.body);
            res.redirect('/curso/index');
        } catch (errors) {
            res.render('curso/update', {
                curso: req.body,
                areas,
                csrf: req.csrfToken(), 
                sessionName: session ? session.uid : undefined,
                errors: errors.errors
            });
        }
    }
};

const remove = async (req, res) => {
    const curso = await Curso.findByPk(req.params.id);
    try {
        await curso.destroy();
    } catch (errors) {
        console.log(errors);
    }
    res.redirect('/curso/index');
};

module.exports = { index, read, create, update, remove };